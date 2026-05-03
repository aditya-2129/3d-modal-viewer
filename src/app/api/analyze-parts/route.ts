import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { existsSync } from "fs";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

// Snap packages that provide FreeCAD's shared libs at runtime
const SNAP_LIB_DIRS = [
  "/snap/freecad/current/usr/lib",
  "/snap/freecad/current/usr/lib/x86_64-linux-gnu",
  // Qt6 + xerces live in the kf6-core24 content snap
  "/snap/kf6-core24/current/usr/lib/x86_64-linux-gnu",
];

function resolveFreeCADPython(): string {
  if (process.env.FREECAD_PYTHON) return process.env.FREECAD_PYTHON;
  if (process.platform === "win32") return "C:\\Program Files\\FreeCAD 1.1\\bin\\python.exe";
  // Snap install
  const snapPy = "/snap/freecad/current/bin/python3";
  if (existsSync(snapPy)) return snapPy;
  // Nix store — find FreeCAD's own Python so versions match
  try {
    const { globSync } = require("glob");
    for (const pattern of ["/nix/store/*freecad*/bin/python3", "/nix/store/*freecad*/bin/python"]) {
      const matches: string[] = globSync(pattern).sort().reverse();
      if (matches.length) return matches[0];
    }
  } catch { /* glob unavailable, fall through */ }
  return "python3";
}

function buildEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  const extra = SNAP_LIB_DIRS.filter(existsSync).join(":");
  if (extra) {
    env.LD_LIBRARY_PATH = env.LD_LIBRARY_PATH ? `${extra}:${env.LD_LIBRARY_PATH}` : extra;
  }
  return env;
}

const FREECAD_PYTHON = resolveFreeCADPython();
const SCRIPT_PATH = join(process.cwd(), "scripts", "extract_parts.py");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const sessionId = `step_${Date.now()}`;
  const tmpPath = join(tmpdir(), `${sessionId}_${file.name}`);
  const outDir = join(tmpdir(), `${sessionId}_parts`);
  await writeFile(tmpPath, Buffer.from(bytes));

  try {
    const result = await runFreeCAD(tmpPath, outDir);
    return NextResponse.json(result);
  } finally {
    await unlink(tmpPath).catch(() => {});
  }
}

function runFreeCAD(filePath: string, outDir: string): Promise<{ parts?: unknown[]; outDir?: string; error?: string }> {
  return new Promise((resolve) => {
    const proc = spawn(FREECAD_PYTHON, [SCRIPT_PATH, filePath, outDir], {
      timeout: 60000,
      env: buildEnv(),
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (d) => { stdout += d.toString(); });
    proc.stderr.on("data", (d) => { stderr += d.toString(); });

    proc.on("close", (code) => {
      // Extract delimited result marker written by the script
      const delimStart = stdout.indexOf("__RESULT__");
      const delimEnd = stdout.indexOf("__END__");
      if (delimStart !== -1 && delimEnd !== -1) {
        try {
          resolve(JSON.parse(stdout.slice(delimStart + 10, delimEnd)));
          return;
        } catch {
          // fall through
        }
      }
      // Fallback: last JSON object in stdout
      const jsonMatch = stdout.match(/(\{[\s\S]*\})\s*$/);
      if (jsonMatch) {
        try {
          resolve(JSON.parse(jsonMatch[1]));
          return;
        } catch {
          // fall through
        }
      }
      resolve({ error: `FreeCAD exited with code ${code}. stdout: ${stdout.slice(-500)}` });
    });

    proc.on("error", (err) => {
      resolve({ error: `Failed to launch FreeCAD: ${err.message}` });
    });
  });
}

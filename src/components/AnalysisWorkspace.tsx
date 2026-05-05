"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { getAnalysis, getProjects } from "@/lib/db";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full border-[3px] border-[rgba(124,58,237,0.2)] border-t-violet animate-spin" />
        <p className="font-mono text-[0.75rem] text-fg-sub">Loading 3D Engine…</p>
      </div>
    </div>
  ),
});

const PartsList = dynamic(() => import("@/components/PartsList"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center">
      <p className="font-mono text-[0.65rem] text-fg-muted uppercase tracking-wider">Loading…</p>
    </div>
  ),
});

interface BoundingBox {
  xMin: number; yMin: number; zMin: number;
  xMax: number; yMax: number; zMax: number;
  xLen: number; yLen: number; zLen: number;
}

interface Stock {
  stockShape: "round" | "hex" | "rect";
  [key: string]: unknown;
}

interface Part {
  name: string;
  type: string;
  solidCount?: number;
  boundingBox: BoundingBox | null;
  stock?: Stock | null;
  children: Part[];
  groupKey?: string | null;
  centerOfMass?: { x: number; y: number; z: number } | null;
  globalIndex?: number;
}

type ProcessedModel = {
  parts: Part[];
  mapping: { partIndex: number; nodeName: string }[];
  meshFileUrl: string;
  fileName?: string;
};

interface AnalysisWorkspaceProps {
  projectId?: string;
  projectName?: string;
}

export default function AnalysisWorkspace({ projectId, projectName }: AnalysisWorkspaceProps) {
  const router = useRouter();
  const [view, setView] = useState<"upload" | "analysis">("upload");
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>("Queued…");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [queueAhead, setQueueAhead] = useState<number | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [processedModel, setProcessedModel] = useState<ProcessedModel | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // On mount: if project has a cached analysis, load it directly
  useEffect(() => {
    if (!projectId) return;
    (async () => {
      try {
        const projects = await getProjects();
        const project = projects.find(p => p.$id === projectId);
        if (project?.analysisId) {
          const analysis = await getAnalysis(project.analysisId);
          setProcessedModel({ ...analysis, fileName: projectName });
          setView("analysis");
        }
      } catch {
        // No cached analysis — show upload screen
      }
    })();
  }, [projectId, projectName]);

  const processFile = useCallback(async (file: File) => {
    setProcessing(true);
    setProcessingError(null);
    setProcessingStatus("Uploading file…");
    setProcessingProgress(2);
    setQueueAhead(null);

    // Start simulation immediately — covers the Appwrite upload phase too
    const sim = setInterval(() => {
      setProcessingProgress(prev => prev < 79 ? Math.min(79, prev + 0.2) : prev);
    }, 500);

    const fd = new FormData();
    fd.append("file", file);
    if (projectId) fd.append("projectId", projectId);
    try {
      const res = await fetch("/api/process-model", { method: "POST", body: fd });
      const data = await res.json();
      if (data.error) { clearInterval(sim); setProcessingError(data.error); setProcessing(false); return; }

      // Cache hit — analysis already done
      if (data.cached && data.analysisId) {
        clearInterval(sim);
        setProcessingProgress(100);
        const analysis = await getAnalysis(data.analysisId);
        setProcessedModel({ ...analysis, fileName: file.name });
        setView("analysis");
        setProcessing(false);
        return;
      }

      // Job queued — start polling, simulation keeps running
      const { jobId } = data;
      setProcessingStatus("Queued…");

      const poll = setInterval(async () => {
        try {
          const statusRes = await fetch(`/api/job-status?jobId=${jobId}`);
          const status = await statusRes.json();
          if (status.status === "processing") {
            const p = status.progress ?? 0;
            setProcessingProgress(prev => Math.max(prev, p));
            if (p < 20) setProcessingStatus("Downloading file…");
            else if (p < 50) setProcessingStatus("Starting FreeCAD…");
            else if (p < 80) setProcessingStatus("Analyzing geometry…");
            else if (p < 90) setProcessingStatus("Generating mesh…");
            else setProcessingStatus("Uploading result…");
          }
          if (status.status === "queued") {
            const ahead = status.ahead ?? 0;
            setQueueAhead(ahead);
            setProcessingStatus(ahead === 0 ? "Up next…" : "Waiting in queue…");
          }
          if (status.status === "done") {
            setQueueAhead(null);
            clearInterval(poll);
            clearInterval(sim);
            setProcessingProgress(100);
            setProcessingStatus("Done!");
            const result = status.result;
            if (result.analysisId) {
              const analysis = await getAnalysis(result.analysisId);
              setProcessedModel({ ...analysis, fileName: file.name });
            } else {
              setProcessedModel({ parts: result.parts, mapping: result.mapping, meshFileUrl: result.meshFileUrl, fileName: file.name });
            }
            setView("analysis");
            setProcessing(false);
          }
          if (status.status === "failed") {
            clearInterval(poll);
            clearInterval(sim);
            setProcessingError(status.error ?? "Processing failed");
            setProcessing(false);
          }
        } catch {
          // transient network error — keep polling
        }
      }, 1000);
    } catch (e: unknown) {
      clearInterval(sim);
      setProcessingError(e instanceof Error ? e.message : "Processing failed");
      setProcessing(false);
    }
  }, [projectId]);

  const handleSelectPart = (indices: number[] | null) => {
    if (!indices || indices.length === 0) { setSelectedIndices(null); return; }
    if (
      selectedIndices &&
      selectedIndices.length === indices.length &&
      selectedIndices.every((v, i) => v === indices[i])
    ) {
      setSelectedIndices(null);
    } else {
      setSelectedIndices(indices);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    const name = f.name.toLowerCase();
    if (name.endsWith(".step") || name.endsWith(".stp") || name.endsWith(".iges") || name.endsWith(".igs")) {
      processFile(f);
    } else {
      setProcessingError("Please upload a valid CAD file (.step, .stp, .iges, or .igs)");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const name = f.name.toLowerCase();
    if (name.endsWith(".step") || name.endsWith(".stp") || name.endsWith(".iges") || name.endsWith(".igs")) {
      processFile(f);
    } else {
      setProcessingError("Please upload a valid CAD file (.step, .stp, .iges, or .igs)");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  /* ── ANALYSIS VIEW ── */
  if (view === "analysis" && processedModel) {
    return (
      <div className="flex w-screen h-[100dvh] bg-void relative z-[1] overflow-hidden max-md:flex-col">
        {/* Left: Parts sidebar */}
        <section className="w-[368px] shrink-0 border-r border-border flex flex-col bg-base overflow-hidden min-h-0 max-md:w-full max-md:h-[38dvh] max-md:border-r-0 max-md:border-b max-[390px]:overflow-y-auto">
          <div className="flex items-center justify-between px-5 h-11 border-b border-border bg-[rgba(13,13,26,0.8)] backdrop-blur-sm shrink-0 max-md:h-10 max-md:px-4">
            <span className="font-mono text-[0.62rem] font-medium tracking-[0.14em] uppercase text-fg-sub flex items-center gap-2 max-md:text-[0.6rem]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet opacity-90">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
              Parts Tree
            </span>
            <span className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-fg-muted bg-surface border border-border rounded-xs px-2 py-[2px] max-md:text-[0.55rem] max-md:px-[6px] max-md:max-w-[140px] max-md:overflow-hidden max-md:text-ellipsis max-md:whitespace-nowrap">
              {processedModel.fileName && processedModel.fileName.length > 20
                ? processedModel.fileName.slice(0, 19) + "…"
                : processedModel.fileName}
            </span>
          </div>

          <div className="flex-1 flex flex-col p-5 overflow-hidden min-h-0 max-md:p-[0.75rem_1rem]">
            <div className="flex gap-2 mb-[0.875rem]">
              <button
                className="flex items-center justify-center bg-transparent border border-border-mid rounded-xs text-fg-sub px-3 py-1.5 font-mono text-[0.62rem] font-medium uppercase cursor-pointer transition-all hover:border-violet hover:text-violet"
                onClick={() => router.push("/dashboard")}
                title="Back to Dashboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-[0.4rem] bg-transparent border border-border-mid rounded-xs text-fg-sub px-[0.8rem] py-[0.4rem] font-mono text-[0.62rem] font-medium tracking-[0.1em] uppercase cursor-pointer transition-all duration-snap ease-expo hover:border-violet hover:text-violet hover:bg-violet-dim hover:shadow-[0_0_12px_-4px_var(--color-violet-glow)] active:scale-[0.98]"
                onClick={() => { setView("upload"); setSelectedIndices(null); setProcessedModel(null); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                New File
              </button>
            </div>

            <div className="flex items-center gap-3 py-[0.7rem] px-[0.875rem] bg-surface border border-border rounded-sm mb-4 shrink-0 transition-colors duration-base hover:border-border-mid max-md:py-2 max-md:px-3 max-md:mb-2">
              <div className="w-[30px] h-[30px] bg-violet-dim border border-border-strong rounded-xs flex items-center justify-center text-violet shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[0.73rem] font-medium text-fg truncate max-md:text-[0.7rem]">{processedModel.fileName}</div>
                <div className="font-mono text-[0.58rem] text-fg-muted tracking-[0.08em] uppercase mt-[2px] max-md:text-[0.55rem]">
                  {processedModel.parts.length} parts · GLB mesh
                </div>
              </div>
            </div>

            <PartsList parts={processedModel.parts} selectedIndices={selectedIndices} onSelectPart={handleSelectPart} />
          </div>
        </section>

        {/* Right: 3D viewer */}
        <section className="flex-1 flex flex-col bg-void overflow-hidden max-[390px]:h-[50dvh]">
          <div className="flex items-center justify-between px-5 h-11 border-b border-border bg-[rgba(13,13,26,0.8)] backdrop-blur-sm shrink-0 max-md:h-10 max-md:px-4">
            <span className="font-mono text-[0.62rem] font-medium tracking-[0.14em] uppercase text-fg-sub flex items-center gap-2 max-md:text-[0.6rem]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet opacity-90">
                <circle cx="12" cy="12" r="10"/>
                <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
                <line x1="9.69" y1="8" x2="21.17" y2="8"/>
                <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
                <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
                <line x1="14.31" y1="16" x2="2.83" y2="16"/>
                <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
              </svg>
              3D Viewer
            </span>
            <span
              data-active={selectedIndices !== null ? "" : undefined}
              className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-fg-muted bg-surface border border-border rounded-xs px-2 py-[2px] transition-all duration-base data-[active]:text-lime data-[active]:bg-lime-dim data-[active]:border-border-lime data-[active]:shadow-[0_0_8px_var(--color-lime-glow)] max-md:text-[0.55rem] max-md:px-[6px] max-md:max-w-[140px] max-md:overflow-hidden max-md:text-ellipsis max-md:whitespace-nowrap"
            >
              {selectedIndices !== null
                ? `${selectedIndices.length} item${selectedIndices.length !== 1 ? 's' : ''} selected`
                : "Orbit · Pan · Zoom"}
            </span>
          </div>

          <div className="flex-1 flex flex-col p-5 overflow-hidden min-h-0 max-md:p-3 safe-pb">
            <div className="model-preview flex-1 bg-elevated rounded-md border border-border flex items-center justify-center relative overflow-hidden">
              <ModelViewer
                meshFileUrl={processedModel.meshFileUrl}
                mapping={processedModel.mapping}
                selectedIndices={selectedIndices}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ── UPLOAD VIEW ── */
  return (
    <main className="main-container flex-1 flex flex-col items-center justify-center p-8 relative z-[1] min-h-[100dvh] max-md:p-[1.25rem_1rem] max-md:justify-center">
      <div className="background-glow absolute inset-0 pointer-events-none z-[-1] overflow-hidden" />

      {/* Processing overlay */}
      {processing && (
        <div className="fixed inset-0 z-50 bg-[rgba(5,5,10,0.85)] backdrop-blur-sm flex flex-col items-center justify-center gap-6 px-8">
          <div className="w-12 h-12 rounded-full border-[3px] border-[rgba(124,58,237,0.2)] border-t-violet animate-spin" />
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <div className="flex justify-between w-full font-mono text-[0.7rem]">
              <span className="text-fg-sub">{processingStatus}</span>
              <span className="text-violet">{Math.round(processingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[rgba(124,58,237,0.15)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet to-[#a78bfa] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            {queueAhead !== null && queueAhead > 0 && (
              <p className="font-mono text-[0.65rem] text-amber-400 self-start">
                {queueAhead} job{queueAhead > 1 ? "s" : ""} ahead of you in queue
              </p>
            )}
          </div>
          <p className="font-mono text-[0.62rem] text-fg-muted">This may take 1–2 minutes for large files</p>
        </div>
      )}

      <div className="absolute top-5 left-5 z-10">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 font-mono text-[0.65rem] text-fg-muted hover:text-fg transition-colors uppercase tracking-wider bg-surface border border-border rounded-full px-3 py-1.5 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="upload-card">
        <header className="header flex flex-col items-center">
          <h1 className="font-display text-[1.9rem] font-extrabold text-center leading-tight mb-2 text-fg">
            3D Model{" "}
            <span className="bg-gradient-to-br from-violet via-[#a78bfa] to-lime bg-clip-text text-transparent">Viewer</span>
          </h1>
          <p>{projectName ? `Project: ${projectName}` : "STEP · STP · IGES · Geometry Analysis"}</p>
        </header>

        <input
          ref={inputRef}
          type="file"
          accept=".step,.stp,.iges,.igs,application/octet-stream"
          onChange={handleChange}
          multiple={false}
          style={{
            position: 'absolute',
            opacity: 0,
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: -1
          }}
        />

        <div
          data-active={dragActive ? "" : undefined}
          className="drop-zone border border-border-mid rounded-lg p-[2.25rem_1.5rem] cursor-pointer bg-[rgba(124,58,237,0.04)] flex flex-col items-center gap-3 relative transition-all duration-base ease-expo hover:border-border-strong hover:bg-violet-dim hover:-translate-y-0.5 hover:shadow-[0_8px_40px_var(--color-violet-glow)] data-[active]:border-lime data-[active]:bg-lime-dim data-[active]:shadow-[0_0_0_3px_var(--color-lime-glow),0_12px_40px_var(--color-lime-glow)] data-[active]:scale-[1.01] max-md:p-[2rem_1.25rem] max-md:gap-[0.65rem] max-md:transform-none"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload CAD file"
        >
          <div className="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <span>Drop your CAD file here</span>
          <small>Accepts .step · .stp · .iges · .igs</small>
        </div>

        {processingError && (
          <div className="mt-3 p-[0.6rem_0.875rem] font-mono text-[0.68rem] text-error bg-[rgba(248,113,113,0.06)] border border-[rgba(248,113,113,0.20)] rounded-xs leading-relaxed">
            {processingError}
          </div>
        )}

        <p className="upload-footer">AutoQuotation · v2 · STEP & IGES Analyzer</p>
      </div>
    </main>
  );
}

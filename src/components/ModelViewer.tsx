"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";


interface ModelViewerProps {
  meshFileUrl: string;
  mapping: { partIndex: number; nodeName: string }[];
  selectedIndices?: number[] | null;
}

interface OrbitControlsLike {
  target: THREE.Vector3;
  update: () => void;
}

function FitCamera({ geometries, resetToken }: { geometries: THREE.BufferGeometry[]; resetToken: number }) {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (geometries.length === 0) return;

    const box = new THREE.Box3();
    let hasValidGeometries = false;

    geometries.forEach(g => {
      if (!g || !g.attributes || !g.attributes.position || g.attributes.position.count === 0) return;
      g.computeBoundingBox();
      if (g.boundingBox && !isNaN(g.boundingBox.min.x) && isFinite(g.boundingBox.min.x)) {
        const mesh = new THREE.Mesh(g);
        box.expandByObject(mesh);
        hasValidGeometries = true;
      }
    });

    if (!hasValidGeometries || box.isEmpty()) return;

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (isNaN(maxDim) || maxDim <= 0) return;

    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    let distance = (maxDim / 2 / Math.tan(fov / 2)) * 2;
    distance = Math.max(distance, 0.1);
    distance = Math.min(distance, 100000);

    const targetPos = new THREE.Vector3(
      center.x + distance * 0.7,
      center.y + distance * 0.5,
      center.z + distance * 0.7
    );

    if (isNaN(targetPos.x) || isNaN(targetPos.y) || isNaN(targetPos.z)) return;

    camera.position.copy(targetPos);
    // eslint-disable-next-line react-hooks/immutability
    (camera as THREE.PerspectiveCamera).near = Math.max(distance / 1000, 0.01);
    // eslint-disable-next-line react-hooks/immutability
    (camera as THREE.PerspectiveCamera).far = Math.max(distance * 10, 1000);
    camera.updateProjectionMatrix();
    camera.lookAt(center);

    if (controls) {
      const oc = controls as unknown as OrbitControlsLike;
      oc.target.copy(center);
      oc.update();
    }
  }, [geometries, camera, controls, resetToken]);

  return null;
}

const GLBModel = ({
  meshFileUrl,
  mapping,
  selectedIndices,
  resetToken,
}: {
  meshFileUrl: string;
  mapping: { partIndex: number; nodeName: string }[];
  selectedIndices?: number[] | null;
  resetToken: number;
}) => {
  const { scene } = useGLTF(meshFileUrl);

  const visibleNames = useMemo(() => {
    if (!selectedIndices || selectedIndices.length === 0) return null;
    const names = new Set<string>();
    selectedIndices.forEach(idx => {
      const entry = mapping.find(m => m.partIndex === idx);
      if (entry) names.add(entry.nodeName);
    });
    return names;
  }, [selectedIndices, mapping]);

  useEffect(() => {
    if (visibleNames === null) {
      scene.traverse((obj) => { obj.visible = true; });
      return;
    }
    scene.traverse((obj) => {
      if (obj.name.startsWith("part_")) {
        obj.visible = visibleNames.has(obj.name);
      }
    });
  }, [scene, visibleNames]);

  const geometries = useMemo(() => {
    const geos: THREE.BufferGeometry[] = [];
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        geos.push(obj.geometry);
      }
    });
    return geos;
  }, [scene]);

  return (
    <>
      <FitCamera geometries={geometries} resetToken={resetToken} />
      <primitive object={scene} />
    </>
  );
};

function CameraSync({ quatRef }: { quatRef: React.RefObject<THREE.Quaternion> }) {
  const { camera } = useThree();
  useFrame(() => { quatRef.current.copy(camera.quaternion); });
  return null;
}

function AxisOverlay({ quatRef }: { quatRef: React.RefObject<THREE.Quaternion> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const SIZE = 90;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const len = SIZE * 0.33;
    const axes = [
      { dir: new THREE.Vector3(1, 0, 0), color: "#e05252", label: "X" },
      { dir: new THREE.Vector3(0, 1, 0), color: "#52c152", label: "Y" },
      { dir: new THREE.Vector3(0, 0, 1), color: "#5282e0", label: "Z" },
    ];

    let raf: number;
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) { raf = requestAnimationFrame(draw); return; }
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, SIZE, SIZE);

      const projected = axes.map(({ dir, color, label }) => {
        const v = dir.clone().applyQuaternion(quatRef.current);
        return { x: cx + v.x * len, y: cy - v.y * len, color, label, depth: v.z };
      });

      [...projected].sort((a, b) => a.depth - b.depth).forEach(({ x, y, color, label, depth }) => {
        ctx.globalAlpha = depth < -0.1 ? 0.3 : 1;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
        const angle = Math.atan2(y - cy, x - cx);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 8 * Math.cos(angle - 0.4), y - 8 * Math.sin(angle - 0.4));
        ctx.lineTo(x - 8 * Math.cos(angle + 0.4), y - 8 * Math.sin(angle + 0.4));
        ctx.closePath(); ctx.fill();
        ctx.font = "bold 11px sans-serif";
        ctx.fillText(label, x + 5 * Math.cos(angle), y + 5 * Math.sin(angle) + 4);
        ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [quatRef]);

  return (
    <canvas
      ref={canvasRef}
      width={90}
      height={90}
      className="absolute bottom-16 left-4 pointer-events-none"
    />
  );
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export default function ModelViewer({ meshFileUrl, mapping, selectedIndices }: ModelViewerProps) {
  const quatRef = useRef(new THREE.Quaternion());
  const [resetToken, setResetToken] = useState(0);
  const [canvasKey, setCanvasKey] = useState(0);
  const [isPanMode, setIsPanMode] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const check = () => {
      setWebglAvailable(checkWebGL());
    };
    check();
  }, []);

  const handleReset = () => setResetToken(t => t + 1);

  if (!webglAvailable) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-void">
        <div className="text-center text-[#fca5a5] bg-[rgba(20,20,20,0.9)] p-8 rounded-xl border border-[#7f1d1d] max-w-sm">
          <h3 className="font-semibold mb-2">WebGL Not Available</h3>
          <p className="text-sm text-[#a1a1aa] mb-3">Your browser or GPU driver does not support WebGL.</p>
          <p className="text-xs text-[#71717a]">On Linux, try launching Chrome with <code className="bg-[#1a1a1a] px-1 rounded">--enable-unsafe-swiftshader</code> or enable hardware acceleration in browser settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-void">
      <Canvas
        key={canvasKey}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [100, 100, 100], fov: 45, near: 0.1, far: 100000 }}
        gl={{ antialias: true, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          let restoreTimer: ReturnType<typeof setTimeout>;
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            restoreTimer = setTimeout(() => setCanvasKey(k => k + 1), 2000);
          });
          canvas.addEventListener("webglcontextrestored", () => {
            clearTimeout(restoreTimer);
            setCanvasKey(k => k + 1);
          });
        }}
      >
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -5, -10]} intensity={0.3} />
        <Environment preset="city" />

        <React.Suspense fallback={<Html center><p className="text-[#71717a]">Loading 3D model…</p></Html>}>
          <GLBModel
            meshFileUrl={meshFileUrl}
            mapping={mapping}
            selectedIndices={selectedIndices}
            resetToken={resetToken}
          />
        </React.Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          screenSpacePanning={true}
          touches={{
            ONE: isPanMode ? THREE.TOUCH.PAN : THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
          mouseButtons={{
            LEFT: isPanMode ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
          }}
        />
        <CameraSync quatRef={quatRef} />
      </Canvas>

      <AxisOverlay quatRef={quatRef} />

      <div className="absolute bottom-5 left-5 text-[#8b87a8] font-mono text-[0.6rem] uppercase tracking-wider pointer-events-none bg-void/60 border border-border-mid px-3 py-2 rounded-sm backdrop-blur-md max-md:hidden">
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 opacity-80"><span className="text-violet">L:</span> Rotate</span>
          <span className="flex items-center gap-1.5 opacity-80"><span className="text-violet">R:</span> Pan</span>
          <span className="flex items-center gap-1.5 opacity-80"><span className="text-violet">S:</span> Zoom</span>
        </span>
      </div>

      <div className="absolute bottom-5 left-5 text-[#8b87a8] font-mono text-[0.6rem] uppercase tracking-wider pointer-events-none bg-void/60 border border-border-mid px-3 py-2 rounded-sm backdrop-blur-md hidden max-md:block">
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 opacity-80"><span className="text-violet">1F:</span> {isPanMode ? 'Pan' : 'Rotate'}</span>
          <span className="flex items-center gap-1.5 opacity-80"><span className="text-violet">2F:</span> Pan/Zoom</span>
        </span>
      </div>

      <div className="absolute bottom-5 right-5 flex flex-col gap-2">
        <button
          onClick={() => setIsPanMode(!isPanMode)}
          className={`w-10 h-10 rounded-sm border flex items-center justify-center transition-all duration-base backdrop-blur-md ${
            isPanMode
              ? 'bg-violet-dim border-violet text-violet shadow-[0_0_12px_var(--color-violet-glow)]'
              : 'bg-void/60 border-border-mid text-fg-sub hover:border-violet hover:text-violet'
          }`}
          title={isPanMode ? "Switch to Rotate" : "Switch to Pan"}
        >
          {isPanMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M12 7v5l3 3"/>
            </svg>
          )}
        </button>

        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-sm bg-void/60 border border-border-mid flex items-center justify-center text-fg-sub transition-all duration-base hover:border-violet hover:text-violet backdrop-blur-md active:scale-95"
          title="Reset View"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

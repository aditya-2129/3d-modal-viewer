"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import occtimportjs from "occt-import-js";

interface ModelViewerProps {
  file: File;
  selectedIndices?: number[] | null;
}

function FitCamera({ geometries, resetToken }: { geometries: THREE.BufferGeometry[]; resetToken: number }) {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (geometries.length === 0) return;

    const box = new THREE.Box3();
    geometries.forEach(g => {
      const mesh = new THREE.Mesh(g);
      box.expandByObject(mesh);
    });

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const distance = (maxDim / 2 / Math.tan(fov / 2)) * 2;

    camera.position.set(
      center.x + distance * 0.7,
      center.y + distance * 0.5,
      center.z + distance * 0.7
    );
    camera.near = distance / 1000;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();
    camera.lookAt(center);

    if (controls) {
      (controls as any).target.copy(center);
      (controls as any).update();
    }
  }, [geometries, camera, controls, resetToken]);

  return null;
}

const STEPModel = ({ file, selectedIndices, resetToken }: { file: File; selectedIndices?: number[] | null; resetToken: number }) => {
  const [geometries, setGeometries] = useState<THREE.BufferGeometry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("Initializing...");

  useEffect(() => {
    let isMounted = true;

    const loadModel = async () => {
      try {
        setProgress("Loading CAD Engine...");
        const occt = await occtimportjs({ locateFile: (path: string) => `/lib/${path}` });

        if (!isMounted) return;
        setProgress("Reading STEP file...");

        const buffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);

        setProgress("Tessellating 3D Geometry...");
        const result = occt.ReadStepFile(uint8Array, null);

        if (!result?.success) {
          throw new Error("CAD processing failed. The file might be invalid or too complex.");
        }

        const newGeometries = result.meshes.map((mesh: any) => {
          const geometry = new THREE.BufferGeometry();

          if (mesh.attributes?.position?.array) {
            geometry.setAttribute("position", new THREE.Float32BufferAttribute(mesh.attributes.position.array, 3));
          }
          if (mesh.attributes?.normal?.array) {
            geometry.setAttribute("normal", new THREE.Float32BufferAttribute(mesh.attributes.normal.array, 3));
          } else {
            geometry.computeVertexNormals();
          }
          if (mesh.index?.array) {
            geometry.setIndex(new THREE.Uint32BufferAttribute(mesh.index.array, 1));
          }

          geometry.computeBoundingBox();
          geometry.computeBoundingSphere();
          return geometry;
        });

        if (isMounted) {
          setGeometries(newGeometries);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Unknown CAD processing error");
      }
    };

    loadModel();
    return () => { 
      isMounted = false;
      // Explicitly dispose of geometries to free memory on mobile
      geometries.forEach(geo => geo.dispose());
    };
  }, [file]); // Only dependencies are file and geometries for cleanup logic


  if (error) {
    return (
      <Html center>
        <div className="text-[#fca5a5] text-center bg-[rgba(20,20,20,0.9)] p-6 rounded-xl border border-[#7f1d1d] w-[300px]">
          <h3 className="mb-2">Render Failed</h3>
          <p className="text-[0.875rem]">{error}</p>
        </div>
      </Html>
    );
  }

  if (geometries.length === 0) {
    return (
      <Html center>
        <div className="text-violet text-center min-w-[200px]">
          <div className="w-10 h-10 mx-auto mb-4 rounded-full border-[3px] border-[rgba(168,85,247,0.2)] border-t-violet animate-spin" />
          <p className="text-[0.9rem] text-[#a1a1aa]">{progress}</p>
        </div>
      </Html>
    );
  }

  const visibleGeometries = selectedIndices != null && selectedIndices.length > 0
    ? selectedIndices.map(i => geometries[i]).filter(Boolean)
    : geometries;

  return (
    <>
      <FitCamera geometries={visibleGeometries} resetToken={resetToken} />
      <group>
        {geometries.map((geo, idx) => {
          const hidden =
            selectedIndices != null &&
            selectedIndices.length > 0 &&
            !selectedIndices.includes(idx);
            
          return (
            <mesh key={idx} geometry={geo} castShadow receiveShadow visible={!hidden}>
              <meshStandardMaterial color="#a1a1aa" metalness={0.8} roughness={0.2} />
            </mesh>
          );
        })}
      </group>
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

export default function ModelViewer({ file, selectedIndices }: ModelViewerProps) {
  const quatRef = useRef(new THREE.Quaternion());
  const [resetToken, setResetToken] = useState(0);
  const [isPanMode, setIsPanMode] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleReset = () => setResetToken(t => t + 1);

  return (
    <div className="w-full h-full relative bg-void">
      <Canvas
        shadows
        camera={{ position: [100, 100, 100], fov: 45, near: 0.1, far: 100000 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -5, -10]} intensity={0.3} />
        <Environment preset="city" />

        <React.Suspense fallback={<Html center><p className="text-[#71717a]">Initializing Scene...</p></Html>}>
          <STEPModel file={file} selectedIndices={selectedIndices} resetToken={resetToken} />
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

      {/* Responsive Legend */}
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

      {/* Floating Controls */}
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

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import occtimportjs from "occt-import-js";

interface ModelViewerProps {
  file: File;
  selectedIndex?: number | null;
}

function FitCamera({ geometries }: { geometries: THREE.BufferGeometry[] }) {
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
  }, [geometries, camera, controls]);

  return null;
}

const STEPModel = ({ file, selectedIndex }: { file: File; selectedIndex?: number | null }) => {
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
    return () => { isMounted = false; };
  }, [file]);

  if (error) {
    return (
      <Html center>
        <div style={{
          color: "#fca5a5",
          textAlign: "center",
          background: "rgba(20,20,20,0.9)",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid #7f1d1d",
          width: "300px",
        }}>
          <h3 style={{ margin: "0 0 0.5rem 0" }}>Render Failed</h3>
          <p style={{ fontSize: "0.875rem", margin: 0 }}>{error}</p>
        </div>
      </Html>
    );
  }

  if (geometries.length === 0) {
    return (
      <Html center>
        <div style={{ color: "var(--accent)", textAlign: "center", minWidth: "200px" }}>
          <div style={{
            width: "40px", height: "40px", margin: "0 auto 1rem",
            border: "3px solid rgba(168,85,247,0.2)",
            borderTop: "3px solid var(--accent)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#a1a1aa" }}>{progress}</p>
          <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
        </div>
      </Html>
    );
  }

  const visibleGeometries = selectedIndex != null ? [geometries[selectedIndex]].filter(Boolean) : geometries;

  return (
    <>
      <FitCamera geometries={visibleGeometries} />
      <group>
        {geometries.map((geo, idx) => {
          const hidden = selectedIndex != null && idx !== selectedIndex;
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
      style={{
        position: "absolute",
        bottom: "3.5rem",
        left: "1rem",
        pointerEvents: "none",
      }}
    />
  );
}

export default function ModelViewer({ file, selectedIndex }: ModelViewerProps) {
  const quatRef = useRef(new THREE.Quaternion());

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#050505" }}>
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

        <React.Suspense fallback={<Html center><p style={{ color: "#71717a" }}>Initializing Scene...</p></Html>}>
          <STEPModel file={file} selectedIndex={selectedIndex} />
        </React.Suspense>

        <OrbitControls makeDefault />
        <CameraSync quatRef={quatRef} />
      </Canvas>

      <AxisOverlay quatRef={quatRef} />

      <div style={{
        position: "absolute", bottom: "1.25rem", left: "1.25rem",
        color: "#52525b", fontSize: "0.7rem", pointerEvents: "none",
        background: "rgba(0,0,0,0.5)", padding: "0.4rem 0.8rem",
        borderRadius: "20px", backdropFilter: "blur(4px)",
      }}>
        Left click rotate • Right click pan • Scroll zoom
      </div>
    </div>
  );
}

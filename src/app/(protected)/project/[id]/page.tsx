"use client";

import { useParams } from "next/navigation";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();

  return (
    <main className="min-h-[100dvh] bg-void flex items-center justify-center relative z-[1]">
      <div className="background-glow absolute inset-0 pointer-events-none z-[-1] overflow-hidden" />
      <div className="upload-card" style={{ maxWidth: 480 }}>
        <div className="w-14 h-14 mx-auto mb-4 rounded-md bg-violet-dim border border-border-mid flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>

        <h1 className="font-display text-[1.3rem] font-extrabold text-fg mb-2">Project</h1>

        <div className="bg-surface border border-border rounded-sm px-4 py-3 mb-4">
          <p className="font-mono text-[0.62rem] text-fg-muted tracking-[0.12em] uppercase mb-1">Project ID</p>
          <p className="font-mono text-[0.82rem] text-fg break-all">{params.id}</p>
        </div>

        <p className="font-mono text-[0.6rem] text-fg-muted tracking-wide">
          3D viewer will be integrated here
        </p>
      </div>
    </main>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { client, loginWithGoogle, getUser, logout } from "@/lib/appwrite";
import type { Models } from "appwrite";

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

export default function Home() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState<"upload" | "analysis">("upload");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check auth session on mount
  useEffect(() => {
    getUser().then((u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  // Verify Appwrite connection on app load
  useEffect(() => {
    client.ping().then(
      () => console.log("✅ Appwrite connection verified"),
      (err: unknown) => console.error("❌ Appwrite ping failed:", err)
    );
  }, []);

  const handleSelectPart = (indices: number[] | null) => {
    if (!indices || indices.length === 0) {
      setSelectedIndices(null);
      return;
    }

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
    if (f) {
      const name = f.name.toLowerCase();
      if (name.endsWith(".step") || name.endsWith(".stp") || name.endsWith(".iges") || name.endsWith(".igs")) {
        setFile(f);
      } else {
        alert("Please upload a valid CAD file (.step, .stp, .iges, or .igs)");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const name = f.name.toLowerCase();
    if (name.endsWith(".step") || name.endsWith(".stp") || name.endsWith(".iges") || name.endsWith(".igs")) {
      setFile(f);
    } else {
      alert("Please upload a valid CAD file (.step, .stp, .iges, or .igs)");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  /* ── LOADING STATE ── */
  if (authLoading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[100dvh] bg-void">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full border-[3px] border-[rgba(124,58,237,0.2)] border-t-violet animate-spin" />
          <p className="font-mono text-[0.75rem] text-fg-sub">Checking session…</p>
        </div>
      </main>
    );
  }

  /* ── LOGIN SCREEN ── */
  if (!user) {
    return (
      <main className="main-container flex-1 flex flex-col items-center justify-center p-8 relative z-[1] min-h-[100dvh] max-md:p-[1.25rem_1rem]">
        <div className="background-glow absolute inset-0 pointer-events-none z-[-1] overflow-hidden" />
        <div className="upload-card" style={{ maxWidth: 420 }}>
          <header className="header flex flex-col items-center">
            <h1 className="font-display text-[1.9rem] font-extrabold text-center leading-tight mb-2 text-fg">
              Auto{" "}
              <span className="bg-gradient-to-br from-violet via-[#a78bfa] to-lime bg-clip-text text-transparent">Quotation</span>
            </h1>
            <p>Sign in to access CNC quoting tools</p>
          </header>

          <button
            className="btn-upload flex items-center justify-center gap-3"
            onClick={loginWithGoogle}
            style={{ marginTop: "1.5rem" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="upload-footer">AutoQuotation · v2 · Secure Login</p>
        </div>
      </main>
    );
  }

  /* ── ANALYSIS VIEW ── */
  if (view === "analysis") {
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
              {file && file.name.length > 20 ? file.name.slice(0, 19) + "…" : file?.name}
            </span>
          </div>

          <div className="flex-1 flex flex-col p-5 overflow-hidden min-h-0 max-md:p-[0.75rem_1rem]">
            <button
              className="flex items-center gap-[0.4rem] bg-transparent border border-border-mid rounded-xs text-fg-sub px-[0.8rem] py-[0.4rem] font-mono text-[0.62rem] font-medium tracking-[0.1em] uppercase cursor-pointer w-fit mb-[0.875rem] transition-all duration-snap ease-expo hover:border-violet hover:text-violet hover:bg-violet-dim hover:-translate-x-[3px] hover:shadow-[4px_0_12px_-4px_var(--color-violet-glow)] active:-translate-x-[3px] active:scale-[0.96] max-md:py-2 max-md:px-[0.875rem] max-md:min-h-9 max-md:mb-2 max-md:hover:translate-x-0 max-md:hover:shadow-none max-md:active:bg-violet-dim max-md:active:border-violet max-md:active:text-violet"
              onClick={() => { setView("upload"); setSelectedIndices(null); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              New File
            </button>

            <div className="flex items-center gap-3 py-[0.7rem] px-[0.875rem] bg-surface border border-border rounded-sm mb-4 shrink-0 transition-colors duration-base hover:border-border-mid max-md:py-2 max-md:px-3 max-md:mb-2">
              <div className="w-[30px] h-[30px] bg-violet-dim border border-border-strong rounded-xs flex items-center justify-center text-violet shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[0.73rem] font-medium text-fg truncate max-md:text-[0.7rem]">{file?.name}</div>
                <div className="font-mono text-[0.58rem] text-fg-muted tracking-[0.08em] uppercase mt-[2px] max-md:text-[0.55rem]">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB · ${file.name.toLowerCase().match(/\.(iges|igs)$/) ? 'IGES' : 'STEP'}` : ""}
                </div>
              </div>
            </div>

            <PartsList file={file!} selectedIndices={selectedIndices} onSelectPart={handleSelectPart} />
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
              {file && <ModelViewer file={file} selectedIndices={selectedIndices} />}
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

      {/* User badge */}
      <div className="absolute top-5 right-5 flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1.5 z-10">
        <Link
          href="/dashboard"
          className="font-mono text-[0.58rem] text-violet hover:text-fg transition-colors uppercase tracking-wider no-underline"
          title="Dashboard"
        >
          Projects
        </Link>
        <span className="text-fg-dim">·</span>
        <span className="font-mono text-[0.65rem] text-fg-sub truncate max-w-[150px]">
          {user.name || user.email}
        </span>
        <button
          onClick={handleLogout}
          className="font-mono text-[0.58rem] text-fg-muted hover:text-red-400 transition-colors uppercase tracking-wider"
          title="Sign out"
        >
          ✕
        </button>
      </div>

      <div className="upload-card">
        <header className="header flex flex-col items-center">
          <h1 className="font-display text-[1.9rem] font-extrabold text-center leading-tight mb-2 text-fg">
            3D Model{" "}
            <span className="bg-gradient-to-br from-violet via-[#a78bfa] to-lime bg-clip-text text-transparent">Viewer</span>
          </h1>
          <p>STEP · STP · IGES · Geometry Analysis</p>
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
          aria-label="Upload STEP file"
        >
          <div className="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>

          {file ? (
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-[0.82rem] font-medium text-lime max-w-[min(300px,80vw)] overflow-hidden text-ellipsis whitespace-nowrap">{file.name}</span>
              <span className="font-mono text-[0.62rem] text-fg-muted tracking-[0.01em] uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready</span>
            </div>
          ) : (
            <>
              <span>Drop your CAD file here</span>
              <small>Accepts .step · .stp · .iges · .igs</small>
            </>
          )}
        </div>

        <button
          className="btn-upload"
          disabled={!file}
          onClick={() => file && setView("analysis")}
          aria-label={file ? "Analyze the uploaded model" : "Upload a file first"}
        >
          {file ? "Analyze Model →" : "Select a File to Continue"}
        </button>

        <p className="upload-footer">AutoQuotation · v2 · STEP & IGES Analyzer</p>
      </div>
    </main>
  );
}

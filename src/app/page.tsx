"use client";

import { useState, useRef } from "react";
import ModelViewer from "@/components/ModelViewer";
import PartsList from "@/components/PartsList";

export default function Home() {
  const [view, setView] = useState<"upload" | "analysis">("upload");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectPart = (i: number) => setSelectedPart(i < 0 ? null : i);

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
    if (f && (f.name.toLowerCase().endsWith(".step") || f.name.toLowerCase().endsWith(".stp"))) {
      setFile(f);
    } else if (f) {
      alert("Please upload a valid STEP file (.step or .stp)");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const name = f.name.toLowerCase();
    if (name.endsWith(".step") || name.endsWith(".stp") || f.type === "" || f.type === "application/octet-stream") {
      setFile(f);
    } else {
      alert("Please upload a valid STEP file (.step or .stp)");
    }
  };

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
              onClick={() => { setView("upload"); setSelectedPart(null); }}
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
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB · STEP` : ""}
                </div>
              </div>
            </div>

            <PartsList file={file!} selectedIndex={selectedPart} onSelectPart={handleSelectPart} />
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
              data-active={selectedPart !== null ? "" : undefined}
              className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-fg-muted bg-surface border border-border rounded-xs px-2 py-[2px] transition-all duration-base data-[active]:text-lime data-[active]:bg-lime-dim data-[active]:border-border-lime data-[active]:shadow-[0_0_8px_var(--color-lime-glow)] max-md:text-[0.55rem] max-md:px-[6px] max-md:max-w-[140px] max-md:overflow-hidden max-md:text-ellipsis max-md:whitespace-nowrap"
            >
              {selectedPart !== null ? `Part ${selectedPart + 1} selected` : "Orbit · Pan · Zoom"}
            </span>
          </div>

          <div className="flex-1 flex flex-col p-5 overflow-hidden min-h-0 max-md:p-3 safe-pb">
            <div className="model-preview flex-1 bg-elevated rounded-md border border-border flex items-center justify-center relative overflow-hidden">
              {file && <ModelViewer file={file} selectedIndex={selectedPart} />}
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

      <div className="upload-card">
        <header className="header flex flex-col items-center">
          <h1 className="font-display text-[clamp(1.75rem,8vw,2.4rem)] font-extrabold flex items-baseline justify-center gap-0 leading-tight mb-2 text-fg">
            <span>Auto</span>
            <span className="bg-gradient-to-br from-violet via-[#a78bfa] to-lime bg-clip-text text-transparent">Quotation</span>
          </h1>
          <p>CNC · STEP · STP · Geometry Analysis</p>
        </header>

        <label
          data-active={dragActive ? "" : undefined}
          className="drop-zone border border-border-mid rounded-lg p-[2.25rem_1.5rem] cursor-pointer bg-[rgba(124,58,237,0.04)] flex flex-col items-center gap-3 relative transition-all duration-base ease-expo hover:border-border-strong hover:bg-violet-dim hover:-translate-y-0.5 hover:shadow-[0_8px_40px_var(--color-violet-glow)] data-[active]:border-lime data-[active]:bg-lime-dim data-[active]:shadow-[0_0_0_3px_var(--color-lime-glow),0_12px_40px_var(--color-lime-glow)] data-[active]:scale-[1.01] max-md:p-[2rem_1.25rem] max-md:gap-[0.65rem] max-md:transform-none"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          aria-label="Upload STEP file"
        >
          <input
            ref={inputRef}
            type="file"
            onChange={handleChange}
            multiple={false}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-[1]"
          />
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
              <span>Drop your STEP file here</span>
              <small>Accepts .step · .stp</small>
            </>
          )}
        </label>

        <button
          className="btn-upload"
          disabled={!file}
          onClick={() => file && setView("analysis")}
          aria-label={file ? "Analyze the uploaded model" : "Upload a file first"}
        >
          {file ? "Analyze Model →" : "Select a File to Continue"}
        </button>

        <p className="upload-footer">AutoQuotation · v2 · STEP Analyzer</p>
      </div>
    </main>
  );
}

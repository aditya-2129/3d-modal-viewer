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
    e.preventDefault();
    const f = e.target.files?.[0];
    if (f && (f.name.toLowerCase().endsWith(".step") || f.name.toLowerCase().endsWith(".stp"))) {
      setFile(f);
    } else if (f) {
      alert("Please upload a valid STEP file (.step or .stp)");
    }
  };

  /* ── ANALYSIS VIEW ── */
  if (view === "analysis") {
    return (
      <div className="analysis-container">

        {/* Left: Parts sidebar */}
        <section className="left-panel">
          <div className="panel-topbar">
            <span className="panel-topbar-title">
              {/* Layers icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
              Parts Tree
            </span>
            <span className="panel-topbar-badge">
              {file && file.name.length > 20 ? file.name.slice(0, 19) + "…" : file?.name}
            </span>
          </div>

          <div className="panel-content">
            <button
              className="back-btn"
              onClick={() => { setView("upload"); setSelectedPart(null); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              New File
            </button>

            <div className="file-strip">
              <div className="file-strip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="file-strip-info">
                <div className="file-strip-name">{file?.name}</div>
                <div className="file-strip-meta">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB · STEP` : ""}
                </div>
              </div>
            </div>

            <PartsList file={file!} selectedIndex={selectedPart} onSelectPart={handleSelectPart} />
          </div>
        </section>

        {/* Right: 3D viewer */}
        <section className="right-panel">
          <div className="panel-topbar">
            <span className="panel-topbar-title">
              {/* Aperture icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <span className={`panel-topbar-badge${selectedPart !== null ? " active" : ""}`}>
              {selectedPart !== null ? `Part ${selectedPart + 1} selected` : "Orbit · Pan · Zoom"}
            </span>
          </div>

          <div className="panel-content">
            <div className="model-preview">
              {file && <ModelViewer file={file} selectedIndex={selectedPart} />}
            </div>
          </div>
        </section>

      </div>
    );
  }

  /* ── UPLOAD VIEW ── */
  return (
    <main className="main-container">
      <div className="background-glow" />

      <div className="upload-card">
        <header className="header">
          <h1>
            Auto<span className="accent-word">Quotation</span>
          </h1>
          <p>CNC · STEP · STP · Geometry Analysis</p>
        </header>

        <label
          htmlFor="file-upload"
          className={`drop-zone${dragActive ? " active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          tabIndex={0}
          aria-label="Upload STEP file"
          onKeyDown={e => e.key === "Enter" && inputRef.current?.click()}
        >
          <input
            id="file-upload"
            ref={inputRef}
            type="file"
            className="file-input"
            onChange={handleChange}
            accept=".step,.stp"
            multiple={false}
          />

          <div className="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>

          {file ? (
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-meta">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready</span>
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

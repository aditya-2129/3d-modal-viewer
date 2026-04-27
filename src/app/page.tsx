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
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.toLowerCase().endsWith(".step") || droppedFile.name.toLowerCase().endsWith(".stp")) {
        setFile(droppedFile);
      } else {
        alert("Please upload a valid STEP file (.step or .stp)");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.toLowerCase().endsWith(".step") || selectedFile.name.toLowerCase().endsWith(".stp")) {
        setFile(selectedFile);
      } else {
        alert("Please upload a valid STEP file (.step or .stp)");
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (file) {
      setView("analysis");
    }
  };

  if (view === "analysis") {
    return (
      <div className="analysis-container">
        {/* Left Half: Model Metadata & Analysis */}
        <section className="left-panel">
          <button className="back-btn" onClick={() => { setView("upload"); setSelectedPart(null); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Upload
          </button>

          {/* <div className="panel-header">
            <h2>Model Analysis</h2>
            <p style={{ color: "#a1a1aa", marginTop: "0.5rem" }}>Detailed geometric data for {file?.name}</p>
          </div>
          
          <div className="info-grid">
            <div className="info-card">
              <label>Filename</label>
              <span>{file?.name}</span>
            </div>
            <div className="info-card">
              <label>File Size</label>
              <span>{(file!.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="info-card">
              <label>Material</label>
              <span>Aluminum 6061</span>
            </div>
            <div className="info-card">
              <label>Estimated Cost</label>
              <span style={{ color: "var(--accent)" }}>$245.00</span>
            </div>
          </div> */}

          <PartsList file={file!} selectedIndex={selectedPart} onSelectPart={handleSelectPart} />
        </section>

        {/* Right Half: 3D Preview */}
        <section className="right-panel">
          <div className="panel-header">
            <h2>3D Preview</h2>
          </div>
          <div className="model-preview">
            {file && <ModelViewer file={file} selectedIndex={selectedPart} />}
          </div>
        </section>
      </div>
    );
  }

  return (
    <main className="main-container">
      <div className="background-glow"></div>
      
      <div className="upload-card">
        <header className="header">
          <h1>AutoQuotation</h1>
          <p>Generate precise quotes for your 3D models.</p>
        </header>

        <div 
          className={`drop-zone ${dragActive ? "active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <input
            ref={inputRef}
            type="file"
            className="file-input"
            onChange={handleChange}
            accept=".step,.stp"
            multiple={false}
          />
          
          <div className="upload-icon">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>

          {file ? (
            <div className="file-info">
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>{file.name}</span>
              <small style={{ display: "block", marginTop: "4px" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
            </div>
          ) : (
            <>
              <span>Click or drag STEP file here</span>
              <small>Supported formats: .step, .stp</small>
            </>
          )}
        </div>

        <button className="btn-upload" disabled={!file} onClick={handleAnalyze}>
          {file ? "Analyze Model" : "Upload CAD File"}
        </button>
      </div>
    </main>
  );
}




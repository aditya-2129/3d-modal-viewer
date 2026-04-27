"use client";

import { useEffect, useState, useCallback } from "react";

interface BoundingBox {
  xMin: number; yMin: number; zMin: number;
  xMax: number; yMax: number; zMax: number;
  xLen: number; yLen: number; zLen: number;
}

interface Stock {
  stockShape: "round" | "hex" | "rect";
  diameter?: number; length?: number;
  acrossFlats?: number;
  x?: number; y?: number; z?: number;
  stockDiameter?: number; stockLength?: number;
  stockAcrossFlats?: number;
  stockX?: number; stockY?: number; stockZ?: number;
}

interface Part {
  name: string;
  type: string;
  solidCount?: number;
  boundingBox: BoundingBox | null;
  stock?: Stock | null;
  children: Part[];
}

function formatStock(stock: Stock): { label: string; dims: string } {
  switch (stock.stockShape) {
    case "round":  return { label: "RND",  dims: `∅${stock.stockDiameter}×${stock.stockLength}mm` };
    case "hex":    return { label: "HEX",  dims: `AF${stock.stockAcrossFlats}×${stock.stockLength}mm` };
    case "rect":
    default:       return { label: "RECT", dims: `${stock.stockX}×${stock.stockY}×${stock.stockZ}mm` };
  }
}

function typeStyle(type: string): { bg: string; border: string; color: string } {
  switch (type) {
    case "Solid":    return { bg: "rgba(124,58,237,0.14)",  border: "rgba(124,58,237,0.38)",  color: "#a78bfa" };
    case "Compound": return { bg: "rgba(163,230,53,0.10)",  border: "rgba(163,230,53,0.32)",  color: "#a3e635" };
    case "Shell":    return { bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.30)",  color: "#22d3ee" };
    case "Face":     return { bg: "rgba(251,113,133,0.10)", border: "rgba(251,113,133,0.30)", color: "#fb7185" };
    default:         return { bg: "rgba(139,135,168,0.08)", border: "rgba(139,135,168,0.20)", color: "#8b87a8" };
  }
}

function PartRow({ part, depth, index, selectedIndex, onSelect, onSelectAndClose }: {
  part: Part;
  depth: number;
  index: number;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
  onSelectAndClose?: (i: number) => void;
}) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = part.children.length > 0;
  const bb = part.boundingBox;
  const isSelected = selectedIndex === index;
  const ts = typeStyle(part.type);

  const partDim = bb ? `${bb.xLen.toFixed(1)}×${bb.yLen.toFixed(1)}×${bb.zLen.toFixed(1)}` : null;
  const stockInfo = part.stock ? formatStock(part.stock) : null;

  const handleClick = () => {
    if (hasChildren) setOpen(!open);
    if (onSelectAndClose) {
      onSelectAndClose(isSelected ? -1 : index);
    } else {
      onSelect(isSelected ? -1 : index);
    }
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-selected={isSelected}
        onClick={handleClick}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); }}}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.45rem",
          padding: "0.5rem 0.875rem",
          paddingLeft: `${0.875 + depth * 1.1}rem`,
          cursor: "pointer",
          borderBottom: "1px solid rgba(124,58,237,0.06)",
          transition: "background 0.12s, border-color 0.12s",
          background: isSelected ? "rgba(124,58,237,0.10)" : "transparent",
          borderLeft: `2px solid ${isSelected ? "#7c3aed" : "transparent"}`,
          outline: "none",
        }}
        onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)"; }}
        onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
        onFocus={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(124,58,237,0.06)"; }}
        onBlur={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
      >
        <span style={{
          width: "11px",
          flexShrink: 0,
          color: "var(--fg-muted)",
          fontSize: "0.58rem",
          fontFamily: "var(--font-mono)",
          lineHeight: 1,
          marginTop: "2px",
        }}>
          {hasChildren ? (open ? "▾" : "▸") : "·"}
        </span>

        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.56rem",
          fontWeight: 600,
          padding: "1px 5px",
          borderRadius: "3px",
          background: ts.bg,
          border: `1px solid ${ts.border}`,
          color: ts.color,
          flexShrink: 0,
          letterSpacing: "0.06em",
          lineHeight: 1.5,
          marginTop: "1px",
        }}>
          {part.type.toUpperCase()}
        </span>

        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.73rem",
          fontWeight: isSelected ? 500 : 400,
          color: isSelected ? "var(--fg)" : "var(--fg-sub)",
          flex: 1,
          wordBreak: "break-all",
          lineHeight: 1.5,
          letterSpacing: "0.01em",
        }}>
          {part.name}
        </span>

        {(partDim || stockInfo) && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px", flexShrink: 0 }}>
            {partDim && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--fg-muted)", letterSpacing: "0.02em" }}>
                {partDim}
              </span>
            )}
            {stockInfo && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--lime)", letterSpacing: "0.02em" }}>
                <span style={{ opacity: 0.55, marginRight: "3px" }}>{stockInfo.label}</span>
                {stockInfo.dims}
              </span>
            )}
          </div>
        )}
      </div>

      {open && hasChildren && (
        <div>
          {part.children.map((child, i) => (
            <PartRow key={i} part={child} depth={depth + 1} index={index} selectedIndex={selectedIndex} onSelect={onSelect} onSelectAndClose={onSelectAndClose} />
          ))}
        </div>
      )}
    </div>
  );
}

function PartsListContent({ parts, loading, error, selectedIndex, onSelect, onSelectAndClose }: {
  parts: Part[] | null;
  loading: boolean;
  error: string | null;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
  onSelectAndClose?: (i: number) => void;
}) {
  return (
    <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
      {loading && (
        <div style={{ padding: "1rem 0.875rem", display: "flex", flexDirection: "column", gap: "6px" }}>
          {[100, 80, 90, 70, 85].map((w, i) => (
            <div key={i} style={{
              height: "28px",
              background: `linear-gradient(90deg, var(--bg-surface) 0%, rgba(124,58,237,0.06) 50%, var(--bg-surface) 100%)`,
              borderRadius: "var(--r-xs)",
              width: `${w}%`,
              animation: `shimmerRow 1.4s ease-in-out infinite`,
              animationDelay: `${i * 120}ms`,
            }} />
          ))}
        </div>
      )}

      {error && (
        <div style={{
          margin: "0.875rem",
          padding: "0.75rem 0.875rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          color: "var(--error)",
          background: "rgba(248,113,113,0.06)",
          border: "1px solid rgba(248,113,113,0.20)",
          borderRadius: "var(--r-xs)",
          lineHeight: 1.6,
        }}>
          {error}
        </div>
      )}

      {parts && parts.length === 0 && (
        <div style={{
          padding: "2.5rem 1rem", textAlign: "center",
          fontFamily: "var(--font-mono)", fontSize: "0.68rem",
          color: "var(--fg-muted)", letterSpacing: "0.08em",
        }}>
          No parts detected.
        </div>
      )}

      {parts && parts.map((p, i) => (
        <PartRow key={i} part={p} depth={0} index={i} selectedIndex={selectedIndex} onSelect={onSelect} onSelectAndClose={onSelectAndClose} />
      ))}
    </div>
  );
}

export default function PartsList({ file, selectedIndex, onSelectPart }: {
  file: File;
  selectedIndex: number | null;
  onSelectPart: (i: number) => void;
}) {
  const [parts, setParts] = useState<Part[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fd = new FormData();
    fd.append("file", file);
    fetch("/api/analyze-parts", { method: "POST", body: fd })
      .then(r => r.json())
      .then(data => { if (data.error) setError(data.error); else setParts(data.parts); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [file]);

  // Close modal on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  const handleSelectAndClose = useCallback((i: number) => {
    onSelectPart(i);
    setModalOpen(false);
  }, [onSelectPart]);

  const count = parts?.length ?? 0;

  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%,100%{opacity:0.25;transform:scale(0.7)} 50%{opacity:1;transform:scale(1.3)}
        }
        @keyframes shimmerRow {
          0%,100%{opacity:0.3} 50%{opacity:0.6}
        }
        @keyframes modalFadeIn {
          from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)}
        }
        @keyframes backdropIn {
          from{opacity:0} to{opacity:1}
        }
        .hierarchy-btn:hover {
          color: var(--fg) !important;
          border-color: var(--border-mid) !important;
        }
      `}</style>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-sm)",
        overflow: "hidden",
        background: "var(--bg-elevated)",
        minHeight: 0,
      }}>
        {/* Header — clickable to open modal */}
        <button
          className="hierarchy-btn"
          onClick={() => !loading && setModalOpen(true)}
          disabled={loading}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.55rem 0.875rem",
            background: "rgba(124,58,237,0.04)",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
            cursor: loading ? "default" : "pointer",
            border: "none",
            borderRadius: 0,
            width: "100%",
            transition: "background 0.15s",
          }}
        >
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-sub)",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            Hierarchy
            {!loading && parts && (
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            )}
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.08em",
            color: loading ? "var(--fg-muted)" : error ? "var(--error)" : "var(--lime)",
            display: "flex", alignItems: "center", gap: "5px",
          }}>
            {loading && (
              <span style={{
                display: "inline-block", width: "5px", height: "5px", borderRadius: "50%",
                background: "var(--violet)",
                animation: "dotPulse 1.1s ease-in-out infinite",
              }} />
            )}
            {loading ? "Scanning…" : error ? "Error" : `${count} part${count !== 1 ? "s" : ""}`}
          </span>
        </button>

        {/* Inline compact list (preview) */}
        <PartsListContent
          parts={parts}
          loading={loading}
          error={error}
          selectedIndex={selectedIndex}
          onSelect={onSelectPart}
        />
      </div>

      {/* Full-screen modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(5,5,10,0.85)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
            animation: "backdropIn 0.2s ease",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "min(680px, 100%)",
              maxHeight: "min(82dvh, 900px)",
              display: "flex",
              flexDirection: "column",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-mid)",
              borderRadius: "var(--r-md)",
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(124,58,237,0.1), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(124,58,237,0.08)",
              animation: "modalFadeIn 0.22s var(--ease-expo)",
            }}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.875rem 1.25rem",
              borderBottom: "1px solid var(--border)",
              background: "rgba(124,58,237,0.05)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-sub)",
                }}>
                  Parts Hierarchy
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                  color: "var(--lime)",
                  background: "var(--lime-dim)",
                  border: "1px solid rgba(163,230,53,0.25)",
                  borderRadius: "var(--r-xs)",
                  padding: "1px 7px",
                  letterSpacing: "0.08em",
                }}>
                  {count} part{count !== 1 ? "s" : ""}
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-xs)",
                  color: "var(--fg-sub)",
                  width: "28px", height: "28px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  lineHeight: 1,
                  transition: "all 0.12s",
                  flexShrink: 0,
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Hint */}
            <div style={{
              padding: "0.5rem 1.25rem",
              borderBottom: "1px solid rgba(124,58,237,0.06)",
              flexShrink: 0,
              background: "rgba(124,58,237,0.02)",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                color: "var(--fg-muted)", letterSpacing: "0.06em",
              }}>
                Click a part to select it and close
              </span>
            </div>

            {/* Full scrollable list */}
            <PartsListContent
              parts={parts}
              loading={loading}
              error={error}
              selectedIndex={selectedIndex}
              onSelect={onSelectPart}
              onSelectAndClose={handleSelectAndClose}
            />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

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
    case "round":
      return { label: "Round", dims: `∅${stock.stockDiameter} × ${stock.stockLength} mm` };
    case "hex":
      return { label: "Hex", dims: `AF ${stock.stockAcrossFlats} × ${stock.stockLength} mm` };
    case "rect":
    default:
      return { label: "Rect", dims: `${stock.stockX} × ${stock.stockY} × ${stock.stockZ} mm` };
  }
}

function PartRow({ part, depth, index, selectedIndex, onSelect }: {
  part: Part;
  depth: number;
  index: number;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
}) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = part.children.length > 0;
  const bb = part.boundingBox;
  const isSelected = selectedIndex === index;

  const partDim = bb
    ? `${bb.xLen.toFixed(1)} × ${bb.yLen.toFixed(1)} × ${bb.zLen.toFixed(1)}`
    : null;
  const stockInfo = part.stock ? formatStock(part.stock) : null;

  return (
    <div>
      <div
        onClick={() => {
          if (hasChildren) setOpen(!open);
          onSelect(isSelected ? -1 : index);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 0.75rem",
          paddingLeft: `${0.75 + depth * 1.25}rem`,
          cursor: "pointer",
          borderBottom: "1px solid #1f1f23",
          transition: "background 0.15s",
          background: isSelected ? "#1e1b2e" : "transparent",
          borderLeft: isSelected ? "2px solid #a78bfa" : "2px solid transparent",
        }}
        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#18181b"; }}
        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
      >
        {/* expand toggle */}
        <span style={{ width: "14px", flexShrink: 0, color: "#52525b", fontSize: "0.7rem" }}>
          {hasChildren ? (open ? "▾" : "▸") : "·"}
        </span>

        {/* type badge */}
        <span style={{
          fontSize: "0.65rem",
          padding: "1px 6px",
          borderRadius: "4px",
          background: typeColor(part.type) + "22",
          color: typeColor(part.type),
          fontWeight: 600,
          flexShrink: 0,
        }}>
          {part.type}
        </span>

        {/* name */}
        <span style={{ fontSize: "0.85rem", color: "#e4e4e7", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {part.name}
        </span>

        {/* dimensions */}
        {(partDim || stockInfo) && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px", flexShrink: 0 }}>
            {partDim && (
              <span style={{ fontSize: "0.68rem", color: "#71717a", fontFamily: "monospace" }}>
                <span style={{ color: "#52525b", marginRight: "4px" }}>Part</span>{partDim} mm
              </span>
            )}
            {stockInfo && (
              <span style={{ fontSize: "0.68rem", color: "#a78bfa", fontFamily: "monospace" }}>
                <span style={{ color: "#7c3aed", marginRight: "4px" }}>{stockInfo.label}</span>{stockInfo.dims}
              </span>
            )}
          </div>
        )}
      </div>

      {open && hasChildren && (
        <div>
          {part.children.map((child, i) => (
            <PartRow key={i} part={child} depth={depth + 1} index={index} selectedIndex={selectedIndex} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function typeColor(type: string) {
  switch (type) {
    case "Solid": return "#a78bfa";
    case "Compound": return "#60a5fa";
    case "Shell": return "#34d399";
    case "Face": return "#fb923c";
    default: return "#71717a";
  }
}

export default function PartsList({ file, selectedIndex, onSelectPart }: {
  file: File;
  selectedIndex: number | null;
  onSelectPart: (i: number) => void;
}) {
  const [parts, setParts] = useState<Part[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fd = new FormData();
    fd.append("file", file);

    fetch("/api/analyze-parts", { method: "POST", body: fd })
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setParts(data.parts);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [file]);

  return (
    <div style={{
      marginTop: "1.5rem",
      border: "1px solid #27272a",
      borderRadius: "12px",
      overflow: "hidden",
      background: "#0a0a0a",
    }}>
      {/* header */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.85rem 1rem",
          background: "#111113",
          border: "none",
          borderBottom: open ? "1px solid #27272a" : "none",
          cursor: "pointer",
          color: "#e4e4e7",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Parts Tree</span>
        <span style={{ color: "#52525b", fontSize: "0.75rem" }}>
          {loading ? "Loading..." : error ? "Error" : `${parts?.length ?? 0} top-level part${parts?.length !== 1 ? "s" : ""}`}
          {" "}{open ? "▾" : "▸"}
        </span>
      </button>

      {open && (
        <div style={{ maxHeight: "320px", overflowY: "auto" }}>
          {loading && (
            <div style={{ padding: "2rem", textAlign: "center", color: "#52525b", fontSize: "0.85rem" }}>
              Analyzing with FreeCAD...
            </div>
          )}
          {error && (
            <div style={{ padding: "1rem", color: "#fca5a5", fontSize: "0.8rem" }}>
              {error}
            </div>
          )}
          {parts && parts.length === 0 && (
            <div style={{ padding: "1rem", color: "#52525b", fontSize: "0.85rem" }}>No parts found.</div>
          )}
          {parts && parts.map((p, i) => (
            <PartRow key={i} part={p} depth={0} index={i} selectedIndex={selectedIndex} onSelect={onSelectPart} />
          ))}
        </div>
      )}
    </div>
  );
}

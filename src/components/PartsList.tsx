"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

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
  groupKey?: string | null;
  centerOfMass?: { x: number; y: number; z: number } | null;
  globalIndex?: number;
}

type PartGroup = {
  representative: Part;
  indices: number[];                                      // original flat indices
  positions: Array<{ x: number; y: number; z: number } | null>;
};

function groupSiblings(parts: Part[]): PartGroup[] {
  const groups = new Map<string, PartGroup>();
  const order: string[] = [];
  let singletonIdx = 0;

  parts.forEach((part) => {
    // Default to the part's own index if for some reason globalIndex is missing
    const gIdx = part.globalIndex ?? 0;
    
    const key = (part.groupKey && part.groupKey !== "") 
      ? part.groupKey 
      : `__singleton_${singletonIdx++}`;

    if (groups.has(key)) {
      const g = groups.get(key)!;
      g.indices.push(gIdx);
      g.positions.push(part.centerOfMass || null);
    } else {
      const g: PartGroup = {
        representative: part,
        indices: [gIdx],
        positions: [part.centerOfMass || null],
      };
      groups.set(key, g);
      order.push(key);
    }
  });

  return order.map(k => groups.get(k)!);
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

function PartRow({ group, depth, selectedIndices, onSelect, onSelectAndClose }: {
  group: PartGroup;
  depth: number;
  selectedIndices: number[] | null;
  onSelect: (indices: number[]) => void;
  onSelectAndClose?: (indices: number[]) => void;
}) {
  const [open, setOpen] = useState(depth === 0);
  const [expanded, setExpanded] = useState(false);
  const part = group.representative;
  const count = group.indices.length;
  const hasChildren = part.children.length > 0;
  const bb = part.boundingBox;
  
  const isSelected = selectedIndices != null && 
    group.indices.every(idx => selectedIndices.includes(idx));
    
  const ts = typeStyle(part.type);

  const partDim = bb ? `${bb.xLen.toFixed(1)}×${bb.yLen.toFixed(1)}×${bb.zLen.toFixed(1)}` : null;
  const stockInfo = part.stock ? formatStock(part.stock) : null;

  const handleClick = () => {
    if (count === 1 && hasChildren) setOpen(!open);
    const target = isSelected ? [] : group.indices;
    if (onSelectAndClose) onSelectAndClose(target);
    else onSelect(target);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-selected={isSelected}
        onClick={handleClick}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); }}}
        className="flex items-start gap-[0.45rem] p-[0.5rem_0.875rem] cursor-pointer border-b border-[rgba(124,58,237,0.06)] transition-[background,border-color] duration-[120ms] outline-none"
        style={{
          paddingLeft: `${0.875 + depth * 1.1}rem`,
          background: isSelected ? "rgba(124,58,237,0.10)" : "transparent",
          borderLeft: `2px solid ${isSelected ? "#7c3aed" : "transparent"}`,
        }}
        onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)"; }}
        onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
        onFocus={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(124,58,237,0.06)"; }}
        onBlur={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
      >
        <span 
          className="w-[11px] shrink-0 text-fg-muted text-[0.58rem] font-mono leading-none mt-[2px] hover:text-fg transition-colors"
          onClick={(e) => {
            if (count > 1) {
              e.stopPropagation();
              setExpanded(!expanded);
            } else if (hasChildren) {
              e.stopPropagation();
              setOpen(!open);
            }
          }}
        >
          {count > 1 ? (expanded ? "▾" : "▸") : hasChildren ? (open ? "▾" : "▸") : "·"}
        </span>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-start gap-[0.45rem]">
            <span
              className="font-mono text-[0.56rem] font-semibold p-[1px_5px] rounded-[3px] shrink-0 tracking-[0.06em] leading-[1.5] mt-[1px]"
              style={{
                background: ts.bg,
                border: `1px solid ${ts.border}`,
                color: ts.color,
              }}
            >
              {part.type.toUpperCase()}
            </span>

            {count > 1 && (
              <span className="font-mono text-[0.58rem] text-lime tracking-[0.02em] bg-lime-dim border border-[rgba(163,230,53,0.25)] rounded-xs px-[5px] mt-[1px]">
                ×{count}
              </span>
            )}

            <span 
              className="font-mono text-[0.73rem] flex-1 break-all leading-[1.5] tracking-[0.01em]"
              style={{
                fontWeight: isSelected ? 500 : 400,
                color: isSelected ? "var(--fg)" : "var(--fg-sub)",
              }}
            >
              {part.name}
            </span>

            {(partDim || stockInfo) && (
              <div className="flex flex-col items-end gap-[2px] shrink-0">
                {partDim && (
                  <span className="font-mono text-[0.58rem] text-fg-muted tracking-[0.02em]">
                    {partDim}
                  </span>
                )}
                {stockInfo && (
                  <span className="font-mono text-[0.58rem] text-lime tracking-[0.02em]">
                    <span className="opacity-[0.55] mr-[3px]">{stockInfo.label}</span>
                    {stockInfo.dims}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {expanded && count > 1 && (
        <div className="py-1">
          {group.indices.map((idx, i) => {
            const pos = group.positions[i];
            const isInstanceSelected = selectedIndices?.length === 1 && selectedIndices[0] === idx;
            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  const target = isInstanceSelected ? [] : [idx];
                  if (onSelectAndClose) onSelectAndClose(target);
                  else onSelect(target);
                }}
                className="flex items-center gap-2 p-[0.35rem_0.875rem] cursor-pointer transition-colors border-l-2 border-transparent"
                style={{
                  paddingLeft: `${0.875 + depth * 1.1 + 1.2}rem`,
                  background: isInstanceSelected ? "rgba(124,58,237,0.08)" : "transparent",
                  borderLeftColor: isInstanceSelected ? "#7c3aed" : "transparent"
                }}
                onMouseEnter={e => { if (!isInstanceSelected) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)"; }}
                onMouseLeave={e => { if (!isInstanceSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <span className="font-mono text-[0.62rem] text-fg-muted">#{i + 1}</span>
                <span className="font-mono text-[0.62rem] text-fg-sub opacity-70">
                  · {pos ? `(${pos.x}, ${pos.y}, ${pos.z})` : `Instance ${i + 1}`}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {open && hasChildren && (
        <div>
          {groupSiblings(part.children).map((g, i) => (
            <PartRow key={i} group={g} depth={depth + 1} selectedIndices={selectedIndices} onSelect={onSelect} onSelectAndClose={onSelectAndClose} />
          ))}
        </div>
      )}
    </div>
  );
}

function PartsListContent({ parts, loading, error, selectedIndices, onSelect, onSelectAndClose }: {
  parts: Part[] | null;
  loading: boolean;
  error: string | null;
  selectedIndices: number[] | null;
  onSelect: (indices: number[]) => void;
  onSelectAndClose?: (indices: number[]) => void;
}) {
  const groups = useMemo(() => parts ? groupSiblings(parts) : [], [parts]);

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      {loading && (
        <div className="p-[1rem_0.875rem] flex flex-col gap-[6px]">
          {[100, 80, 90, 70, 85].map((w, i) => (
            <div key={i} className="h-[28px] rounded-xs" style={{
              background: `linear-gradient(90deg, var(--bg-surface) 0%, rgba(124,58,237,0.06) 50%, var(--bg-surface) 100%)`,
              width: `${w}%`,
              animation: `shimmerRow 1.4s ease-in-out infinite`,
              animationDelay: `${i * 120}ms`,
            }} />
          ))}
        </div>
      )}

      {error && (
        <div className="m-[0.875rem] p-[0.75rem_0.875rem] font-mono text-[0.68rem] text-error bg-[rgba(248,113,113,0.06)] border border-[rgba(248,113,113,0.20)] rounded-xs leading-relaxed">
          {error}
        </div>
      )}

      {parts && parts.length === 0 && (
        <div className="px-4 py-10 text-center font-mono text-[0.68rem] text-fg-muted tracking-[0.08em]">
          No parts detected.
        </div>
      )}

      {groups.map((g, i) => (
        <PartRow key={i} group={g} depth={0} selectedIndices={selectedIndices} onSelect={onSelect} onSelectAndClose={onSelectAndClose} />
      ))}
    </div>
  );
}

export default function PartsList({ file, selectedIndices, onSelectPart }: {
  file: File;
  selectedIndices: number[] | null;
  onSelectPart: (indices: number[] | null) => void;
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

  const groups = useMemo(() => parts ? groupSiblings(parts) : [], [parts]);
  const totalCount = parts?.length ?? 0;
  const groupCount = groups.length;

  // Close modal on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  const handleSelectAndClose = useCallback((indices: number[]) => {
    onSelectPart(indices.length > 0 ? indices : null);
    setModalOpen(false);
  }, [onSelectPart]);


  return (
    <>
      <div className="flex-1 flex flex-col border border-border rounded-sm overflow-hidden bg-elevated min-h-0">
        {/* Header — clickable to open modal */}
        <button
          className={`flex items-center justify-between p-[0.55rem_0.875rem] border-b border-border shrink-0 border-x-0 border-t-0 rounded-none w-full bg-[rgba(124,58,237,0.04)] transition-colors duration-[150ms] hover:bg-[rgba(124,58,237,0.07)] ${loading ? "cursor-default" : "cursor-pointer"}`}
          onClick={() => !loading && setModalOpen(true)}
          disabled={loading}
        >
          <span className="font-mono text-[0.62rem] font-semibold tracking-[0.12em] uppercase text-fg-sub flex items-center gap-[6px]">
            Hierarchy
            {!loading && parts && (
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            )}
          </span>
          <span className={`font-mono text-[0.58rem] tracking-[0.08em] flex items-center gap-[5px] ${loading ? "text-fg-muted" : error ? "text-error" : "text-lime"}`}>
            {loading && (
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-violet animate-[dotPulse_1.1s_ease-in-out_infinite]" />
            )}
            {loading ? "Scanning…" : error ? "Error" : (
              groupCount !== totalCount 
                ? `${groupCount} unique · ${totalCount} total` 
                : `${totalCount} part${totalCount !== 1 ? "s" : ""}`
            )}
          </span>
        </button>

        {/* Inline compact list (preview) */}
        <PartsListContent
          parts={parts}
          loading={loading}
          error={error}
          selectedIndices={selectedIndices}
          onSelect={onSelectPart}
        />
      </div>

      {/* Full-screen modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-[1000] bg-[rgba(5,5,10,0.85)] backdrop-blur-[6px] flex items-center justify-center p-4 animate-[backdropIn_0.2s_ease]"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-[min(680px,100%)] max-h-[min(82dvh,900px)] flex flex-col bg-elevated border border-border-mid rounded-md overflow-hidden shadow-[0_0_0_1px_rgba(124,58,237,0.1),0_32px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(124,58,237,0.08)] animate-[modalFadeIn_0.22s_var(--ease-expo)]"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-[0.875rem_1.25rem] border-b border-border bg-[rgba(124,58,237,0.05)] shrink-0">
              <div className="flex items-center gap-[0.75rem]">
                <span className="font-mono text-[0.62rem] font-bold tracking-[0.14em] uppercase text-fg-sub">
                  Parts Hierarchy
                </span>
                <span className="font-mono text-[0.58rem] text-lime bg-lime-dim border border-[rgba(163,230,53,0.25)] rounded-xs p-[1px_7px] tracking-[0.08em]">
                  {groupCount !== totalCount 
                    ? `${groupCount} unique · ${totalCount} total` 
                    : `${totalCount} part${totalCount !== 1 ? "s" : ""}`}
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-surface border border-border rounded-xs text-fg-sub w-[28px] h-[28px] flex items-center justify-center cursor-pointer text-[0.8rem] leading-none transition-all duration-[120ms] shrink-0"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Hint */}
            <div className="p-[0.5rem_1.25rem] border-b border-[rgba(124,58,237,0.06)] shrink-0 bg-[rgba(124,58,237,0.02)]">
              <span className="font-mono text-[0.58rem] text-fg-muted tracking-[0.06em]">
                Click a part to select it and close
              </span>
            </div>

            {/* Full scrollable list */}
            <PartsListContent
              parts={parts}
              loading={loading}
              error={error}
              selectedIndices={selectedIndices}
              onSelect={onSelectPart}
              onSelectAndClose={handleSelectAndClose}
            />
          </div>
        </div>
      )}
    </>
  );
}

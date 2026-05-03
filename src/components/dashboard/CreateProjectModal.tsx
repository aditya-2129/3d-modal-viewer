"use client";

import { useState, useRef, useEffect } from "react";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<void>;
}

export default function CreateProjectModal({
  open,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      // Focus input after animation frame
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      dialog.close();
    }
  }, [open]);

  // Handle native close (Escape key)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setName("");
      setError(null);
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Project name is required");
      return;
    }

    setCreating(true);
    setError(null);
    try {
      await onCreate(trimmed);
      setName("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="bg-transparent border-none p-0 m-auto max-w-[420px] w-[calc(100%-2rem)] backdrop:bg-[rgba(5,5,10,0.75)] backdrop:backdrop-blur-sm backdrop:animate-[backdropIn_200ms_ease] open:animate-[modalFadeIn_280ms_cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="bg-card border border-border rounded-xl p-6 shadow-[0_0_60px_rgba(124,58,237,0.12),0_40px_80px_-20px_rgba(0,0,0,0.7)] relative">
        {/* Top accent line */}
        <div className="absolute top-[-1px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet to-transparent" />

        <h2 className="font-display text-[1.15rem] font-extrabold text-fg mb-1">
          New Project
        </h2>
        <p className="font-mono text-[0.62rem] text-fg-muted tracking-[0.12em] uppercase mb-5">
          Create a new CAD project
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="font-mono text-[0.62rem] text-fg-sub tracking-[0.1em] uppercase block mb-1.5">
              Project Name
            </span>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. CNC Bracket Assembly"
              disabled={creating}
              className="w-full bg-surface border border-border-mid rounded-sm px-3.5 py-2.5 font-mono text-[0.82rem] text-fg placeholder:text-fg-muted outline-none transition-all duration-base focus:border-violet focus:shadow-[0_0_0_3px_var(--color-violet-glow)] disabled:opacity-50"
            />
          </label>

          {error && (
            <p className="font-mono text-[0.65rem] text-error mb-3 -mt-1">{error}</p>
          )}

          <div className="flex gap-2.5 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={creating}
              className="font-mono text-[0.72rem] font-medium text-fg-sub bg-transparent border border-border rounded-sm px-4 py-2 cursor-pointer transition-all duration-snap hover:border-border-mid hover:text-fg disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || !name.trim()}
              className="font-display text-[0.82rem] font-bold text-white bg-gradient-to-r from-violet to-[#6d28d9] border-none rounded-sm px-5 py-2 cursor-pointer transition-all duration-snap shadow-[0_4px_16px_var(--color-violet-glow)] hover:shadow-[0_6px_24px_var(--color-violet-glow)] hover:-translate-y-px active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 flex items-center gap-2"
            >
              {creating && (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[rgba(255,255,255,0.3)] border-t-white animate-spin" />
              )}
              {creating ? "Creating…" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/appwrite";
import { getProjects, createProject } from "@/lib/db";
import type { Project } from "@/lib/db";
import ProjectList from "@/components/dashboard/ProjectList";
import CreateProjectModal from "@/components/dashboard/CreateProjectModal";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProjects = useCallback(async () => {
    if (!user?.$id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects(user.$id);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [user?.$id]);

  useEffect(() => {
    const load = async () => {
      await fetchProjects();
    };
    load();
  }, [fetchProjects]);

  const handleCreate = async (name: string) => {
    if (!user) return;
    await createProject(user.$id, name);
    await fetchProjects();
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <main className="min-h-[100dvh] bg-void relative z-[1]">
      <div className="background-glow absolute inset-0 pointer-events-none z-[-1] overflow-hidden" />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-[rgba(13,13,26,0.8)] backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display text-[1.1rem] font-extrabold text-fg hover:text-violet transition-colors duration-base">
            3D Model<span className="bg-gradient-to-br from-violet via-[#a78bfa] to-lime bg-clip-text text-transparent">Viewer</span>
          </Link>
          <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-fg-muted bg-surface border border-border rounded-xs px-2 py-[2px]">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.65rem] text-fg-sub truncate max-w-[150px]">
            {user?.name || user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="font-mono text-[0.58rem] text-fg-muted hover:text-red-400 transition-colors uppercase tracking-wider"
            title="Sign out"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-[1.5rem] font-extrabold text-fg">
              Projects
            </h1>
            <p className="font-mono text-[0.68rem] text-fg-muted mt-1 tracking-wide">
              {projects.length > 0
                ? `${projects.length} project${projects.length !== 1 ? "s" : ""}`
                : "Manage your CAD projects"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/viewer"
              className="flex items-center gap-2 bg-surface text-fg-sub border border-border px-4 py-2.5 rounded-sm font-display font-bold text-[0.82rem] cursor-pointer transition-all duration-snap ease-expo hover:text-fg hover:border-border-strong hover:bg-violet-dim no-underline active:scale-[0.97]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
              Quick Analysis
            </Link>
            
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-violet to-[#6d28d9] text-white border-none px-4 py-2.5 rounded-sm font-display font-bold text-[0.82rem] cursor-pointer transition-all duration-snap ease-expo hover:-translate-y-0.5 hover:shadow-[0_8px_24px_var(--color-violet-glow)] active:scale-[0.97]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Project
            </button>
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-3 rounded-full border-[3px] border-[rgba(124,58,237,0.2)] border-t-violet animate-spin" />
              <p className="font-mono text-[0.7rem] text-fg-sub">Loading projects…</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-sm bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.25)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-error">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <p className="font-mono text-[0.75rem] text-error">{error}</p>
            <button
              onClick={() => fetchProjects()}
              className="font-mono text-[0.65rem] text-fg-sub hover:text-violet transition-colors tracking-wider uppercase cursor-pointer bg-transparent border border-border rounded-xs px-3 py-1.5"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-md bg-violet-dim border border-border-mid flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet opacity-70">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-display text-[0.95rem] font-bold text-fg mb-1">No projects yet</p>
              <p className="font-mono text-[0.65rem] text-fg-muted tracking-wide">
                Create your first project to get started
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="font-mono text-[0.65rem] text-violet hover:text-fg transition-colors tracking-wider uppercase cursor-pointer bg-violet-dim border border-border-mid rounded-xs px-4 py-2 hover:border-violet"
            >
              + Create Project
            </button>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <ProjectList projects={projects} />
        )}
      </div>

      <CreateProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </main>
  );
}

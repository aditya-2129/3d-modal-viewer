"use client";

import Link from "next/link";
import type { Project } from "@/lib/db";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid gap-3">
      {projects.map((project) => (
        <Link
          key={project.$id}
          href={`/project/${project.$id}`}
          className="group flex items-center gap-4 bg-card border border-border rounded-md px-5 py-4 no-underline transition-all duration-base ease-expo hover:border-border-mid hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(124,58,237,0.1)]"
        >
          <div className="w-10 h-10 rounded-sm bg-violet-dim border border-border-mid flex items-center justify-center shrink-0 transition-all duration-base group-hover:border-violet group-hover:shadow-[0_0_12px_var(--color-violet-glow)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet opacity-80">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-display text-[0.88rem] font-bold text-fg truncate group-hover:text-violet transition-colors duration-base">
              {project.name}
            </p>
            <p className="font-mono text-[0.6rem] text-fg-muted tracking-[0.08em] mt-0.5">
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fg-muted shrink-0 transition-all duration-base group-hover:text-violet group-hover:translate-x-1">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      ))}
    </div>
  );
}

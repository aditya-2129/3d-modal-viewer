"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProject } from "@/lib/db";
import AnalysisWorkspace from "@/components/AnalysisWorkspace";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<{ name: string; analysisId?: string } | null>(null);

  useEffect(() => {
    if (params.id) {
      void Promise.resolve().then(() => setProject(null));
      getProject(params.id)
        .then(setProject)
        .catch(() => {}); // Fallback to truncated ID already in state
    }
  }, [params.id]);

  const projectName = project?.name ?? `Project ${params.id.slice(0, 8)}`;

  return <AnalysisWorkspace projectId={params.id} projectName={projectName} analysisId={project?.analysisId} />;
}

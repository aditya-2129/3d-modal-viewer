"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProject } from "@/lib/db";
import AnalysisWorkspace from "@/components/AnalysisWorkspace";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<{ name: string; analysisId?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (params.id) {
      setIsLoading(true);
      setProject(null);
      getProject(params.id)
        .then((p) => {
          if (active) {
            setProject(p);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (active) setIsLoading(false);
        });
    }
    return () => {
      active = false;
    };
  }, [params.id]);

  const projectName = project?.name ?? `Project ${params.id.slice(0, 8)}`;

  return <AnalysisWorkspace projectId={params.id} projectName={projectName} analysisId={project?.analysisId} isLoadingProject={isLoading} />;
}

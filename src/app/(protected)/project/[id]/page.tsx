"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProject } from "@/lib/db";
import AnalysisWorkspace from "@/components/AnalysisWorkspace";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const [projectName, setProjectName] = useState<string>(`Project ${params.id.slice(0, 8)}`);

  useEffect(() => {
    if (params.id) {
      getProject(params.id)
        .then(project => setProjectName(project.name))
        .catch(() => {}); // Fallback to truncated ID already in state
    }
  }, [params.id]);

  return <AnalysisWorkspace projectId={params.id} projectName={projectName} />;
}

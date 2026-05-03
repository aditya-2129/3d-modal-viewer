"use client";

import { useParams } from "next/navigation";
import AnalysisWorkspace from "@/components/AnalysisWorkspace";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();

  return <AnalysisWorkspace projectId={params.id} projectName={`Project ${params.id.slice(0, 8)}`} />;
}

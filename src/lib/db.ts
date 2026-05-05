import { ID, Permission, Role, Query } from "appwrite";
import { databases } from "./appwrite";
import { DATABASE_ID, PROJECTS_COLLECTION_ID, ANALYSIS_COLLECTION_ID } from "./constants";

export interface Project {
  $id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  analysisId?: string;
}

/**
 * Fetch a specific analysis by its ID.
 */
export async function getAnalysis(analysisId: string) {
  const doc = await databases.getDocument(DATABASE_ID, ANALYSIS_COLLECTION_ID, analysisId);
  return {
    parts: JSON.parse(doc.parts_data as string),
    mapping: JSON.parse(doc.mapping as string),
    meshFileUrl: doc.glb_url as string,
  };
}

export async function getProjects(userId: string): Promise<Project[]> {
  const response = await databases.listDocuments(
    DATABASE_ID,
    PROJECTS_COLLECTION_ID,
    [
      Query.equal("userId", userId),
      Query.orderDesc("createdAt")
    ]
  );
  return response.documents as unknown as Project[];
}

export async function getProject(projectId: string): Promise<Project> {
  const response = await databases.getDocument(
    DATABASE_ID,
    PROJECTS_COLLECTION_ID,
    projectId
  );
  return response as unknown as Project;
}

/**
 * Create a new project owned by the given user.
 * Sets document-level permissions so only this user can access it.
 */
export async function createProject(
  userId: string,
  name: string
): Promise<Project> {
  const now = new Date().toISOString();
  const doc = await databases.createDocument(
    DATABASE_ID,
    PROJECTS_COLLECTION_ID,
    ID.unique(),
    {
      name,
      userId,
      createdAt: now,
      updatedAt: now,
    },
    [
      Permission.read(Role.user(userId)),
      Permission.write(Role.user(userId)),
    ]
  );
  return doc as unknown as Project;
}

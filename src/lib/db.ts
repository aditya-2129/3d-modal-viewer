import { ID, Permission, Role, Query } from "appwrite";
import { databases } from "./appwrite";
import { DATABASE_ID, PROJECTS_COLLECTION_ID } from "./constants";

export interface Project {
  $id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch all projects for the current user.
 * Document-level permissions ensure only the user's own projects are returned.
 */
export async function getProjects(): Promise<Project[]> {
  const response = await databases.listDocuments(
    DATABASE_ID,
    PROJECTS_COLLECTION_ID,
    [Query.orderDesc("createdAt")]
  );
  return response.documents as unknown as Project[];
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

import { cookies, headers } from "next/headers";
import { Client, Account, Models } from "node-appwrite";

export async function getSessionUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
    
    // Appwrite session cookie name is typically a_session_<project_id_lowercase>
    const sessionCookieName = `a_session_${projectId.toLowerCase()}`;
    const cookieStore = await cookies();
    
    const session = cookieStore.get(sessionCookieName);
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId);

    // Fallback: Check for JWT in headers
    const authHeader = (await headers()).get("Authorization");
    const appwriteJwt = (await headers()).get("X-Appwrite-JWT");
    
    if (appwriteJwt) {
      client.setJWT(appwriteJwt);
    } else if (authHeader?.startsWith("Bearer ")) {
      const jwt = authHeader.split(" ")[1];
      client.setJWT(jwt);
    } else if (session?.value) {
      client.setSession(session.value);
    } else {
      return null;
    }

    const account = new Account(client);
    return await account.get();
  } catch (error) {
    console.error("[auth-server] Session verification failed:", error);
    return null;
  }
}

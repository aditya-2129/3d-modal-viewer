import { Client, Account, Databases, OAuthProvider } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);

/** Redirect to Google OAuth */
function loginWithGoogle() {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: window.location.origin,
    failure: window.location.origin,
  });
}

/** Get current logged-in user (or null) */
async function getUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

/** Delete current session */
async function logout() {
  await account.deleteSession("current");
}

export { client, account, databases, loginWithGoogle, getUser, logout };

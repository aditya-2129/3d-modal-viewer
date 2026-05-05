"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginWithGoogle } from "@/lib/appwrite";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[100dvh] bg-void">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full border-[3px] border-[rgba(124,58,237,0.2)] border-t-violet animate-spin" />
          <p className="font-mono text-[0.75rem] text-fg-sub">Checking session…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-container flex-1 flex flex-col items-center justify-center p-8 relative z-[1] min-h-[100dvh] max-md:p-[1.25rem_1rem]">
      <div className="background-glow absolute inset-0 pointer-events-none z-[-1] overflow-hidden" />
      <div className="upload-card" style={{ maxWidth: 420 }}>
        <header className="header flex flex-col items-center">
          <h1 className="font-display text-[1.9rem] font-extrabold text-center leading-tight mb-2 text-fg">
            3D Model{" "}
            <span className="bg-gradient-to-br from-violet via-[#a78bfa] to-lime bg-clip-text text-transparent">Viewer</span>
          </h1>
          <p>Sign in to access your 3D model projects</p>
        </header>

        <button
          className="btn-upload flex items-center justify-center gap-3"
          onClick={loginWithGoogle}
          style={{ marginTop: "1.5rem" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="upload-footer">3D Model Viewer · v2 · Secure Login</p>
      </div>
    </main>
  );
}

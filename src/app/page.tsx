"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect based on auth state
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [loading, user, router]);

  return (
    <main className="flex-1 flex items-center justify-center min-h-[100dvh] bg-void">
      <div className="text-center">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full border-[3px] border-[rgba(124,58,237,0.2)] border-t-violet animate-spin" />
        <p className="font-mono text-[0.75rem] text-fg-sub">
          {loading ? "Checking session…" : "Redirecting…"}
        </p>
      </div>
    </main>
  );
}

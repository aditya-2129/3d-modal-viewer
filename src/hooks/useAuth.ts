"use client";

import { useState, useEffect } from "react";
import { getUser } from "@/lib/appwrite";
import type { Models } from "appwrite";

interface AuthState {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}

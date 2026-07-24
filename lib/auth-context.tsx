"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface AgentProfile {
  type: "agent";
  id: string;
  name: string;
  email: string;
  phone: string | null;
  is_admin: boolean;
}

export interface UserProfile {
  type: "user";
  id: string;
  name: string;
  email: string;
}

export type AuthProfile = AgentProfile | UserProfile;

interface AuthState {
  token: string;
  profile: AuthProfile;
}

interface AuthContextValue {
  auth: AuthState | null;
  isLoading: boolean;
  login: (token: string, profile: AuthProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "estatly_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAuth(JSON.parse(raw));
    } catch {
      // corrupted storage — ignore, treat as logged out
    } finally {
      setIsLoading(false);
    }
  }, []);

  function login(token: string, profile: AuthProfile) {
    const next = { token, profile };
    setAuth(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function logout() {
    setAuth(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ auth, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function RequireAgent({ children }: { children: React.ReactNode }) {
  const { auth, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && auth?.profile.type !== "agent") {
      router.push("/login");
    }
  }, [isLoading, auth, router]);

  if (isLoading || auth?.profile.type !== "agent") {
    return (
      <div className="py-24 text-center text-[var(--text-secondary)] text-sm">
        Checking your session...
      </div>
    );
  }

  return <>{children}</>;
}
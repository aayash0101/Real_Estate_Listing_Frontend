"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Nav() {
  const { auth, logout } = useAuth();

  return (
    <nav className="flex items-center gap-6">
      <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
        Buy
      </Link>
      <Link href="/rent" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
        Rent
      </Link>
      <Link href="/agents" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
        Agents
      </Link>

      {auth?.profile.type === "agent" && (
        <Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
          My Listings
        </Link>
      )}

      {auth ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/60">{auth.profile.name}</span>
          <button
            onClick={logout}
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Log in
          </Link>
          <Link
            href="/register"
            style={{ backgroundColor: "var(--amber)", color: "var(--navy)" }}
            className="text-sm font-semibold px-4 py-2 rounded-lg"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
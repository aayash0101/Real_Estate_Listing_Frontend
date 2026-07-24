"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { loginAgent, loginUser } from "@/lib/api";

type Role = "user" | "agent";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<Role>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (role === "agent") {
        const { agent, token } = await loginAgent(email, password);
        login(token, { type: "agent", ...agent });
        router.push("/dashboard");
      } else {
        const { user, token } = await loginUser(email, password);
        login(token, { type: "user", ...user });
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="max-w-md mx-auto py-12">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text-primary)] mb-6 text-center">
        Log In
      </h1>

      <div className="flex rounded-lg border border-[var(--border)] p-1 mb-6 bg-[var(--card)]">
        <button
          type="button"
          onClick={() => setRole("user")}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            role === "user" ? "bg-[var(--navy)] text-white" : "text-[var(--text-secondary)]"
          }`}
        >
          Buyer
        </button>
        <button
          type="button"
          onClick={() => setRole("agent")}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            role === "agent" ? "bg-[var(--navy)] text-white" : "text-[var(--text-secondary)]"
          }`}
        >
          Agent
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-[var(--card)] border border-[var(--border)] rounded-lg p-6"
      >
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ backgroundColor: "var(--amber)", color: "var(--navy)" }}
          className="w-full py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>

        <p className="text-sm text-[var(--text-secondary)] text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[var(--navy)] font-medium underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
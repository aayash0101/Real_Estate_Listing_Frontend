"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { registerAgent, registerUser } from "@/lib/api";

type Role = "user" | "agent";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<Role>("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (role === "agent") {
        const { agent, token } = await registerAgent(name, email, phone, password);
        login(token, { type: "agent", ...agent });
        router.push("/dashboard");
      } else {
        const { user, token } = await registerUser(name, email, password);
        login(token, { type: "user", ...user });
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="max-w-md mx-auto py-12">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text-primary)] mb-6 text-center">
        Create an Account
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
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
          />
        </div>
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

        {role === "agent" && (
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Password</label>
          <input
            type="password"
            required
            minLength={8}
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
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-[var(--text-secondary)] text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--navy)] font-medium underline">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
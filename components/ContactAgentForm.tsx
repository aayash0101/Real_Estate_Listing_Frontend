"use client";

import { useState, FormEvent } from "react";
import { submitInquiry } from "@/lib/api";

interface ContactAgentFormProps {
  listingId: string;
}

export default function ContactAgentForm({ listingId }: ContactAgentFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await submitInquiry(listingId, { name, email, phone: phone || undefined, message });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send inquiry");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--amber)", color: "var(--navy)" }}
      >
        Contact Agent
      </button>
    );
  }

  if (sent) {
    return (
      <p className="text-sm font-medium" style={{ color: "var(--navy)" }}>
        Message sent — the agent will be in touch soon.
      </p>
    );
  }

  const inputClass = "w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-sm">
      <input
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClass}
      />
      <textarea
        placeholder="Message"
        required
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={inputClass}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60"
          style={{ backgroundColor: "var(--amber)", color: "var(--navy)" }}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 rounded-xl text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
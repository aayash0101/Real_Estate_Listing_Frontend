"use client";

import { useRouter } from "next/navigation";
import RequireAgent from "@/components/RequireAgent";
import ListingForm from "@/components/ListingForm";
import { useAuth } from "@/lib/auth-context";
import { createListing, ListingInput } from "@/lib/api";

function NewListingContent() {
  const { auth } = useAuth();
  const router = useRouter();

  async function handleSubmit(input: ListingInput) {
    if (!auth) return;
    await createListing(auth.token, input);
    router.push("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text-primary)] mb-6">
        Add a Listing
      </h1>
      <ListingForm onSubmit={handleSubmit} submitLabel="Create Listing" />
    </div>
  );
}

export default function NewListingPage() {
  return (
    <RequireAgent>
      <NewListingContent />
    </RequireAgent>
  );
}
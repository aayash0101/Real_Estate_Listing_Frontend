"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RequireAgent from "@/components/RequireAgent";
import ListingForm from "@/components/ListingForm";
import { useAuth } from "@/lib/auth-context";
import { getListingById, updateListing, ListingInput, Property } from "@/lib/api";

interface PageProps {
    params: Promise<{ id: string }>;
}

function EditListingContent({ id }: { id: string }) {
    const { auth } = useAuth();
    const router = useRouter();
    const [listing, setListing] = useState<Property | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!auth) return;
        getListingById(id, auth.profile.type === "agent" ? auth.profile.id : undefined)
            .then(setListing)
            .catch((err) => setError(err instanceof Error ? err.message : "Failed to load listing"))
            .finally(() => setIsLoading(false));
    }, [id, auth]);

    async function handleSubmit(input: ListingInput) {
        if (!auth) return;
        await updateListing(auth.token, id, input);
        router.push("/dashboard");
    }

    if (isLoading) return <p className="text-[var(--text-secondary)] text-sm">Loading listing...</p>;
    if (error) return <p className="text-sm text-red-600">{error}</p>;
    if (!listing) return <p className="text-sm text-red-600">Listing not found.</p>;

    const isAdmin = auth?.profile.type === "agent" && auth.profile.is_admin;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text-primary)] mb-6">
                Edit Listing
            </h1>
            <ListingForm
                initialValues={{ ...listing, land_size: listing.land_size ?? undefined }}
                onSubmit={handleSubmit}
                submitLabel="Save Changes"
                isAdmin={isAdmin}
                listingId={listing.id}
                initialImages={listing.images}
            />
        </div>
    );
}

export default function EditListingPage({ params }: PageProps) {
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        params.then((p) => setId(p.id));
    }, [params]);

    if (!id) return null;

    return (
        <RequireAgent>
            <EditListingContent id={id} />
        </RequireAgent>
    );
}
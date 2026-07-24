import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAgentById } from '@/lib/api';
import { formatPrice, formatPropertyType } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const agent = await getAgentById(id);

  if (!agent) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text-primary)]">
        {agent.name}
      </h1>
      <p className="text-[var(--text-secondary)] mt-1">{agent.email} · {agent.phone}</p>

      <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text-primary)] mt-10 mb-4">
        Listings ({agent.properties.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {agent.properties.map((p) => (
          <Link
            key={p.id}
            href={`/listings/${p.id}`}
            className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 hover:shadow-md transition-shadow"
          >
            <p className="font-medium text-[var(--text-primary)]">{p.title}</p>
            <p className="text-sm text-[var(--text-secondary)]">
              {p.suburb} · {formatPropertyType(p.property_type)}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {p.bedrooms} bed · {p.bathrooms} bath
            </p>
            <p className="mt-1 font-medium text-[var(--amber)]">{formatPrice(p.price)}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
import Link from 'next/link';
import { getAgents } from '@/lib/api';

export const metadata = {
  title: 'Agents | Estatly',
};

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text-primary)] mb-8">
        Our Agents
      </h1>

      {agents.length === 0 ? (
        <p className="text-[var(--text-secondary)]">No agents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--text-primary)]">
                {agent.name}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{agent.email}</p>
              <p className="text-sm text-[var(--text-secondary)]">{agent.phone}</p>
              <p className="mt-3 text-sm font-medium text-[var(--amber)]">
                {agent.listing_count} listing{agent.listing_count === 1 ? '' : 's'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
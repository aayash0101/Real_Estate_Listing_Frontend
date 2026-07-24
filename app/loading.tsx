export default function Loading() {
  return (
    <div className="flex gap-8 items-start">
      <aside className="w-72 shrink-0">
        <div className="rounded-2xl overflow-hidden animate-pulse" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="h-4 rounded w-16" style={{ backgroundColor: "var(--bg)" }} />
          </div>
          <div className="p-5 space-y-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 rounded w-20" style={{ backgroundColor: "var(--bg)" }} />
                <div className="h-10 rounded-lg w-full" style={{ backgroundColor: "var(--bg)" }} />
              </div>
            ))}
            <div className="h-12 rounded-xl w-full" style={{ backgroundColor: "var(--bg)" }} />
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-6 space-y-2">
          <div className="h-3 rounded w-16 animate-pulse" style={{ backgroundColor: "var(--border)" }} />
          <div className="h-8 rounded w-56 animate-pulse" style={{ backgroundColor: "var(--border)" }} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden flex animate-pulse" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="w-1 shrink-0" style={{ backgroundColor: "var(--amber)", opacity: 0.3 }} />
              <div className="flex-1 p-5 space-y-3">
                <div className="flex justify-between">
                  <div className="h-6 rounded-full w-20" style={{ backgroundColor: "var(--bg)" }} />
                  <div className="h-6 rounded w-28" style={{ backgroundColor: "var(--bg)" }} />
                </div>
                <div className="h-4 rounded w-full" style={{ backgroundColor: "var(--bg)" }} />
                <div className="h-3 rounded w-2/3" style={{ backgroundColor: "var(--bg)" }} />
                <div className="flex gap-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <div className="h-4 rounded w-10" style={{ backgroundColor: "var(--bg)" }} />
                  <div className="h-4 rounded w-10" style={{ backgroundColor: "var(--bg)" }} />
                  <div className="h-4 rounded w-10" style={{ backgroundColor: "var(--bg)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
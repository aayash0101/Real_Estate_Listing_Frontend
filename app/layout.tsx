import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Estatly - Property Listings",
  description: "Find your next property with Estatly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header style={{ backgroundColor: "var(--navy)" }} className="sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold text-white tracking-tight">
                  Estat<span style={{ color: "var(--amber)" }}>ly</span>
                </span>
              </a>
              <Nav />
            </div>
          </header>

          <div style={{ backgroundColor: "var(--navy-light)" }} className="border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <h1 className="font-display text-3xl font-bold text-white">
                Find Your Next Home
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Browsing properties across Queensland
              </p>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>

          <footer style={{ backgroundColor: "var(--navy)" }} className="mt-20">
            <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
              <span className="font-display text-white font-bold">
                Estat<span style={{ color: "var(--amber)" }}>ly</span>
              </span>
              <p className="text-white/40 text-xs">
                © 2025 Estatly. Built as a portfolio project.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
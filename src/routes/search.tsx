import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import { z } from "zod";
import { ArrowLeft, MapPin, Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { BUSINESSES, SEARCH_PLACEHOLDERS } from "@/lib/mock-data";
import { BusinessCard } from "@/components/woot/BusinessCard";
import { RotatingPlaceholder } from "@/components/woot/RotatingPlaceholder";
import { PageTransition } from "@/components/woot/PageTransition";
import { CountryIcon } from "@/components/woot/CountryIcon";
import { useUserCountry } from "@/lib/countries";
import { Sidebar } from "@/components/woot/Sidebar";

const search = z.object({ q: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — Woot" }, { name: "description", content: "Find verified businesses near you." }] }),
  validateSearch: search,
  component: SearchPage,
});

type Scope = "nearby" | "country" | "global";

/**
 * Cleaner, more modern "worldwide" glyph than lucide's default Globe icon —
 * simplified latitude/longitude grid on a circle, tuned to sit well at
 * small sizes next to the other scope icons.
 */
function GlobalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18M4.5 7.5h15M4.5 16.5h15" />
    </svg>
  );
}

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const [scope, setScope] = useState<Scope>("nearby");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { country } = useUserCountry();

  const results = useMemo(() => {
    // "nearby" narrows to the closest businesses; "country" widens to
    // everything within the user's detected country; "global" is unfiltered.
    const base =
      scope === "nearby" ? BUSINESSES.slice(0, 12) : scope === "country" ? BUSINESSES : BUSINESSES;
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter((b) =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.location.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    );
  }, [query, scope]);

  const scopes: { k: Scope; label: string; icon: ReactNode }[] = [
    { k: "nearby", label: "Nearby", icon: <MapPin size={14} /> },
    { k: "country", label: country.name, icon: <CountryIcon country={country} size={14} /> },
    { k: "global", label: "Global", icon: <GlobalIcon size={14} /> },
  ];

  const scopeResultsLabel = scope === "nearby" ? "nearby" : scope === "country" ? country.name : "global";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background lg:pl-20">
        <Sidebar base="customer" />
        <div className="mx-auto max-w-3xl lg:max-w-2xl">
        <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-3 lg:grid-cols-1 lg:px-0 lg:pt-4">
            <button onClick={() => navigate({ to: "/" })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent lg:hidden">
              <ArrowLeft size={18} />
            </button>
            <div className="relative flex items-center rounded-full border bg-card px-3 shadow-soft">
              <SearchIcon size={16} className="text-muted-foreground" />
              <div className="relative ml-2 flex-1">
                {!query && <RotatingPlaceholder items={SEARCH_PLACEHOLDERS} />}
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-11 w-full bg-transparent text-[15px] outline-none"
                  aria-label="Search"
                />
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-accent">
                <SlidersHorizontal size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 px-4 pb-3 lg:px-0">
            {scopes.map((s) => {
              const active = scope === s.k;
              return (
                <button key={s.k} onClick={() => setScope(s.k)}
                  className="relative flex items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-semibold"
                  style={{ color: active ? "white" : "var(--muted-foreground)" }}>
                  {active && <motion.span layoutId="scope-pill" className="absolute inset-0 rounded-full bg-primary shadow-soft" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative inline-flex items-center gap-1.5">{s.icon} {s.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="px-4 py-4 lg:px-0">
          <div className="mb-3 flex items-baseline justify-between">
            <p className="text-sm text-muted-foreground">
              {results.length} {scopeResultsLabel} results {query ? `for "${query}"` : ""}
            </p>
          </div>
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {results.map((b) => (
                <motion.div key={b.id} layout onClick={() => setExpanded((v) => (v === b.id ? null : b.id))} className="cursor-pointer">
                  <BusinessCard b={b} expanded={expanded === b.id} />
                </motion.div>
              ))}
            </AnimatePresence>
            {results.length === 0 && (
              <div className="rounded-3xl border bg-card p-10 text-center text-muted-foreground shadow-soft">
                No businesses match "{query}". Try another term.
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </PageTransition>
  );
}

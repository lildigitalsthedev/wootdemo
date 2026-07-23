import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { z } from "zod";
import { ArrowLeft, MapPin, Search as SearchIcon, SlidersHorizontal, Star } from "lucide-react";
import { BUSINESSES, SEARCH_PLACEHOLDERS, type Business } from "@/lib/mock-data";
import { BusinessCard } from "@/components/woot/BusinessCard";
import { BusinessAvatar } from "@/components/woot/BusinessAvatar";
import { VerifiedBadge } from "@/components/woot/Logo";
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

function ResultRow({ b, active, onClick }: { b: Business; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-2.5 py-2.5 text-left transition-colors"
      style={{
        background: active ? "color-mix(in oklab, var(--primary) 14%, transparent)" : "transparent",
      }}
    >
      <BusinessAvatar b={b} size={40} />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[13px] font-semibold" style={{ color: active ? "var(--primary)" : undefined }}>{b.name}</span>
          {b.verified && <VerifiedBadge />}
        </div>
        <div className="truncate text-[11px] text-muted-foreground">{b.category} · {b.location}</div>
      </div>
      <div className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-muted-foreground">
        <Star size={10} fill="currentColor" className="text-amber-500" /> {b.rating.toFixed(1)}
      </div>
    </button>
  );
}

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const [scope, setScope] = useState<Scope>("nearby");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
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

  // Keep the desktop detail pane pointed at a result that's actually visible;
  // default to the first one whenever the list changes underneath it.
  useEffect(() => {
    if (!results.some((b) => b.id === selected)) {
      setSelected(results[0]?.id ?? null);
    }
  }, [results, selected]);

  const selectedBusiness = results.find((b) => b.id === selected) ?? null;

  const scopes: { k: Scope; label: string; icon: ReactNode }[] = [
    { k: "nearby", label: "Nearby", icon: <MapPin size={14} /> },
    { k: "country", label: country.name, icon: <CountryIcon country={country} size={14} /> },
    { k: "global", label: "Global", icon: <GlobalIcon size={14} /> },
  ];

  const scopeResultsLabel = scope === "nearby" ? "nearby" : scope === "country" ? country.name : "global";

  const searchHeader = (
    <>
      <div className="relative flex items-center rounded-full border bg-card px-3 shadow-soft">
        <SearchIcon size={16} className="text-muted-foreground" />
        <div className="relative ml-2 flex-1">
          {!query && <RotatingPlaceholder items={SEARCH_PLACEHOLDERS} />}
          <input
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
      <div className="mt-3 grid grid-cols-3 gap-1">
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
    </>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden lg:pl-20">
        <Sidebar base="customer" />

        {/* Mobile / tablet: single stacked column, results expand in place */}
        <div className="mx-auto max-w-3xl lg:hidden">
          <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-3">
              <button onClick={() => navigate({ to: "/" })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
                <ArrowLeft size={18} />
              </button>
              <div className="flex-1">{searchHeader}</div>
            </div>
          </header>

          <div className="px-4 py-4">
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

        {/* Desktop / tablet master-detail: results list + selected business detail */}
        <div className="hidden min-h-0 flex-1 lg:flex">
          <aside className="flex w-80 shrink-0 flex-col border-r bg-background">
            <div className="border-b p-4">{searchHeader}</div>
            <div className="flex items-center justify-between px-4 pt-3">
              <p className="text-xs text-muted-foreground">
                {results.length} {scopeResultsLabel} results {query ? `for "${query}"` : ""}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {results.map((b) => (
                <ResultRow key={b.id} b={b} active={selected === b.id} onClick={() => setSelected(b.id)} />
              ))}
              {results.length === 0 && (
                <div className="p-6 text-center text-sm text-muted-foreground">No businesses match "{query}".</div>
              )}
            </div>
          </aside>
          <section className="min-w-0 flex-1 overflow-y-auto">
            {selectedBusiness ? (
              <div className="mx-auto max-w-xl p-6">
                <AnimatePresence mode="wait">
                  <motion.div key={selectedBusiness.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                    <BusinessCard b={selectedBusiness} expanded />
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="grid h-full place-items-center p-10 text-center text-sm text-muted-foreground">
                Select a business to see its details.
              </div>
            )}
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

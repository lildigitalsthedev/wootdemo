import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Globe, Lock, MapPin, Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { BUSINESSES, SEARCH_PLACEHOLDERS } from "@/lib/mock-data";
import { BusinessCard } from "@/components/woot/BusinessCard";
import { RotatingPlaceholder } from "@/components/woot/RotatingPlaceholder";
import { PageTransition } from "@/components/woot/PageTransition";

const search = z.object({ q: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — Woot" }, { name: "description", content: "Find verified businesses near you." }] }),
  validateSearch: search,
  component: SearchPage,
});

type Scope = "global" | "private" | "nearby";

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const [scope, setScope] = useState<Scope>("nearby");
  const [expanded, setExpanded] = useState<string | null>(null);

  const results = useMemo(() => {
    const base = scope === "private" ? BUSINESSES.slice(0, 5) : scope === "nearby" ? BUSINESSES.slice(0, 12) : BUSINESSES;
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter((b) =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.location.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    );
  }, [query, scope]);

  const scopes: { k: Scope; label: string; icon: typeof Globe }[] = [
    { k: "global", label: "Global", icon: Globe },
    { k: "private", label: "Private", icon: Lock },
    { k: "nearby", label: "Nearby", icon: MapPin },
  ];

  return (
    <PageTransition>
      <div className="mx-auto min-h-screen max-w-3xl bg-background">
        <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-3">
            <button onClick={() => navigate({ to: "/" })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
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
          <div className="grid grid-cols-3 gap-1 px-4 pb-3">
            {scopes.map((s) => {
              const Icon = s.icon;
              const active = scope === s.k;
              return (
                <button key={s.k} onClick={() => setScope(s.k)}
                  className="relative flex items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-semibold"
                  style={{ color: active ? "white" : "var(--muted-foreground)" }}>
                  {active && <motion.span layoutId="scope-pill" className="absolute inset-0 rounded-full bg-primary shadow-soft" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative inline-flex items-center gap-1.5"><Icon size={14} /> {s.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="px-4 py-4">
          <div className="mb-3 flex items-baseline justify-between">
            <p className="text-sm text-muted-foreground">
              {results.length} {scope === "nearby" ? "nearby" : scope} results {query ? `for "${query}"` : ""}
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
    </PageTransition>
  );
}
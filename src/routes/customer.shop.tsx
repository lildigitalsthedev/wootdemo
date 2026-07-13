import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
import { AppShell } from "@/components/woot/AppShell";
import { PageTransition } from "@/components/woot/PageTransition";
import { BUSINESSES, PRODUCTS, findBusiness } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/shop")({
  head: () => ({ meta: [{ title: "Shop — Woot" }] }),
  component: CustomerShop,
});

function CustomerShop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(BUSINESSES.map((b) => b.category)))], []);
  const items = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const b = findBusiness(p.businessId)!;
      if (cat !== "All" && b.category !== cat) return false;
      if (q && !`${p.name} ${b.name}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    }).slice(0, 60);
  }, [q, cat]);

  return (
    <AppShell title="Shop" base="customer">
      <PageTransition>
        <div className="px-4 pt-2">
          <div className="flex items-center gap-2 rounded-full border bg-card px-3 shadow-soft">
            <Search size={16} className="text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands, shops"
              className="h-11 flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4">
          {cats.map((c) => {
            const active = cat === c;
            return (
              <button key={c} onClick={() => setCat(c)}
                className="shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold"
                style={{ background: active ? "var(--primary)" : "var(--card)", color: active ? "white" : "var(--foreground)", borderColor: active ? "transparent" : "var(--border)" }}>
                {c}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
          {items.map((p) => {
            const b = findBusiness(p.businessId)!;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-3xl border bg-card shadow-soft">
                <Link to="/business/$id" params={{ id: b.id }} className="block">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                    {p.tag && <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">{p.tag}</span>}
                  </div>
                  <div className="p-3">
                    <div className="truncate text-[13px] font-semibold">{p.name}</div>
                    <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{b.name}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[13px] font-bold">${p.price}</span>
                      <span className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground">
                        <Star size={10} className="text-amber-500" fill="currentColor" /> {p.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </PageTransition>
    </AppShell>
  );
}
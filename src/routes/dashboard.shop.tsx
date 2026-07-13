import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BarChart3, Boxes, Layers, Package, Plus, Settings, ShoppingBag, Store, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/woot/AppShell";
import { PageTransition } from "@/components/woot/PageTransition";
import { BUSINESSES, ORDERS, productsFor } from "@/lib/mock-data";

const tabs = [
  { k: "products", label: "Products", icon: Package },
  { k: "store", label: "Store", icon: Store },
  { k: "catalog", label: "Catalog", icon: Layers },
  { k: "analytics", label: "Analytics", icon: BarChart3 },
  { k: "orders", label: "Orders", icon: Boxes },
] as const;
type Tab = typeof tabs[number]["k"];

export const Route = createFileRoute("/dashboard/shop")({
  head: () => ({ meta: [{ title: "Shop — Woot Business" }] }),
  component: ShopEditor,
});

function ShopEditor() {
  const [tab, setTab] = useState<Tab>("products");
  const me = BUSINESSES[1]; // Brew & Bloom demo
  const products = productsFor(me.id);

  return (
    <AppShell title="My Shop" base="dashboard" right={
      <button className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-soft">
        <Plus size={14} /> New
      </button>
    }>
      <PageTransition>
        <div className="px-4 pt-2">
          <div className="rounded-3xl border bg-card p-4 shadow-soft">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <img src={me.cover} className="h-14 w-14 rounded-2xl object-cover" alt="" />
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold">{me.name}</div>
                <div className="text-[12px] text-muted-foreground">{me.location} · {me.category}</div>
              </div>
              <Link to="/business/$id" params={{ id: me.id }} className="rounded-full border px-3 py-1.5 text-xs font-semibold hover:bg-accent">Preview</Link>
            </div>
          </div>
        </div>

        <div className="no-scrollbar sticky top-[64px] z-10 mt-4 flex gap-2 overflow-x-auto border-b bg-background/90 px-4 py-2 backdrop-blur-xl">
          {tabs.map((t) => {
            const active = tab === t.k;
            const Icon = t.icon;
            return (
              <button key={t.k} onClick={() => setTab(t.k)}
                className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold"
                style={{ background: active ? "var(--primary)" : "var(--card)", color: active ? "white" : "var(--foreground)", border: active ? "none" : "1px solid var(--border)" }}>
                <Icon size={13} /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="px-4 py-4">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
              {tab === "products" && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {products.map((p) => (
                    <div key={p.id} className="overflow-hidden rounded-3xl border bg-card shadow-soft">
                      <img src={p.image} className="aspect-square w-full object-cover" alt="" />
                      <div className="p-3">
                        <div className="truncate text-[13px] font-semibold">{p.name}</div>
                        <div className="mt-0.5 flex items-center justify-between text-[12px]">
                          <span className="font-bold">${p.price}</span>
                          <span className="text-muted-foreground">In stock</span>
                        </div>
                        <button className="mt-2 w-full rounded-full border py-1.5 text-[11px] font-semibold hover:bg-accent">Edit</button>
                      </div>
                    </div>
                  ))}
                  <button className="grid aspect-square place-items-center rounded-3xl border-2 border-dashed border-border text-muted-foreground transition hover:border-primary hover:text-primary">
                    <div className="text-center">
                      <Plus className="mx-auto" size={22} />
                      <div className="mt-1 text-xs font-semibold">Add product</div>
                    </div>
                  </button>
                </div>
              )}
              {tab === "store" && (
                <div className="grid gap-3">
                  {[
                    { label: "Store name", value: me.name },
                    { label: "Handle", value: me.handle },
                    { label: "Description", value: me.description },
                    { label: "Location", value: me.location },
                  ].map((f) => (
                    <label key={f.label} className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{f.label}</span>
                      <input defaultValue={f.value} className="h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none focus:border-primary" />
                    </label>
                  ))}
                  <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
                    <div className="flex items-center gap-2 text-sm"><Settings size={16} /> Accept online orders</div>
                    <span className="inline-flex h-6 w-11 items-center rounded-full bg-primary p-0.5"><span className="ml-auto h-5 w-5 rounded-full bg-white shadow-soft" /></span>
                  </div>
                </div>
              )}
              {tab === "catalog" && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {["Bestsellers", "New", "Weekend Specials", "Seasonal"].map((c) => (
                    <div key={c} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border bg-card p-3 shadow-soft">
                      <Layers size={18} className="text-primary" />
                      <div>
                        <div className="text-sm font-semibold">{c}</div>
                        <div className="text-[11px] text-muted-foreground">{Math.floor(Math.random() * 12) + 3} items</div>
                      </div>
                      <button className="rounded-full border px-3 py-1.5 text-xs font-semibold">Edit</button>
                    </div>
                  ))}
                </div>
              )}
              {tab === "analytics" && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { l: "Revenue (7d)", v: "$4,820", d: "+18.4%" },
                    { l: "Orders", v: "132", d: "+12" },
                    { l: "Chat replies", v: "97%", d: "+3%" },
                  ].map((k) => (
                    <div key={k.l} className="rounded-3xl border bg-card p-5 shadow-soft">
                      <div className="text-xs text-muted-foreground">{k.l}</div>
                      <div className="mt-1 text-2xl font-black tracking-tight">{k.v}</div>
                      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                        <TrendingUp size={11} /> {k.d}
                      </div>
                    </div>
                  ))}
                  <div className="sm:col-span-3 rounded-3xl border bg-card p-5 shadow-soft">
                    <div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">Sales this week</span><span className="text-xs text-muted-foreground">Mock data</span></div>
                    <div className="flex h-40 items-end gap-2">
                      {[38, 62, 44, 78, 56, 88, 74].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 0.4 }}
                          className="flex-1 rounded-t-xl" style={{ background: "linear-gradient(180deg, var(--primary), color-mix(in oklab, var(--primary) 30%, transparent))" }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {tab === "orders" && (
                <ul className="divide-y overflow-hidden rounded-3xl border bg-card shadow-soft">
                  {ORDERS.map((o) => (
                    <li key={o.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-primary"><ShoppingBag size={16} /></span>
                      <div className="min-w-0">
                        <div className="truncate text-[14px] font-semibold">{o.id} · {o.customer}</div>
                        <div className="text-[12px] text-muted-foreground">{o.when}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[13px] font-bold">${o.total}</div>
                        <div className={`text-[11px] font-semibold ${o.status === "Fulfilled" ? "text-emerald-600" : o.status === "Refunded" ? "text-red-500" : "text-amber-600"}`}>{o.status}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </PageTransition>
    </AppShell>
  );
}
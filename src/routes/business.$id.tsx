import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, MapPin, MessageCircle, Phone, Search as SearchIcon, ShoppingCart, Star, Filter } from "lucide-react";
import { findBusiness, productsFor } from "@/lib/mock-data";
import { BusinessAvatar } from "@/components/woot/BusinessAvatar";
import { ImageSlideshow } from "@/components/woot/ImageSlideshow";
import { VerifiedBadge } from "@/components/woot/Logo";
import { PageTransition } from "@/components/woot/PageTransition";

export const Route = createFileRoute("/business/$id")({
  loader: ({ params }) => {
    const b = findBusiness(params.id);
    if (!b) throw notFound();
    return { b };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.b.name} — Woot` },
          { name: "description", content: loaderData.b.description },
          { property: "og:title", content: `${loaderData.b.name} on Woot` },
          { property: "og:description", content: loaderData.b.description },
          { property: "og:image", content: loaderData.b.cover },
        ]
      : [{ title: "Business — Woot" }],
  }),
  component: BusinessStore,
});

function BusinessStore() {
  const { b } = Route.useLoaderData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"product" | "service">("product");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const all = productsFor(b.id);
  const items = useMemo(() => all.filter((p) => p.kind === tab && (q ? p.name.toLowerCase().includes(q.toLowerCase()) : true)), [all, tab, q]);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <PageTransition>
      <div className="mx-auto min-h-screen max-w-3xl bg-background pb-24">
        {/* Hero */}
        <div className="relative">
          <ImageSlideshow images={b.images} className="aspect-[16/9]" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <button onClick={() => navigate({ to: "/search" })} className="grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-soft backdrop-blur">
              <ArrowLeft size={18} />
            </button>
            <button className="relative grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-soft backdrop-blur">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Head */}
        <div className="px-4 pt-4">
          <div className="flex items-start gap-3">
            <BusinessAvatar b={b} size={56} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-xl font-black tracking-tight">{b.name}</h1>
                {b.verified && <VerifiedBadge />}
              </div>
              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
                <span>{b.category}</span><span>·</span>
                <span className="inline-flex items-center gap-0.5"><MapPin size={11} />{b.location}</span><span>·</span>
                <span className="inline-flex items-center gap-0.5"><Star size={11} className="text-amber-500" fill="currentColor" />{b.rating} ({b.reviews.toLocaleString()})</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{b.description}</p>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-2">
            <Link to="/chat/$id" params={{ id: b.id }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.01]">
              <MessageCircle size={16} /> Send message
            </Link>
            <Link to="/call/$id" params={{ id: b.id }} className="grid h-11 w-11 place-items-center rounded-full border bg-background hover:bg-accent">
              <Phone size={16} />
            </Link>
            <button className="grid h-11 w-11 place-items-center rounded-full border bg-background hover:bg-accent">
              <Star size={16} />
            </button>
          </div>
        </div>

        {/* Search + toggle */}
        <div className="sticky top-0 z-10 mt-6 border-y bg-background/85 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2 rounded-full border bg-card px-3 shadow-soft">
            <SearchIcon size={16} className="text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${tab === "product" ? "products" : "services"}`}
              className="h-10 flex-1 bg-transparent text-sm outline-none" />
            <button className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-accent">
              <Filter size={14} />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 rounded-full border bg-card p-1 shadow-soft">
            {(["product", "service"] as const).map((k) => {
              const active = tab === k;
              return (
                <button key={k} onClick={() => setTab(k)} className="relative py-2 text-sm font-semibold capitalize"
                  style={{ color: active ? "white" : "var(--muted-foreground)" }}>
                  {active && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-primary shadow-soft" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{k}s</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
          {items.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-3xl border bg-card shadow-soft">
              <div className="relative aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                {p.tag && (
                  <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-soft">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="truncate text-[13px] font-semibold">{p.name}</div>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="text-[13px] font-bold">${p.price}</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground">
                    <Star size={10} className="text-amber-500" fill="currentColor" /> {p.rating.toFixed(1)}
                  </span>
                </div>
                <button
                  onClick={() => setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }))}
                  className="mt-2 w-full rounded-full bg-primary py-1.5 text-[12px] font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">
                  Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {cartCount > 0 && (
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="fixed inset-x-0 bottom-4 z-40 mx-auto max-w-md px-4">
            <button className="flex w-full items-center justify-between gap-3 rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-background shadow-card">
              <span className="inline-flex items-center gap-2"><ShoppingCart size={16} /> {cartCount} in cart</span>
              <span>Checkout →</span>
            </button>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
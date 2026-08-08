import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Search,
  Store,
  Users,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Zap,
  Globe,
  ChevronDown,
  X,
  Star,
  Tag,
  BadgeCheck,
} from "lucide-react";
import { WootLogo, VerifiedBadge } from "@/components/woot/Logo";
import { RotatingPlaceholder } from "@/components/woot/RotatingPlaceholder";
import { BUSINESSES, PRODUCTS, SEARCH_PLACEHOLDERS } from "@/lib/mock-data";
import { BusinessAvatar } from "@/components/woot/BusinessAvatar";
import type { Business, Product } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Index,
});

type AccountType = "business" | "affiliate" | "customer";

type SearchResults = {
  businesses: Business[];
  products: Product[];
  categories: string[];
};

function runSearch(query: string): SearchResults {
  const q = query.toLowerCase().trim();
  if (!q) return { businesses: [], products: [], categories: [] };

  const businesses = BUSINESSES.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.location.toLowerCase().includes(q),
  ).slice(0, 4);

  const products = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.kind.toLowerCase().includes(q),
  ).slice(0, 4);

  const allCategories = Array.from(new Set(BUSINESSES.map((b) => b.category)));
  const categories = allCategories
    .filter((c) => c.toLowerCase().includes(q))
    .slice(0, 3);

  return { businesses, products, categories };
}

function Index() {
  const [type, setType] = useState<AccountType | null>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const previews = useMemo(() => BUSINESSES.slice(0, 6), []);

  const results = useMemo(() => runSearch(query), [query]);
  const hasResults =
    results.businesses.length > 0 ||
    results.products.length > 0 ||
    results.categories.length > 0;
  const isOpen = focused && query.length > 0;

  const clearSearch = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const closeSearch = useCallback(() => {
    setQuery("");
    setFocused(false);
    inputRef.current?.blur();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3">
          <WootLogo />
          <nav className="flex items-center gap-1 text-sm">
            <a href="#about" className="hidden rounded-full px-3 py-2 text-muted-foreground hover:bg-accent sm:inline">About</a>
            <a href="#features" className="hidden rounded-full px-3 py-2 text-muted-foreground hover:bg-accent sm:inline">Features</a>
            <a href="#faq" className="hidden rounded-full px-3 py-2 text-muted-foreground hover:bg-accent sm:inline">FAQ</a>
            <Link to="/search" className="rounded-full border bg-background px-3.5 py-2 text-sm font-medium hover:bg-accent">Explore</Link>
            <Link to="/signup" search={{ type: "customer" }} className="btn-lime px-3.5 py-2 text-sm">Get started</Link>
          </nav>
        </div>
      </header>

      {/* Hero — ambient mesh glow on Rangoon Green canvas */}
      <section className="glode-hero relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="kicker-pill">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              Now live in 24 cities
            </span>
            <h1 className="mt-5 font-display text-[44px] font-black leading-[1.02] tracking-tight text-ivory sm:text-[76px]">
              Search. <span className="text-electric">Chat.</span> Buy.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ivory/60 sm:text-[17px]">
              Glode is the fastest way to discover verified local businesses, message them instantly, and buy in a tap — no algorithm required.
            </p>

            {/* Integrated Search — dual-mode discovery pill bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative mx-auto mt-8 max-w-xl"
            >
              {/* Search bar */}
              <motion.div
                animate={{
                  boxShadow: focused
                    ? "0 0 0 3px color-mix(in oklab, var(--electric-blue) 35%, transparent), 0 20px 60px -12px color-mix(in oklab, var(--electric-blue) 35%, transparent)"
                    : "0 12px 40px -14px color-mix(in oklab, black 60%, transparent)",
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="hero-search-bar glass-panel relative flex items-center overflow-hidden rounded-full !p-0"
                style={{
                  borderColor: focused ? "var(--electric-blue)" : undefined,
                  transition: "border-color 0.25s ease",
                }}
              >
                <motion.span
                  animate={{ color: focused ? "var(--lime)" : "var(--slate-grey)" }}
                  transition={{ duration: 0.2 }}
                  className="grid h-12 w-12 shrink-0 place-items-center"
                >
                  <Search size={18} />
                </motion.span>

                <div className="relative flex-1">
                  {query === "" && !focused && (
                    <RotatingPlaceholder items={SEARCH_PLACEHOLDERS} prefix="Try &quot;" className="text-ivory/40" />
                  )}
                  {query === "" && focused && (
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-ivory/35 text-sm">
                      Search businesses, products, categories…
                    </span>
                  )}
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                      setTimeout(() => setFocused(false), 180);
                    }}
                    className="h-12 w-full bg-transparent pr-4 text-sm text-ivory outline-none placeholder:text-transparent"
                    aria-label="Search Glode"
                  />
                </div>

                <AnimatePresence>
                  {query.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.15 }}
                      onClick={clearSearch}
                      className="mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ivory/10 text-ivory/70 transition-colors hover:bg-ivory/20 hover:text-ivory"
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </motion.button>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {focused && (
                    <motion.button
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      onClick={closeSearch}
                      className="overflow-hidden whitespace-nowrap pr-4 text-sm font-medium text-ivory/60 hover:text-ivory"
                    >
                      Cancel
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Live results panel */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -4 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -4 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="glass-panel mt-2 overflow-hidden rounded-2xl text-left"
                  >
                    {!hasResults ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-ivory/50"
                      >
                        <Search size={28} className="opacity-30" />
                        <span>No results for <strong className="text-ivory">&ldquo;{query}&rdquo;</strong></span>
                      </motion.div>
                    ) : (
                      <div className="divide-y divide-ivory/10">
                        {/* Categories */}
                        {results.categories.length > 0 && (
                          <section className="px-4 py-3">
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-ivory/40">Categories</p>
                            <div className="flex flex-wrap gap-2">
                              {results.categories.map((cat, i) => (
                                <motion.button
                                  key={cat}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.05, duration: 0.22 }}
                                  onClick={() => navigate({ to: "/search", search: { q: cat } })}
                                  className="flex items-center gap-1.5 rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1.5 text-xs font-medium text-ivory hover:border-lime hover:text-lime transition-colors"
                                >
                                  <Tag size={11} />
                                  {cat}
                                </motion.button>
                              ))}
                            </div>
                          </section>
                        )}

                        {/* Products */}
                        {results.products.length > 0 && (
                          <section className="px-4 py-3">
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-ivory/40">Products</p>
                            <div className="space-y-2">
                              {results.products.map((product, i) => {
                                const biz = BUSINESSES.find((b) => b.id === product.businessId);
                                return (
                                  <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.24 }}
                                  >
                                    <Link
                                      to="/business/$id"
                                      params={{ id: product.businessId }}
                                      className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-ivory/5"
                                    >
                                      <div
                                        className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-ivory/10"
                                      >
                                        <img
                                          src={product.image}
                                          alt={product.name}
                                          className="h-full w-full object-cover"
                                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                        />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                          <span className="truncate text-[13px] font-semibold text-ivory">{product.name}</span>
                                          {product.price > 0 && (
                                            <span className="shrink-0 text-[13px] font-bold text-lime">
                                              ${product.price.toFixed(2)}
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                          {biz && (
                                            <span className="text-[11px] text-ivory/50 truncate">{biz.name}</span>
                                          )}
                                          {product.rating > 0 && (
                                            <span className="flex items-center gap-0.5 text-[11px] text-ivory/50">
                                              <Star size={10} className="fill-current text-lime" />
                                              {product.rating.toFixed(1)}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </section>
                        )}

                        {/* Businesses */}
                        {results.businesses.length > 0 && (
                          <section className="px-4 py-3">
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-ivory/40">Businesses</p>
                            <div className="space-y-2">
                              {results.businesses.map((biz, i) => (
                                <motion.div
                                  key={biz.id}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.06 + 0.1, duration: 0.24 }}
                                >
                                  <Link
                                    to="/business/$id"
                                    params={{ id: biz.id }}
                                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-ivory/5"
                                  >
                                    <BusinessAvatar b={biz} size={40} />
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1">
                                        <span className="truncate text-[13px] font-semibold text-ivory">{biz.name}</span>
                                        {biz.verified && <VerifiedBadge />}
                                      </div>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[11px] text-ivory/50 truncate">{biz.category}</span>
                                        {biz.rating > 0 && (
                                          <span className="flex items-center gap-0.5 text-[11px] text-ivory/50 shrink-0">
                                            <Star size={10} className="fill-current text-lime" />
                                            {biz.rating.toFixed(1)}
                                          </span>
                                        )}
                                      </div>
                                      {biz.description && (
                                        <p className="mt-0.5 line-clamp-1 text-[11px] text-ivory/35">{biz.description}</p>
                                      )}
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </section>
                        )}

                        {/* View all */}
                        <div className="px-4 py-3">
                          <button
                            onClick={() => navigate({ to: "/search", search: { q: query } })}
                            className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium text-lime transition-colors hover:bg-ivory/5"
                          >
                            View all results for &ldquo;{query}&rdquo;
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick chips — hidden while searching */}
              <AnimatePresence>
                {!focused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 flex flex-wrap justify-center gap-2 text-xs"
                  >
                    {["Shoes near me", "Restaurants", "Baby clothes"].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setQuery(s);
                          setFocused(true);
                          inputRef.current?.focus();
                        }}
                        className="rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1.5 font-medium text-ivory/70 hover:border-lime hover:text-lime transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Signup selector — hidden while searching */}
            <AnimatePresence>
              {!focused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mx-auto mt-14 max-w-2xl"
                >
                  <p className="text-sm font-medium text-ivory/60">Create your account</p>
                  <div className="glass-panel mt-3 grid grid-cols-3 gap-2 rounded-2xl p-1.5">
                    {(
                      [
                        { k: "business", label: "Business", icon: Store },
                        { k: "affiliate", label: "Affiliate", icon: Users },
                        { k: "customer", label: "Customer", icon: Sparkles },
                      ] as const
                    ).map(({ k, label, icon: Icon }) => {
                      const active = type === k;
                      return (
                        <button
                          key={k}
                          onClick={() => setType(active ? null : k)}
                          className="relative flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-colors"
                          style={{ color: active ? "var(--lime-foreground)" : "var(--ivory)" }}
                        >
                          {active && (
                            <motion.span
                              layoutId="type-pill"
                              className="absolute inset-0 rounded-xl bg-lime shadow-soft"
                              transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            />
                          )}
                          <span className="relative inline-flex items-center gap-2">
                            <Icon size={16} /> {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <AnimatePresence>
                    {type && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28 }}
                      >
                        <SignupInline type={type} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Business previews — hidden while searching */}
          <AnimatePresence>
            {!focused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mx-auto mt-16 max-w-5xl"
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {previews.map((b) => (
                    <Link
                      key={b.id}
                      to="/business/$id"
                      params={{ id: b.id }}
                      className="glass-panel group flex items-center gap-2 rounded-2xl p-3 transition-transform hover:-translate-y-0.5"
                    >
                      <BusinessAvatar b={b} size={36} />
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-semibold text-ivory">{b.name}</div>
                        <div className="truncate text-[11px] text-ivory/50">{b.category}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Ecosystem — the 4-in-1 bento grid: discoverability, direct connect, storefront, local marketplace */}
      <section className="bg-rangoon border-t border-ivory/10">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center">
            <span className="kicker-pill">One platform, four superpowers</span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-ivory sm:text-5xl">
              Discoverable. Direct. Sellable. Local.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ivory/55 sm:text-base">
              Glode blends the best of search, messaging, storefronts, and local marketplaces into one infrastructure — so businesses never have to choose.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Search,
                tag: "Google-like",
                title: "Built-in discoverability",
                desc: "Every business is indexed and SEO-ready from day one — customers find you without spending a dollar on ads.",
              },
              {
                icon: MessageCircle,
                tag: "WhatsApp-like",
                title: "Direct customer relationships",
                desc: "Chat, calls, and stories keep every conversation — and every customer — owned by you, not a platform algorithm.",
              },
              {
                icon: Store,
                tag: "Shopify-like",
                title: "Sleek micro-storefronts",
                desc: "Full product catalogs, checkout, and reviews live inside the same chat customers are already using.",
              },
              {
                icon: Globe,
                tag: "Local marketplace",
                title: "Hyper-local convenience",
                desc: "Proximity-first search surfaces businesses within walking distance, with fulfillment built for the neighborhood.",
              },
            ].map(({ icon: Icon, tag, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="bento-card beam-border p-7 sm:p-8"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-electric">
                  <Icon size={12} /> {tag}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ivory sm:text-2xl">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ivory/55">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>About Glode</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">The neighborhood, in one tap.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              We built Glode for the moments between searching and buying — where a real conversation with a real business turns &ldquo;maybe&rdquo; into &ldquo;sold.&rdquo; No forms. No cold calls. Just chat.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/signup" search={{ type: "business" }} className="btn-lime px-4 py-2.5 text-sm">List your business</Link>
              <Link to="/search" className="rounded-full border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-accent">Explore stores</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "🛍️", label: "24 cities" },
              { emoji: "✅", label: "Verified only" },
              { emoji: "💬", label: "Chat & buy" },
              { emoji: "⚡", label: "Instant replies" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-5 shadow-soft text-center">
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-2 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>Features</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Everything you need, nothing you don&rsquo;t.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Verified businesses", d: "Every listing is checked before it goes live — so you chat with confidence." },
              { icon: MessageCircle, t: "Real-time chat", d: "DM any business instantly. Ask questions, haggle, and get answers right away." },
              { icon: Zap, t: "One-tap checkout", d: "Apple Pay, cards, and local wallets — all inside the same conversation." },
              { icon: Globe, t: "Local-first discovery", d: "Businesses within walking distance surface first. No ads, pure relevance." },
              { icon: Store, t: "Business storefronts", d: "Full product catalogs, opening hours, photos, and reviews in one place." },
              { icon: Users, t: "Affiliate program", d: "Earn a commission every time you refer a sale or a new business to Glode." },
            ].map(({ icon: Icon, t, d }, idx) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.4 }}
                className="rounded-3xl border bg-card p-6 shadow-soft"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl"
                  style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary)" }}
                >
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Answers, quickly.</h2>
          </div>
          <div className="mt-10 space-y-3">
            {[
              { q: "Is Glode free to use?", a: "Yes — Glode is free for customers. Businesses subscribe to Glode Pro for advanced storefronts and analytics." },
              { q: "How are businesses verified?", a: "We check business registration, storefront, and identity documents before enabling chat and payments." },
              { q: "Do you handle payments?", a: "Yes. Glode processes checkout inside the chat with Apple Pay, cards, and local wallets." },
              { q: "Where is Glode available?", a: "We're live across 24 cities and expanding — join the waitlist for your neighborhood." },
              { q: "Can I be an affiliate?", a: "Yes. Affiliates earn a cut whenever they refer a business or drive a sale via their Glode link." },
            ].map((it, i) => (
              <FaqRow key={i} q={it.q} a={it.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <WootLogo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">The fastest way to search, chat and buy from real, verified local businesses.</p>
          </div>
          {[
            { h: "Product", l: ["Explore", "For business", "For affiliates", "Pricing"] },
            { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="text-sm font-semibold">{c.h}</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {c.l.map((x) => <li key={x}><a href="#" className="hover:text-foreground">{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-4 text-xs text-muted-foreground">
            <span>&copy; 2026 Glode Inc. All rights reserved.</span>
            <span>Made with intention in Brooklyn, NY.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
      <button onClick={() => setOpen((v) => !v)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 text-left">
        <span className="truncate text-[15px] font-semibold">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-muted-foreground">
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }}>
            <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SignupInline({ type }: { type: AccountType }) {
  const navigate = useNavigate();
  const fields =
    type === "business"
      ? [{ n: "Business name", ph: "e.g. Brew & Bloom" }, { n: "Category", ph: "Cafe, Shoes, Bakery…" }, { n: "Email", ph: "hello@brewbloom.com" }]
      : type === "affiliate"
        ? [{ n: "Full name", ph: "Alex Rivera" }, { n: "Instagram or TikTok", ph: "@alex" }, { n: "Email", ph: "alex@email.com" }]
        : [{ n: "Full name", ph: "Sam O'Neill" }, { n: "City", ph: "Brooklyn, NY" }, { n: "Email", ph: "sam@email.com" }];
  const dest = type === "business" ? "/dashboard/chats" : "/customer/chats";
  return (
    <div className="mt-5 rounded-3xl border bg-card p-5 text-left shadow-card">
      <div className="grid gap-3 sm:grid-cols-3">
        {fields.map((f) => (
          <label key={f.n} className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{f.n}</span>
            <input placeholder={f.ph} className="h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary" />
          </label>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">By continuing you agree to the terms. Demo — no data stored.</p>
        <button
          onClick={() => navigate({ to: dest })}
          className="btn-lime px-4 py-2.5 text-sm"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

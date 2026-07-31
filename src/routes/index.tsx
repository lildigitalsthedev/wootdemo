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
            <Link to="/signup" search={{ type: "customer" }} className="rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft">Get started</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-[-10rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 55%, transparent), transparent)" }}
          />
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Now live in 24 cities
            </span>
            <h1 className="mt-5 text-[44px] font-black leading-[1.02] tracking-tight sm:text-[76px]">
              Search. <span style={{ color: "var(--primary)" }}>Chat.</span> Buy.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Glode is the fastest way to discover verified local businesses, message them instantly, and buy in a tap.
            </p>

            {/* Integrated Search */}
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
                    ? "0 0 0 3px color-mix(in oklab, var(--primary) 25%, transparent), 0 12px 40px -8px color-mix(in oklab, var(--primary) 20%, transparent)"
                    : "0 8px 30px -12px rgb(15 23 42 / 0.12)",
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="relative flex items-center overflow-hidden rounded-full border bg-card"
                style={{
                  borderColor: focused ? "var(--primary)" : undefined,
                  transition: "border-color 0.25s ease",
                }}
              >
                <motion.span
                  animate={{ color: focused ? "var(--primary)" : "var(--muted-foreground)" }}
                  transition={{ duration: 0.2 }}
                  className="grid h-12 w-12 shrink-0 place-items-center"
                >
                  <Search size={18} />
                </motion.span>

                <div className="relative flex-1">
                  {query === "" && !focused && (
                    <RotatingPlaceholder items={SEARCH_PLACEHOLDERS} prefix="Try &quot;" />
                  )}
                  {query === "" && focused && (
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-muted-foreground/50 text-sm">
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
                    className="h-12 w-full bg-transparent pr-4 text-sm outline-none placeholder:text-transparent"
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
                      className="mr-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
                      className="overflow-hidden whitespace-nowrap pr-4 text-sm font-medium text-muted-foreground hover:text-foreground"
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
                    className="mt-2 overflow-hidden rounded-2xl border bg-card text-left shadow-card"
                  >
                    {!hasResults ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground"
                      >
                        <Search size={28} className="opacity-30" />
                        <span>No results for <strong className="text-foreground">&ldquo;{query}&rdquo;</strong></span>
                      </motion.div>
                    ) : (
                      <div className="divide-y">
                        {/* Categories */}
                        {results.categories.length > 0 && (
                          <section className="px-4 py-3">
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Categories</p>
                            <div className="flex flex-wrap gap-2">
                              {results.categories.map((cat, i) => (
                                <motion.button
                                  key={cat}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.05, duration: 0.22 }}
                                  onClick={() => navigate({ to: "/search", search: { q: cat } })}
                                  className="flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition-colors"
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
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Products</p>
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
                                      className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
                                    >
                                      <div
                                        className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted"
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
                                          <span className="truncate text-[13px] font-semibold">{product.name}</span>
                                          {product.price > 0 && (
                                            <span className="shrink-0 text-[13px] font-bold" style={{ color: "var(--primary)" }}>
                                              ${product.price.toFixed(2)}
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                          {biz && (
                                            <span className="text-[11px] text-muted-foreground truncate">{biz.name}</span>
                                          )}
                                          {product.rating > 0 && (
                                            <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                                              <Star size={10} className="fill-current" style={{ color: "var(--primary)" }} />
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
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Businesses</p>
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
                                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
                                  >
                                    <BusinessAvatar b={biz} size={40} />
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1">
                                        <span className="truncate text-[13px] font-semibold">{biz.name}</span>
                                        {biz.verified && <VerifiedBadge />}
                                      </div>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[11px] text-muted-foreground truncate">{biz.category}</span>
                                        {biz.rating > 0 && (
                                          <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground shrink-0">
                                            <Star size={10} className="fill-current" style={{ color: "var(--primary)" }} />
                                            {biz.rating.toFixed(1)}
                                          </span>
                                        )}
                                      </div>
                                      {biz.description && (
                                        <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground/70">{biz.description}</p>
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
                            className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                            style={{ color: "var(--primary)" }}
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
                        className="rounded-full border bg-background px-3 py-1.5 font-medium text-muted-foreground hover:bg-accent transition-colors"
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
                  <p className="text-sm font-medium text-muted-foreground">Create your account</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border bg-card p-1.5 shadow-soft">
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
                          style={{ color: active ? "white" : "var(--foreground)" }}
                        >
                          {active && (
                            <motion.span
                              layoutId="type-pill"
                              className="absolute inset-0 rounded-xl bg-primary shadow-soft"
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
                      className="group flex items-center gap-2 rounded-2xl border bg-card p-3 shadow-soft transition-transform hover:-translate-y-0.5"
                    >
                      <BusinessAvatar b={b} size={36} />
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-semibold">{b.name}</div>
                        <div className="truncate text-[11px] text-muted-foreground">{b.category}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              <Link to="/signup" search={{ type: "business" }} className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">List your business</Link>
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
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Store, Users, Sparkles, ShieldCheck, MessageCircle, Zap, Globe, ChevronDown } from "lucide-react";
import { WootLogo } from "@/components/woot/Logo";
import { RotatingPlaceholder } from "@/components/woot/RotatingPlaceholder";
import { BUSINESSES, SEARCH_PLACEHOLDERS } from "@/lib/mock-data";
import { BusinessAvatar } from "@/components/woot/BusinessAvatar";

export const Route = createFileRoute("/")({
  component: Index,
});

type AccountType = "business" | "affiliate" | "customer";

function Index() {
  const [type, setType] = useState<AccountType | null>(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const previews = useMemo(() => BUSINESSES.slice(0, 6), []);

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
          <div className="absolute left-1/2 top-[-10rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
               style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 60%, transparent), transparent)" }} />
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
              Search. Find. <span style={{ color: "var(--primary)" }}>Chat.</span> Buy.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Woot is the fastest way to discover verified local businesses, message them like a friend, and buy in a tap.
            </p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mx-auto mt-8 max-w-xl"
            >
              <div className="relative flex items-center rounded-full border bg-card p-1.5 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground">
                  <Search size={18} />
                </span>
                <div className="relative flex-1">
                  {!query && <RotatingPlaceholder items={SEARCH_PLACEHOLDERS} />}
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") navigate({ to: "/search", search: { q: query } }); }}
                    className="h-11 w-full bg-transparent text-[15px] outline-none"
                    aria-label="Search"
                  />
                </div>
                <button
                  onClick={() => navigate({ to: "/search", search: { q: query } })}
                  className="inline-flex h-11 items-center gap-1 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
                >
                  Search <ArrowRight size={16} />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
                {["Shoes near me", "Restaurants", "Baby clothes"].map((s) => (
                  <button key={s} onClick={() => navigate({ to: "/search", search: { q: s } })}
                    className="rounded-full border bg-background px-3 py-1.5 font-medium text-muted-foreground hover:bg-accent">{s}</button>
                ))}
              </div>
            </motion.div>

            {/* Signup selector */}
            <div className="mx-auto mt-14 max-w-2xl">
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
                        <motion.span layoutId="type-pill" className="absolute inset-0 rounded-xl bg-primary shadow-soft" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                      )}
                      <span className="relative inline-flex items-center gap-2">
                        <Icon size={16} /> {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence initial={false}>
                {type && (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <SignupInline type={type} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Preview strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {previews.map((b) => (
                <Link key={b.id} to="/business/$id" params={{ id: b.id }}
                  className="group flex items-center gap-2 rounded-2xl border bg-card p-3 shadow-soft transition-transform hover:-translate-y-0.5">
                  <BusinessAvatar b={b} size={36} />
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold">{b.name}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{b.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>About Woot</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">The neighborhood, in one tap.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              We built Woot for the moments between searching and buying — where a real conversation with a real business turns "maybe" into "sold." No forms. No cold calls. Just chat.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/signup" search={{ type: "business" }} className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">List your business</Link>
              <Link to="/search" className="rounded-full border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-accent">Explore stores</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "24", l: "Cities" },
              { k: "12k", l: "Verified businesses" },
              { k: "1.4M", l: "Conversations / mo" },
              { k: "4.9★", l: "App rating" },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl border bg-card p-6 shadow-soft">
                <div className="text-4xl font-black tracking-tight">{s.k}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--primary)" }}>Features</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Everything you need to transact locally.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { i: Search, t: "Intelligent search", d: "Describe what you want in plain language. Woot finds it." },
              { i: MessageCircle, t: "Chat, not forms", d: "Message any business the way you'd text a friend." },
              { i: ShieldCheck, t: "Verified only", d: "Every business is ID-verified before they can chat or sell." },
              { i: Zap, t: "One-tap checkout", d: "Buy without leaving the chat. Receipts land in your inbox." },
              { i: Globe, t: "Global + Nearby", d: "Toggle between neighborhood, private circle, and worldwide." },
              { i: Sparkles, t: "Stories & drops", d: "See what's new, when it drops. Never miss a launch." },
            ].map((f) => {
              const Icon = f.i;
              return (
                <motion.div key={f.t}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border bg-card p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary)" }}>
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{f.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
                </motion.div>
              );
            })}
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
              { q: "Is Woot free to use?", a: "Yes — Woot is free for customers. Businesses subscribe to Woot Pro for advanced storefronts and analytics." },
              { q: "How are businesses verified?", a: "We check business registration, storefront, and identity documents before enabling chat and payments." },
              { q: "Do you handle payments?", a: "Yes. Woot processes checkout inside the chat with Apple Pay, cards, and local wallets." },
              { q: "Where is Woot available?", a: "We're live across 24 cities and expanding — join the waitlist for your neighborhood." },
              { q: "Can I be an affiliate?", a: "Yes. Affiliates earn a cut whenever they refer a business or drive a sale via their Woot link." },
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
            <span>© 2026 Woot Inc. All rights reserved.</span>
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
  const fields = type === "business"
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
        <button onClick={() => navigate({ to: dest })}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

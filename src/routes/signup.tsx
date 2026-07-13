import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Store, Users, Sparkles } from "lucide-react";
import { WootLogo } from "@/components/woot/Logo";

const search = z.object({
  type: z.enum(["business", "affiliate", "customer"]).optional().catch(undefined),
});

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Woot" }, { name: "description", content: "Create your Woot account as a business, affiliate, or customer." }] }),
  validateSearch: search,
  component: SignupPage,
});

type T = "business" | "affiliate" | "customer";

function SignupPage() {
  const { type } = Route.useSearch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<T | null>(type ?? null);

  const options = [
    { k: "business" as const, icon: Store, title: "Business", d: "Create a storefront and chat with customers." },
    { k: "affiliate" as const, icon: Users, title: "Affiliate", d: "Refer businesses and earn on every sale." },
    { k: "customer" as const, icon: Sparkles, title: "Customer", d: "Discover, chat and buy from local shops." },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} /> Back
        </Link>
        <WootLogo size={22} />
        <span className="text-sm text-muted-foreground">Step {selected ? 2 : 1} of 2</span>
      </header>

      <div className="mx-auto max-w-3xl px-5 pb-16 pt-6">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black tracking-tight sm:text-5xl">
          Join Woot.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-2 text-muted-foreground">
          Pick how you want to use Woot. You can change this later.
        </motion.p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {options.map((o) => {
            const Icon = o.icon;
            const active = selected === o.k;
            return (
              <button key={o.k} onClick={() => setSelected(o.k)}
                className="rounded-3xl border bg-card p-5 text-left shadow-soft transition-all hover:-translate-y-0.5"
                style={{ borderColor: active ? "var(--primary)" : undefined, boxShadow: active ? "0 12px 30px -12px color-mix(in oklab, var(--primary) 40%, transparent)" : undefined }}>
                <span className="grid h-11 w-11 place-items-center rounded-2xl"
                  style={{ background: active ? "var(--primary)" : "color-mix(in oklab, var(--primary) 10%, transparent)",
                           color: active ? "white" : "var(--primary)" }}>
                  <Icon size={20} />
                </span>
                <div className="mt-4 text-lg font-semibold">{o.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{o.d}</div>
              </button>
            );
          })}
        </div>

        <AnimatePresence initial={false} mode="wait">
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <Form t={selected} onDone={() => navigate({ to: selected === "business" ? "/dashboard/chats" : "/customer/chats" })} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Form({ t, onDone }: { t: T; onDone: () => void }) {
  const fields = t === "business"
    ? [{ n: "Business name", ph: "Brew & Bloom" }, { n: "Category", ph: "Cafe" }, { n: "Location", ph: "Portland, OR" }, { n: "Email", ph: "hello@brewbloom.com" }]
    : t === "affiliate"
      ? [{ n: "Full name", ph: "Alex Rivera" }, { n: "Handle", ph: "@alex" }, { n: "City", ph: "Los Angeles, CA" }, { n: "Email", ph: "alex@email.com" }]
      : [{ n: "Full name", ph: "Sam O'Neill" }, { n: "City", ph: "Brooklyn, NY" }, { n: "Phone", ph: "(555) 010-2345" }, { n: "Email", ph: "sam@email.com" }];
  return (
    <div className="mt-6 rounded-3xl border bg-card p-6 shadow-card">
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.n} className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{f.n}</span>
            <input placeholder={f.ph} className="h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary" />
          </label>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Demo experience — no accounts created.</p>
        <button onClick={onDone} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">
          Enter Woot <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
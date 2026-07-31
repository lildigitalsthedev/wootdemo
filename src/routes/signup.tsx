import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Store, Users, Sparkles } from "lucide-react";
import { WootLogo as GlodeLogo } from "@/components/woot/Logo";

const search = z.object({
  type: z.enum(["business", "affiliate", "customer"]).optional().catch(undefined),
});

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Glode" }, { name: "description", content: "Create your Glode account as a business, affiliate, or customer." }] }),
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
        <GlodeLogo size={22} />
        <span className="text-sm text-muted-foreground">Step {selected ? 2 : 1} of 2</span>
      </header>

      <div className="mx-auto max-w-3xl px-5 pb-16 pt-6">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black tracking-tight sm:text-5xl">
          Join Glode.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-3 max-w-lg text-muted-foreground">
          Search, chat and buy from verified local businesses — or list your own store and start selling in minutes.
        </motion.p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {options.map((o, i) => {
            const active = selected === o.k;
            return (
              <motion.button
                key={o.k}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                onClick={() => setSelected(o.k)}
                className="group relative overflow-hidden rounded-3xl border bg-card p-5 text-left shadow-soft transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: active ? "var(--primary)" : undefined,
                  boxShadow: active ? "0 0 0 3px color-mix(in oklab, var(--primary) 20%, transparent)" : undefined,
                }}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: active ? "var(--primary)" : "var(--accent)", color: active ? "white" : "var(--foreground)" }}>
                  <o.icon size={20} />
                </span>
                <div className="mt-3 text-[15px] font-bold">{o.title}</div>
                <div className="mt-1 text-[13px] text-muted-foreground">{o.d}</div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-3xl border bg-card p-5 shadow-card">
                <div className="grid gap-3 sm:grid-cols-2">
                  {selected === "business" && (
                    <>
                      <Field label="Business name" placeholder="e.g. Brew & Bloom" />
                      <Field label="Category" placeholder="Cafe, Shoes, Bakery…" />
                      <Field label="Email" placeholder="hello@brewbloom.com" />
                      <Field label="City" placeholder="Brooklyn, NY" />
                    </>
                  )}
                  {selected === "affiliate" && (
                    <>
                      <Field label="Full name" placeholder="Alex Rivera" />
                      <Field label="Instagram or TikTok" placeholder="@alex" />
                      <Field label="Email" placeholder="alex@email.com" />
                      <Field label="City" placeholder="Brooklyn, NY" />
                    </>
                  )}
                  {selected === "customer" && (
                    <>
                      <Field label="Full name" placeholder="Sam O'Neill" />
                      <Field label="City" placeholder="Brooklyn, NY" />
                      <Field label="Email" placeholder="sam@email.com" />
                    </>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">By continuing you agree to the terms. Demo — no data stored.</p>
                  <button
                    onClick={() => navigate({ to: selected === "business" ? "/dashboard/chats" : "/customer/chats" })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input placeholder={placeholder} className="h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary" />
    </label>
  );
}

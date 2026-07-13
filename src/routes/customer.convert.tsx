import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, BarChart3, Check, MessageCircle, ShieldCheck, Store } from "lucide-react";

export const Route = createFileRoute("/customer/convert")({
  head: () => ({ meta: [{ title: "Become a Business — Woot" }] }),
  component: Convert,
});

function Convert() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto min-h-[100dvh] max-w-3xl bg-surface">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <Link to="/customer/chats" className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><ArrowLeft size={18} /></Link>
        <h1 className="truncate text-[17px] font-semibold">Become a business</h1>
        <span className="text-xs text-muted-foreground">Preview</span>
      </header>

      <div className="px-4 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border bg-card p-6 shadow-card">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft"><Store size={22} /></div>
          <h2 className="mt-4 text-3xl font-black tracking-tight">Turn your account into a storefront.</h2>
          <p className="mt-2 text-muted-foreground">Keep everything you already have — chats, contacts, stories — and unlock the tools to sell.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { i: MessageCircle, t: "Business chat", d: "Auto-replies, saved templates, team inbox." },
              { i: BarChart3, t: "Live analytics", d: "See what's converting and what's not." },
              { i: ShieldCheck, t: "Verification", d: "Get the Woot verified badge to build trust." },
            ].map((f) => {
              const Icon = f.i;
              return (
                <div key={f.t} className="rounded-2xl border bg-background p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary)" }}>
                    <Icon size={16} />
                  </span>
                  <div className="mt-3 text-sm font-semibold">{f.t}</div>
                  <div className="text-[12px] text-muted-foreground">{f.d}</div>
                </div>
              );
            })}
          </div>

          <ul className="mt-6 grid gap-2 text-sm">
            {["Free to start — no card required", "Import your existing chats in one tap", "Cancel or downgrade any time"].map((x) => (
              <li key={x} className="inline-flex items-center gap-2 text-muted-foreground">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground"><Check size={12} /></span>
                {x}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Link to="/customer/chats" className="rounded-full border px-4 py-2.5 text-sm font-semibold hover:bg-accent">Not now</Link>
            <button onClick={() => navigate({ to: "/dashboard/chats" })}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
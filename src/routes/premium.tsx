import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, ChevronDown, Crown, Globe } from "lucide-react";
import { PageTransition } from "@/components/woot/PageTransition";
import { Sidebar } from "@/components/woot/Sidebar";

export const Route = createFileRoute("/premium")({
  head: () => ({ meta: [{ title: "Woot Premium" }, { name: "description", content: "Upgrade your business with Woot Premium." }] }),
  component: PremiumPage,
});

type Plan = {
  id: string; name: string;
  monthlyUsd: number; yearlyUsd: number | null;
  monthlyNgn: number; yearlyNgn: number | null;
  summary: string; highlight?: boolean; features: string[];
};

const PLANS: Plan[] = [
  {
    id: "free", name: "Free", monthlyUsd: 0, yearlyUsd: null, monthlyNgn: 0, yearlyNgn: null,
    summary: "Everything you need to start selling on Woot.",
    features: [
      "Unlimited conversations",
      "24-hour disappearing messages (cannot be disabled)",
      "Business username",
      "Basic business profile",
      "Reviews & ratings",
      "Stories",
      "Voice & video calls",
      "QR Code",
      "Shareable business link",
      "Basic analytics",
      "Warning banner until business review",
      "1 Admin",
      "AI Support",
    ],
  },
  {
    id: "small", name: "Starter", monthlyUsd: 3.99, yearlyUsd: 39.99, monthlyNgn: 3999, yearlyNgn: 39999,
    summary: "Grow with catalogue, hours, and referrals. Save ~17% yearly.",
    features: [
      "Everything in Free",
      "Groups", "Catalogue", "Disable disappearing messages",
      "Referral Program", "Small Search Boost", "Small Story Boost",
      "Business Hours", "Location & Map", "Welcome Message",
      "Customer Labels", "Up to 3 Admins / Linked Devices",
      "Basic Business Insights", "Message Scheduling", "Advanced AI Support",
    ],
  },
  {
    id: "medium", name: "Growth", monthlyUsd: 7.99, yearlyUsd: 79.99, monthlyNgn: 7999, yearlyNgn: 79999,
    highlight: true,
    summary: "For growing teams — boosts, verification, and team inbox.",
    features: [
      "Everything in Starter",
      "100 AI Credits (expandable)", "Medium Search Boost", "Medium Story Boost",
      "Business Tags", "Auto Reply", "Advanced Business Profile",
      "Broadcast Lists", "Verified Badge", "Saved Replies", "Quick Replies",
      "Team Inbox", "Unified Inbox", "Customer Notes", "Story Scheduling",
      "Multiple Catalogues", "Advanced Analytics", "AI Chat Assistant", "Priority Support",
    ],
  },
  {
    id: "large", name: "Scale", monthlyUsd: 15.99, yearlyUsd: 159.99, monthlyNgn: 15999, yearlyNgn: 159999,
    summary: "Scale with AI automations, CRM, and custom domain.",
    features: [
      "Everything in Growth",
      "Large Search Boost", "Large Story Boost", "Group Search Toggle",
      "Trending Businesses", "Business Recommendations", "Website + Custom Domain",
      "AI Auto Reply Bot", "AI Recommended Actions", "Communities",
      "Supplier Search", "Competitor Search", "Affiliate Partnerships",
      "AI Business Review", "AI-generated Stories", "AI-generated Posts",
      "AI Product Descriptions", "CRM", "Customer Segmentation",
      "Automation Workflows", "Appointment Booking", "Payment Integrations",
      "Early Access Features", "Premium Support",
    ],
  },
  {
    id: "enterprise", name: "Enterprise", monthlyUsd: 59.99, yearlyUsd: 599.99, monthlyNgn: 59999, yearlyNgn: 599999,
    summary: "Custom AI, SSO, integrations, and a dedicated team.",
    features: [
      "Everything in Scale",
      "Unlimited Branches", "Unlimited Staff", "Department Management",
      "SSO", "Advanced Permissions", "Audit Logs", "Compliance Tools",
      "Custom AI trained on company documents", "AI Knowledge Base",
      "Executive Analytics Dashboard", "Custom Reports", "API Access",
      "ERP Integrations", "CRM Integrations", "Accounting Integrations", "HR Integrations",
      "White Label Branding", "Dedicated Account Manager",
      "Onboarding & Migration", "Staff Training", "SLA/Uptime Guarantee", "Phone Support",
    ],
  },
];

type Currency = "USD" | "NGN";

/** Detects whether the viewer is likely in Nigeria, without requiring a permission prompt. */
function useRegionCurrency(): { currency: Currency; auto: Currency; source: "timezone" | "locale" | "geo"; override: Currency | null; setOverride: (c: Currency | null) => void } {
  const [auto, setAuto] = useState<Currency>("USD");
  const [source, setSource] = useState<"timezone" | "locale" | "geo">("timezone");
  const [override, setOverride] = useState<Currency | null>(null);

  useEffect(() => {
    // 1. Fast, no-permission signal: browser timezone.
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Africa/Lagos") {
        setAuto("NGN");
        setSource("timezone");
      }
    } catch {
      /* Intl unsupported — fall through to default USD */
    }

    // 2. Secondary signal: browser locale region (e.g. "en-NG").
    try {
      const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
      if (locales.some((l) => l?.toUpperCase().endsWith("-NG"))) {
        setAuto("NGN");
        setSource("locale");
      }
    } catch {
      /* navigator unsupported — ignore */
    }
  }, []);

  return { currency: override ?? auto, auto, source, override, setOverride };
}

function formatPrice(plan: Plan, cycle: "monthly" | "yearly", currency: Currency) {
  if (currency === "NGN") {
    const ngn = cycle === "monthly" ? plan.monthlyNgn : (plan.yearlyNgn ?? plan.monthlyNgn);
    return ngn === 0 ? "₦0" : `₦${ngn.toLocaleString("en-NG")}`;
  }
  const usd = cycle === "monthly" ? plan.monthlyUsd : (plan.yearlyUsd ?? plan.monthlyUsd);
  return usd === 0 ? "$0" : `$${usd.toFixed(2)}`;
}

/** Enterprise-only: the fixed monthly "starts at" figure (no suffix), regardless of the Monthly/Yearly toggle. */
function formatStartsAtMonthly(plan: Plan, currency: Currency) {
  return currency === "NGN" ? `₦${plan.monthlyNgn.toLocaleString("en-NG")}` : `$${plan.monthlyUsd.toFixed(2)}`;
}

/** Enterprise-only: the fixed yearly "starts at" figure (no suffix), regardless of the Monthly/Yearly toggle. */
function formatStartsAtYearly(plan: Plan, currency: Currency) {
  const ngn = plan.yearlyNgn ?? plan.monthlyNgn * 10;
  const usd = plan.yearlyUsd ?? plan.monthlyUsd * 10;
  return currency === "NGN" ? `₦${ngn.toLocaleString("en-NG")}` : `$${usd.toFixed(2)}`;
}

function PremiumPage() {
  const nav = useNavigate();
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [open, setOpen] = useState<string | null>("medium");
  const { currency, setOverride } = useRegionCurrency();

  return (
    <PageTransition>
      <div className="min-h-[100dvh] bg-surface lg:pl-20">
        <Sidebar base="customer" />
        <div className="mx-auto max-w-3xl">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/85 px-3 py-3 backdrop-blur-xl">
          <button onClick={() => nav({ to: "/profile" })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent lg:hidden"><ArrowLeft size={18} /></button>
          <h1 className="flex-1 text-center text-[17px] font-bold lg:text-left">Woot Premium</h1>
          <div className="w-10 lg:hidden" />
        </header>

        <div className="px-4 pb-16 pt-8">
          <div className="text-center">
            <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-white shadow-card">
              <Crown size={24} />
            </motion.span>
            <h2 className="mt-4 text-[28px] font-black tracking-tight">Do more with Premium</h2>
            <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">Boosts, AI tools, and analytics designed for businesses that ship.</p>

            <div className="mx-auto mt-5 inline-flex rounded-full border bg-card p-1 shadow-soft">
              {(["monthly", "yearly"] as const).map((c) => (
                <button key={c} onClick={() => setCycle(c)}
                  className="rounded-full px-4 py-1.5 text-[12px] font-semibold transition"
                  style={{ background: cycle === c ? "var(--primary)" : "transparent", color: cycle === c ? "white" : "var(--foreground)" }}>
                  {c === "monthly" ? "Monthly" : "Yearly · save 17%"}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOverride(currency === "NGN" ? "USD" : "NGN")}
              className="mx-auto mt-3 flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-soft transition-transform hover:scale-105 active:scale-95"
            >
              <Globe size={12} />
              Showing prices in {currency === "NGN" ? "Nigerian Naira (₦)" : "US Dollars ($)"}
              <span className="text-primary">· Switch to {currency === "NGN" ? "USD" : "NGN"}</span>
            </button>
          </div>

          <div className="mt-8 grid gap-3">
            {PLANS.map((p) => {
              const isOpen = open === p.id;
              const price = formatPrice(p, cycle, currency);
              const hasYearly = currency === "NGN" ? p.yearlyNgn !== null : p.yearlyUsd !== null;
              return (
                <motion.div layout key={p.id}
                  className={"overflow-hidden rounded-3xl border bg-card shadow-soft " + (p.highlight ? "ring-2 ring-primary" : "")}>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[17px] font-bold tracking-tight">{p.name}</h3>
                          {p.highlight && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">Popular</span>}
                        </div>
                        <p className="mt-1 text-[13px] text-muted-foreground">{p.summary}</p>
                      </div>
                      <div className="text-right">
                        {p.id === "enterprise" ? (
                          <>
                            <div className="text-[11px] font-medium text-muted-foreground">Starts at</div>
                            <div className="text-[22px] font-black leading-tight tracking-tight">
                              {cycle === "monthly" ? formatStartsAtMonthly(p, currency) : formatStartsAtYearly(p, currency)}
                            </div>
                            <div className="text-[11px] text-muted-foreground">{cycle === "monthly" ? "/ month" : "/ year"}</div>
                          </>
                        ) : (
                          <>
                            <div className="text-[22px] font-black tracking-tight">{price}</div>
                            <div className="text-[11px] text-muted-foreground">
                              {p.id === "free" ? "" : cycle === "monthly" ? "/ month" : hasYearly ? "/ year" : ""}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button className="flex-1 rounded-full px-4 py-2.5 text-[13px] font-semibold shadow-soft transition"
                        style={{ background: p.highlight ? "var(--primary)" : "var(--background)", color: p.highlight ? "white" : "var(--foreground)", border: p.highlight ? "none" : "1px solid var(--border)" }}>
                        {p.id === "free" ? "Current plan" : p.id === "enterprise" ? "Contact sales" : "Choose plan"}
                      </button>
                      <button onClick={() => setOpen(isOpen ? null : p.id)}
                        className="grid h-10 w-10 place-items-center rounded-full border bg-background hover:bg-accent">
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div layout key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="border-t bg-background/40">
                        <ul className="grid gap-2 p-5">
                          {p.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-[13px]">
                              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check size={11} strokeWidth={3} /></span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-[11px] text-muted-foreground">
            {currency === "NGN" ? "Local pricing for Nigeria." : "Prices shown in USD."} Taxes may apply. Cancel anytime.
          </p>
        </div>
        </div>
      </div>
    </PageTransition>
  );
}
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Copy, QrCode, Share2, Store, Star, Users, Crown, ExternalLink, Pencil, Settings as SettingsIcon, ShoppingBag, Camera, LayoutGrid, Image as ImageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMe, updateMe } from "@/lib/mock-data";
import { PageTransition } from "@/components/woot/PageTransition";
import { VerifiedBadge } from "@/components/woot/Logo";
import { Sidebar } from "@/components/woot/Sidebar";
import { BottomNav } from "@/components/woot/BottomNav";
import { PremiumSheet } from "@/components/woot/PremiumSheet";

const search = z.object({ from: z.enum(["dashboard", "customer"]).optional().catch(undefined) });

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Glode" }] }),
  validateSearch: search,
  component: ProfilePage,
});

type Section = "quick-access" | "storefront";
const sections: { k: Section; label: string; icon: LucideIcon }[] = [
  { k: "quick-access", label: "Business Quick Access", icon: LayoutGrid },
  { k: "storefront", label: "Storefront Preview", icon: ImageIcon },
];

function ProfilePage() {
  const nav = useNavigate();
  const { from } = Route.useSearch();
  const base: "dashboard" | "customer" = from === "customer" ? "customer" : "dashboard";
  const me = useMe();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [section, setSection] = useState<Section>("quick-access");
  const [premiumOpen, setPremiumOpen] = useState(false);

  const handlePickPhoto = () => fileInputRef.current?.click();

  const handlePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateMe({ avatarUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const photoInput = (
    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelected} />
  );

  const identityCard = (compact: boolean) => (
    <div className="flex flex-col items-center text-center">
      <motion.button
        type="button"
        onClick={handlePickPhoto}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative grid place-items-center rounded-full font-black text-white"
        style={{ width: compact ? 92 : 108, height: compact ? 92 : 108 }}
        aria-label="Change profile picture"
      >
        <div
          className="grid h-full w-full place-items-center overflow-hidden rounded-full ring-4 ring-background"
          style={{
            background: me.avatarUrl ? undefined : me.color,
            fontSize: compact ? 22 : 28,
            boxShadow: "0 12px 28px -12px color-mix(in oklab, var(--primary) 55%, transparent)",
          }}
        >
          {me.avatarUrl ? (
            <img src={me.avatarUrl} alt={me.name} className="h-full w-full object-cover" />
          ) : (
            me.avatar
          )}
        </div>
        <span className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border-2 border-background bg-foreground text-background">
          <Camera size={12} strokeWidth={2.5} />
        </span>
      </motion.button>

      <div className="mt-4 flex items-center gap-1.5">
        <span className="text-[23px] font-black tracking-tight">{me.name}</span>
        {me.verified && <VerifiedBadge />}
      </div>
      <div className="mt-0.5 text-[12px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        {me.handle} · {me.role}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-medium text-foreground/80 transition hover:border-foreground/20 hover:bg-accent"><Copy size={13} /> Copy DM link</button>
        <button className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-medium text-foreground/80 transition hover:border-foreground/20 hover:bg-accent"><QrCode size={13} /> QR code</button>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12px] font-semibold text-background transition hover:opacity-90"><Share2 size={13} /> Share</button>
      </div>

      <div className="mt-7 grid w-full grid-cols-3 divide-x rounded-xl border">
        {[
          { icon: Users, label: "Followers", value: me.followers.toLocaleString() },
          { icon: Star, label: "Reviews", value: me.reviews.toLocaleString() },
          { icon: Crown, label: "Plan", value: me.plan },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-3.5">
            <div className="text-[16px] font-bold tabular-nums leading-none">{s.value}</div>
            <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <s.icon size={10} />
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const quickAccessContent = (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Business Quick Access</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Pencil, label: "Edit Profile", onClick: handlePickPhoto },
          { icon: Store, label: "Edit Storefront" },
          { icon: ShoppingBag, label: "My Shop" },
          { icon: Share2, label: "Share DM Link" },
          { icon: QrCode, label: "QR Code" },
          { icon: Copy, label: "Copy Store Link" },
          { icon: ExternalLink, label: "View Public Store" },
          { icon: Crown, label: "Current Subscription" },
        ].map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className="group flex items-center gap-2.5 rounded-xl border p-3 text-left text-[13px] font-medium text-foreground/85 transition hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-accent hover:shadow-sm"
          >
            <a.icon size={15} className="shrink-0 text-muted-foreground transition group-hover:text-primary" />
            <span className="truncate">{a.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => setPremiumOpen(true)}
        className="relative mt-3 flex w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary p-4 text-left text-white shadow-lg shadow-primary/20"
      >
        <div
          className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <div className="relative">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/70">Growth Plan · $7.99/mo</div>
          <div className="mt-0.5 text-[15px] font-bold">Upgrade to Glode Premium</div>
          <div className="mt-0.5 text-[12px] text-white/75">Verified badge, boosts, and team inbox</div>
        </div>
        <Crown size={22} className="relative shrink-0 text-white/90" />
      </button>
    </div>
  );

  const storefrontContent = (
    <div>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Storefront Preview</div>
      <div className="grid grid-cols-3 gap-2">
        {["1542291026-7eec264c27ff", "1552346154-21d32810aba3", "1600185365483-26d7a4cc7519"].map((id) => (
          <div key={id} className="aspect-square overflow-hidden rounded-xl">
            <img src={`https://images.unsplash.com/photo-${id}?w=300&h=300&fit=crop&auto=format&q=80`} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[100dvh] w-full bg-surface md:h-[100dvh] md:min-h-0 md:overflow-hidden md:pl-[80px]">
      <Sidebar base={base} />
      {photoInput}
      <PremiumSheet open={premiumOpen} onClose={() => setPremiumOpen(false)} />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col pb-28 md:max-w-none md:min-h-0 md:pb-0">
        <PageTransition>
          <div className="mx-auto min-h-[100dvh] w-full max-w-3xl bg-surface md:max-w-none md:flex md:h-[100dvh] md:min-h-0 md:max-w-none">
            <div className="md:hidden">
              <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-background/85 px-3 py-3 backdrop-blur-xl">
                <button onClick={() => nav({ to: `/${base}/chats` })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><ArrowLeft size={18} /></button>
                <h1 className="truncate text-[17px] font-bold">Profile</h1>
                <Link to="/settings" search={{ from: base }} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><SettingsIcon size={18} /></Link>
              </header>

              <div className="px-4 pt-8">
                {identityCard(false)}
                <div className="mt-8">{quickAccessContent}</div>
                <div className="mt-8">{storefrontContent}</div>
                <div className="h-12" />
              </div>
            </div>

            <div className="hidden min-h-0 flex-1 md:flex">
              <aside className="flex w-72 shrink-0 flex-col gap-4 overflow-y-auto border-r bg-background p-4 md:w-80">
                {identityCard(true)}
                <nav className="flex flex-col gap-1">
                  {sections.map((s) => {
                    const active = section === s.k;
                    return (
                      <button
                        key={s.k}
                        onClick={() => setSection(s.k)}
                        className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition-colors"
                        style={{
                          background: active ? "color-mix(in oklab, var(--primary) 14%, transparent)" : "transparent",
                          color: active ? "var(--primary)" : "var(--foreground)",
                        }}
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: active ? "var(--primary)" : "var(--accent)", color: active ? "white" : "var(--foreground)" }}>
                          <s.icon size={15} />
                        </span>
                        {s.label}
                      </button>
                    );
                  })}
                </nav>
              </aside>
              <section className="min-w-0 flex-1 overflow-y-auto">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-3">
                  <div className="flex items-center gap-2 text-[15px] font-bold">
                    {sections.find((s) => s.k === section)?.label}
                  </div>
                  <Link to="/settings" search={{ from: base }} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><SettingsIcon size={18} /></Link>
                </div>
                <div className="mx-auto max-w-2xl px-6 py-5">
                  <AnimatePresence mode="wait">
                    <motion.div key={section} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                      {section === "quick-access" ? quickAccessContent : storefrontContent}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </section>
            </div>
          </div>
        </PageTransition>
      </div>
      <div className="md:hidden">
        <BottomNav base={base} />
      </div>
    </div>
  );
}

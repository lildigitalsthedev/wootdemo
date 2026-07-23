import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useRef } from "react";
import { z } from "zod";
import { ArrowLeft, Copy, QrCode, Share2, Store, Star, Users, Crown, ExternalLink, Pencil, Settings as SettingsIcon, ShoppingBag, Camera } from "lucide-react";
import { useMe, updateMe } from "@/lib/mock-data";
import { PageTransition } from "@/components/woot/PageTransition";
import { VerifiedBadge } from "@/components/woot/Logo";
import { Sidebar } from "@/components/woot/Sidebar";
import { BottomNav } from "@/components/woot/BottomNav";

const search = z.object({ from: z.enum(["dashboard", "customer"]).optional().catch(undefined) });

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Woot" }] }),
  validateSearch: search,
  component: ProfilePage,
});

function ProfilePage() {
  const nav = useNavigate();
  const { from } = Route.useSearch();
  const base: "dashboard" | "customer" = from === "customer" ? "customer" : "dashboard";
  const me = useMe();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    e.target.value = ""; // allow re-selecting the same file later
  };

  return (
    // Same shell shape as dashboard.tsx / customer.tsx so Profile behaves like a
    // primary tab: Sidebar (desktop) and BottomNav (mobile) always stay mounted.
    <div className="flex min-h-[100dvh] w-full bg-surface lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden lg:pl-20">
      <Sidebar base={base} />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col pb-28 md:max-w-none lg:min-h-0 lg:pb-0">
        <PageTransition>
          <div className="mx-auto min-h-[100dvh] w-full max-w-3xl bg-surface md:max-w-none lg:min-h-0 lg:overflow-y-auto">
            <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-background/85 px-3 py-3 backdrop-blur-xl md:px-6 lg:bg-background lg:backdrop-blur-none">
              <button onClick={() => nav({ to: `/${base}/chats` })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><ArrowLeft size={18} /></button>
              <h1 className="truncate text-[17px] font-bold">Profile</h1>
              <Link to="/settings" search={{ from: base }} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><SettingsIcon size={18} /></Link>
            </header>

            <div className="px-4 pt-6 md:mx-auto md:max-w-xl">
              <div className="flex flex-col items-center text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoSelected}
                />
                <motion.button
                  type="button"
                  onClick={handlePickPhoto}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full text-[26px] font-black text-white shadow-card"
                  style={{ background: me.avatarUrl ? undefined : me.color }}
                  aria-label="Change profile picture"
                >
                  {me.avatarUrl ? (
                    <img src={me.avatarUrl} alt={me.name} className="h-full w-full object-cover" />
                  ) : (
                    me.avatar
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full border-2 border-background bg-primary text-white">
                    <Camera size={13} strokeWidth={2.5} />
                  </span>
                </motion.button>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-[22px] font-black tracking-tight">{me.name}</span>
                  {me.verified && <VerifiedBadge />}
                </div>
                <div className="text-[13px] text-muted-foreground">{me.handle} · {me.role}</div>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-[12px] font-semibold shadow-soft hover:bg-accent"><Copy size={14} /> Copy DM link</button>
                  <button className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-[12px] font-semibold shadow-soft hover:bg-accent"><QrCode size={14} /> QR code</button>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-[12px] font-semibold text-primary-foreground shadow-soft"><Share2 size={14} /> Share</button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Users, label: "Followers", value: me.followers.toLocaleString() },
                  { icon: Star, label: "Reviews", value: me.reviews.toLocaleString() },
                  { icon: Crown, label: "Plan", value: me.plan },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center rounded-2xl border bg-card p-3 shadow-soft">
                    <s.icon size={16} className="text-primary" />
                    <div className="mt-1 text-[15px] font-bold">{s.value}</div>
                    <div className="text-[11px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border bg-card p-4 shadow-soft">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Business Quick Access</div>
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
                    <button key={a.label} onClick={a.onClick} className="flex items-center gap-2 rounded-2xl border bg-background p-3 text-left text-[13px] font-semibold hover:bg-accent">
                      <a.icon size={15} className="text-primary" />
                      <span className="truncate">{a.label}</span>
                    </button>
                  ))}
                </div>
                <Link to="/premium" className="mt-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary to-purple-600 p-3.5 text-white shadow-soft">
                  <div>
                    <div className="text-[13px] font-bold">Upgrade to Woot Premium</div>
                    <div className="text-[11px] text-white/80">Unlock analytics, boosts, and AI tools</div>
                  </div>
                  <Crown size={20} />
                </Link>
              </div>

              <div className="mt-6 rounded-3xl border bg-card p-4 shadow-soft">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Storefront Preview</div>
                <div className="grid grid-cols-3 gap-2">
                  {["1542291026-7eec264c27ff","1552346154-21d32810aba3","1600185365483-26d7a4cc7519"].map((id) => (
                    <div key={id} className="aspect-square overflow-hidden rounded-2xl">
                      <img src={`https://images.unsplash.com/photo-${id}?w=300&h=300&fit=crop&auto=format&q=80`} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-12" />
            </div>
          </div>
        </PageTransition>
      </div>
      <div className="lg:hidden">
        <BottomNav base={base} />
      </div>
    </div>
  );
}
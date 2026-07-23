import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, User, Bell, Lock, Palette, Languages, Shield, Smartphone, HardDrive, Sparkles, HelpCircle, Info, UserPlus, ChevronRight, Sun, Moon, MonitorSmartphone, AtSign, Link as LinkIcon, Copy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ME, useMe } from "@/lib/mock-data";
import { PageTransition } from "@/components/woot/PageTransition";
import { Sidebar } from "@/components/woot/Sidebar";
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";

const search = z.object({ from: z.enum(["dashboard", "customer"]).optional().catch(undefined) });

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Woot" }] }),
  validateSearch: search,
  component: SettingsPage,
});

type Item = { icon: LucideIcon; label: string; hint?: string; k: string };

const groups: { title: string; items: Item[] }[] = [
  { title: "Account", items: [
    { icon: User, label: "Profile", hint: ME.name, k: "profile" },
    { icon: AtSign, label: "Username", hint: ME.handle, k: "username" },
    { icon: LinkIcon, label: "DM Link", hint: ME.dm, k: "dm-link" },
  ]},
  { title: "Preferences", items: [
    { icon: Bell, label: "Notifications", hint: "Push, email, sound", k: "notifications" },
    { icon: Lock, label: "Privacy", hint: "Blocked, read receipts", k: "privacy" },
    { icon: Palette, label: "Appearance", hint: "Theme & display", k: "appearance" },
    { icon: Languages, label: "Language", hint: "English (US)", k: "language" },
  ]},
  { title: "Security", items: [
    { icon: Shield, label: "Security", hint: "Two-factor, passkeys", k: "security" },
    { icon: Smartphone, label: "Devices", hint: "3 active", k: "devices" },
    { icon: HardDrive, label: "Storage", hint: "1.2 GB used", k: "storage" },
    { icon: Sparkles, label: "AI Settings", hint: "Model & suggestions", k: "ai-settings" },
  ]},
  { title: "About", items: [
    { icon: HelpCircle, label: "Help", k: "help" },
    { icon: Info, label: "About Woot", k: "about" },
    { icon: UserPlus, label: "Invite Friends", k: "invite" },
  ]},
];

const allItems = groups.flatMap((g) => g.items);

function ToggleRow({ label, hint, defaultOn = false }: { label: string; hint?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
      <div>
        <div className="text-[13px] font-semibold">{label}</div>
        {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        aria-label={label}
        className="inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors"
        style={{ background: on ? "var(--primary)" : "var(--border)" }}
      >
        <motion.span layout className="h-5 w-5 rounded-full bg-white shadow-soft" style={{ marginLeft: on ? "auto" : 0 }} />
      </button>
    </div>
  );
}

function ThemePicker({ theme, onChange }: { theme: Theme; onChange: (t: Theme) => void }) {
  return (
    <div>
      <div className="text-[12px] font-semibold text-muted-foreground">Theme</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { k: "light" as const, icon: Sun, label: "Light" },
          { k: "dark" as const, icon: Moon, label: "Dark" },
          { k: "system" as const, icon: MonitorSmartphone, label: "System" },
        ].map((o) => {
          const on = theme === o.k;
          return (
            <button
              key={o.k}
              onClick={() => onChange(o.k)}
              className="flex flex-col items-center gap-1 rounded-2xl border p-3 transition"
              style={{
                background: on ? "color-mix(in oklab, var(--primary) 12%, transparent)" : "var(--background)",
                borderColor: on ? "var(--primary)" : "var(--border)",
              }}
            >
              <o.icon size={18} style={{ color: on ? "var(--primary)" : undefined }} />
              <span className="text-[12px] font-semibold">{o.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Right-pane detail content for whichever settings item is selected. Kept
 * intentionally light (mock controls, no persistence) to match the rest of
 * this demo's editable surfaces. */
function SettingDetail({ k, base, me, theme, onThemeChange }: { k: string; base: "dashboard" | "customer"; me: ReturnType<typeof useMe>; theme: Theme; onThemeChange: (t: Theme) => void }) {
  switch (k) {
    case "profile":
      return (
        <div className="space-y-4">
          <Link to="/profile" search={{ from: base }} className="flex items-center gap-3 rounded-3xl border bg-card p-4 shadow-soft hover:bg-accent/40">
            <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full text-[14px] font-black text-white" style={{ background: me.avatarUrl ? undefined : me.color }}>
              {me.avatarUrl ? <img src={me.avatarUrl} alt={me.name} className="h-full w-full object-cover" /> : me.avatar}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-bold">{me.name}</div>
              <div className="truncate text-[12px] text-muted-foreground">{me.handle} · {me.dm}</div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </Link>
          <p className="text-[13px] text-muted-foreground">Open your full profile to edit your photo, name, and storefront details.</p>
        </div>
      );
    case "username":
      return (
        <div className="max-w-sm space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Username</span>
            <input defaultValue={ME.handle} className="h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none focus:border-primary" />
          </label>
          <p className="text-[12px] text-muted-foreground">Your username is how people find and mention you across Woot.</p>
        </div>
      );
    case "dm-link":
      return (
        <div className="max-w-sm space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Your DM link</div>
          <div className="flex items-center gap-2">
            <input readOnly value={ME.dm} className="h-11 flex-1 truncate rounded-xl border bg-background px-3.5 text-sm outline-none" />
            <button onClick={() => navigator.clipboard?.writeText(ME.dm)} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border hover:bg-accent"><Copy size={15} /></button>
          </div>
          <p className="text-[12px] text-muted-foreground">Share this link so people can message you directly, no account needed.</p>
        </div>
      );
    case "notifications":
      return (
        <div className="grid max-w-md gap-3">
          <ToggleRow label="Push notifications" hint="Chats, calls, and order updates" defaultOn />
          <ToggleRow label="Email notifications" hint="Weekly summaries and receipts" />
          <ToggleRow label="Sound" hint="Play a sound for new messages" defaultOn />
        </div>
      );
    case "privacy":
      return (
        <div className="grid max-w-md gap-3">
          <ToggleRow label="Read receipts" hint="Let others see when you've read a message" defaultOn />
          <ToggleRow label="Show online status" hint="Appear as active to your contacts" defaultOn />
          <button className="rounded-2xl border bg-card p-4 text-left text-[13px] font-semibold hover:bg-accent">Manage blocked accounts</button>
        </div>
      );
    case "appearance":
      return <div className="max-w-md"><ThemePicker theme={theme} onChange={onThemeChange} /></div>;
    case "language":
      return (
        <div className="max-w-sm">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Language</span>
            <select defaultValue="en-US" className="h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none focus:border-primary">
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="pt-BR">Português (Brasil)</option>
            </select>
          </label>
        </div>
      );
    case "security":
      return (
        <div className="grid max-w-md gap-3">
          <ToggleRow label="Two-factor authentication" hint="Require a code at sign-in" />
          <button className="rounded-2xl border bg-card p-4 text-left text-[13px] font-semibold hover:bg-accent">Manage passkeys</button>
        </div>
      );
    case "devices":
      return (
        <ul className="max-w-md divide-y overflow-hidden rounded-2xl border bg-card shadow-soft">
          {[
            { name: "iPhone 15 Pro", meta: "This device · Active now" },
            { name: "MacBook Pro", meta: "San Francisco · 2h ago" },
            { name: "Chrome on Windows", meta: "Lagos · 3d ago" },
          ].map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-3 p-4">
              <div>
                <div className="text-[13px] font-semibold">{d.name}</div>
                <div className="text-[11px] text-muted-foreground">{d.meta}</div>
              </div>
              <Smartphone size={16} className="text-muted-foreground" />
            </li>
          ))}
        </ul>
      );
    case "storage":
      return (
        <div className="max-w-md space-y-2 rounded-2xl border bg-card p-4">
          <div className="flex items-center justify-between text-[13px] font-semibold">
            <span>1.2 GB used</span>
            <span className="text-muted-foreground">of 5 GB</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-accent">
            <div className="h-full rounded-full bg-primary" style={{ width: "24%" }} />
          </div>
        </div>
      );
    case "ai-settings":
      return (
        <div className="grid max-w-md gap-3">
          <ToggleRow label="Smart reply suggestions" hint="Suggested replies in chats" defaultOn />
          <label className="block rounded-2xl border bg-card p-4">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Model</span>
            <select defaultValue="balanced" className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary">
              <option value="fast">Fast</option>
              <option value="balanced">Balanced</option>
              <option value="quality">Highest quality</option>
            </select>
          </label>
        </div>
      );
    case "help":
      return <p className="max-w-md text-[13px] text-muted-foreground">Browse Woot's help center or reach out to support for anything you're stuck on.</p>;
    case "about":
      return <p className="max-w-md text-[13px] text-muted-foreground">Woot v1.0.0 — messaging and commerce, together. Terms and privacy policy links live here.</p>;
    case "invite":
      return (
        <div className="max-w-sm space-y-3">
          <p className="text-[13px] text-muted-foreground">Invite friends to Woot and share your favorite shops with them.</p>
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft">Share invite link</button>
        </div>
      );
    default:
      return null;
  }
}

function SettingsPage() {
  const nav = useNavigate();
  const { from } = Route.useSearch();
  const base: "dashboard" | "customer" = from === "customer" ? "customer" : "dashboard";
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("profile");
  const [theme, setTheme] = useState<Theme>("system");
  const me = useMe();

  useEffect(() => { setTheme(getStoredTheme()); }, []);
  const changeTheme = (t: Theme) => { setTheme(t); applyTheme(t); };

  const selectedItem = allItems.find((it) => it.k === selected) ?? allItems[0];

  return (
    <div className="flex min-h-[100dvh] w-full bg-surface lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden lg:pl-20">
      <Sidebar base={base} />
      <PageTransition>
        <div className="mx-auto min-h-[100dvh] w-full max-w-3xl bg-surface md:max-w-none lg:flex lg:h-[100dvh] lg:min-h-0 lg:max-w-none">
          {/* Mobile / tablet: single stacked list, unchanged experience */}
          <div className="lg:hidden">
            <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur-xl md:px-6">
              <button onClick={() => nav({ to: "/profile", search: { from: base } })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><ArrowLeft size={18} /></button>
              <h1 className="text-center text-[17px] font-bold">Settings</h1>
              <div className="h-10 w-10" />
            </header>

            <div className="mx-auto w-full max-w-xl px-4 pt-4">
              <Link to="/profile" search={{ from: base }} className="flex items-center gap-3 rounded-3xl border bg-card p-3 shadow-soft hover:bg-accent/40">
                <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full text-[14px] font-black text-white" style={{ background: me.avatarUrl ? undefined : me.color }}>
                  {me.avatarUrl ? <img src={me.avatarUrl} alt={me.name} className="h-full w-full object-cover" /> : me.avatar}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-bold">{ME.name}</div>
                  <div className="truncate text-[12px] text-muted-foreground">{ME.handle} · {ME.dm}</div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>

              {groups.map((g) => (
                <div key={g.title} className="mt-6">
                  <div className="px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</div>
                  <div className="mt-2 overflow-hidden rounded-3xl border bg-card shadow-soft">
                    {g.items.map((it, i) => (
                      <div key={it.label} className={i > 0 ? "border-t" : ""}>
                        <button
                          onClick={() => setOpen(open === it.k ? null : it.k)}
                          className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left hover:bg-accent/60"
                        >
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent"><it.icon size={16} className="text-primary" /></span>
                          <div className="min-w-0">
                            <div className="text-[14px] font-semibold">{it.label}</div>
                            {it.hint && <div className="truncate text-[12px] text-muted-foreground">{it.hint}</div>}
                          </div>
                          <motion.span
                            animate={{ rotate: open === it.k ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-muted-foreground"
                          >
                            <ChevronRight size={16} />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {it.k === "appearance" && open === "appearance" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="border-t bg-background/40 p-4">
                                <ThemePicker theme={theme} onChange={changeTheme} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button className="mt-6 w-full rounded-full border border-destructive/40 bg-background py-3 text-sm font-semibold text-destructive hover:bg-destructive/5">Log out</button>
              <div className="mt-4 pb-10 text-center text-[11px] text-muted-foreground">Woot · v1.0.0</div>
            </div>
          </div>

          {/* Desktop / tablet master-detail: settings menu + detail panel */}
          <div className="hidden min-h-0 flex-1 lg:flex">
            <aside className="flex w-72 shrink-0 flex-col gap-1 overflow-y-auto border-r bg-background p-3">
              <div className="px-2 pb-2 pt-1 text-[17px] font-bold">Settings</div>
              <Link to="/profile" search={{ from: base }} className="mb-2 flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-soft hover:bg-accent/40">
                <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full text-[13px] font-black text-white" style={{ background: me.avatarUrl ? undefined : me.color }}>
                  {me.avatarUrl ? <img src={me.avatarUrl} alt={me.name} className="h-full w-full object-cover" /> : me.avatar}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-bold">{me.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{me.handle}</div>
                </div>
              </Link>
              {groups.map((g) => (
                <div key={g.title} className="mb-3">
                  <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</div>
                  <nav className="flex flex-col gap-0.5">
                    {g.items.map((it) => {
                      const active = selected === it.k;
                      return (
                        <button
                          key={it.k}
                          onClick={() => setSelected(it.k)}
                          className="group relative flex items-center gap-3 rounded-2xl px-2.5 py-2 text-left text-[13px] font-semibold transition-colors"
                          style={{
                            background: active ? "color-mix(in oklab, var(--primary) 14%, transparent)" : "transparent",
                            color: active ? "var(--primary)" : "var(--foreground)",
                          }}
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl" style={{ background: active ? "var(--primary)" : "var(--accent)", color: active ? "white" : "var(--foreground)" }}>
                            <it.icon size={15} />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{it.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              ))}
              <button className="mx-2 mt-1 rounded-full border border-destructive/40 bg-background py-2.5 text-[13px] font-semibold text-destructive hover:bg-destructive/5">Log out</button>
              <div className="px-2 pb-2 pt-3 text-[11px] text-muted-foreground">Woot · v1.0.0</div>
            </aside>
            <section className="min-w-0 flex-1 overflow-y-auto">
              <div className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-6 py-4">
                <selectedItem.icon size={16} className="text-primary" />
                <div>
                  <div className="text-[15px] font-bold">{selectedItem.label}</div>
                  {selectedItem.hint && <div className="text-[12px] text-muted-foreground">{selectedItem.hint}</div>}
                </div>
              </div>
              <div className="px-6 py-6">
                <AnimatePresence mode="wait">
                  <motion.div key={selected} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                    <SettingDetail k={selected} base={base} me={me} theme={theme} onThemeChange={changeTheme} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}

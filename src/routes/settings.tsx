import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, User, Bell, Lock, Palette, Languages, Shield, Smartphone, HardDrive, Sparkles, HelpCircle, Info, UserPlus, ChevronRight, Sun, Moon, MonitorSmartphone, AtSign, Link as LinkIcon } from "lucide-react";
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

const groups: { title: string; items: { icon: LucideIcon; label: string; hint?: string; k?: string }[] }[] = [
  { title: "Account", items: [
    { icon: User, label: "Profile", hint: ME.name, k: "profile" },
    { icon: AtSign, label: "Username", hint: ME.handle },
    { icon: LinkIcon, label: "DM Link", hint: ME.dm },
  ]},
  { title: "Preferences", items: [
    { icon: Bell, label: "Notifications", hint: "Push, email, sound" },
    { icon: Lock, label: "Privacy", hint: "Blocked, read receipts" },
    { icon: Palette, label: "Appearance", hint: "Theme & display", k: "appearance" },
    { icon: Languages, label: "Language", hint: "English (US)" },
  ]},
  { title: "Security", items: [
    { icon: Shield, label: "Security", hint: "Two-factor, passkeys" },
    { icon: Smartphone, label: "Devices", hint: "3 active" },
    { icon: HardDrive, label: "Storage", hint: "1.2 GB used" },
    { icon: Sparkles, label: "AI Settings", hint: "Model & suggestions" },
  ]},
  { title: "About", items: [
    { icon: HelpCircle, label: "Help" },
    { icon: Info, label: "About Woot" },
    { icon: UserPlus, label: "Invite Friends" },
  ]},
];

function SettingsPage() {
  const nav = useNavigate();
  const { from } = Route.useSearch();
  const base: "dashboard" | "customer" = from === "customer" ? "customer" : "dashboard";
  const [open, setOpen] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("system");
  const me = useMe();

  useEffect(() => { setTheme(getStoredTheme()); }, []);
  const changeTheme = (t: Theme) => { setTheme(t); applyTheme(t); };

  return (
    <div className="flex min-h-[100dvh] w-full bg-surface md:h-[100dvh] md:min-h-0 md:overflow-hidden md:pl-20">
      <Sidebar base={base} />
      <PageTransition>
        <div className="mx-auto min-h-[100dvh] w-full max-w-3xl bg-surface md:h-[100dvh] md:min-h-0 md:overflow-y-auto">
          <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur-xl md:px-6 lg:bg-background lg:backdrop-blur-none">
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
                        onClick={() => it.k && setOpen(open === it.k ? null : it.k)}
                        className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left hover:bg-accent/60"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent"><it.icon size={16} className="text-primary" /></span>
                        <div className="min-w-0">
                          <div className="text-[14px] font-semibold">{it.label}</div>
                          {it.hint && <div className="truncate text-[12px] text-muted-foreground">{it.hint}</div>}
                        </div>
                        <motion.span
                          animate={{ rotate: it.k && open === it.k ? 90 : 0 }}
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
                                      onClick={() => changeTheme(o.k)}
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
      </PageTransition>
    </div>
  );
}
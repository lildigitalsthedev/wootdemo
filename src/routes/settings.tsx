import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Bell, Lock, Palette, Languages, Shield, Smartphone, HardDrive, Sparkles, HelpCircle, Info, UserPlus, ChevronRight, Sun, Moon, MonitorSmartphone, AtSign, Link as LinkIcon } from "lucide-react";
import { ME } from "@/lib/mock-data";
import { PageTransition } from "@/components/woot/PageTransition";
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Woot" }] }),
  component: SettingsPage,
});

const groups: { title: string; items: { icon: any; label: string; hint?: string; k?: string }[] }[] = [
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
  const [open, setOpen] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => { setTheme(getStoredTheme()); }, []);
  const changeTheme = (t: Theme) => { setTheme(t); applyTheme(t); };

  return (
    <PageTransition>
      <div className="mx-auto min-h-[100dvh] max-w-3xl bg-surface">
        <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-background/85 px-3 py-3 backdrop-blur-xl">
          <button onClick={() => nav({ to: "/profile" })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><ArrowLeft size={18} /></button>
          <h1 className="text-[17px] font-bold">Settings</h1>
          <div />
        </header>

        <div className="px-4 pt-4">
          <Link to="/profile" className="flex items-center gap-3 rounded-3xl border bg-card p-3 shadow-soft hover:bg-accent/40">
            <span className="grid h-14 w-14 place-items-center rounded-full text-[14px] font-black text-white" style={{ background: ME.color }}>{ME.avatar}</span>
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
                  <button key={it.label} onClick={() => it.k && setOpen(open === it.k ? null : it.k)}
                    className={"grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left hover:bg-accent/60 " + (i > 0 ? "border-t" : "")}>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent"><it.icon size={16} className="text-primary" /></span>
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold">{it.label}</div>
                      {it.hint && <div className="truncate text-[12px] text-muted-foreground">{it.hint}</div>}
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          <AnimatePresence>
            {open === "appearance" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="mt-4 rounded-3xl border bg-card p-4 shadow-soft">
                <div className="text-[13px] font-semibold">Theme</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { k: "light" as const, icon: Sun, label: "Light" },
                    { k: "dark" as const, icon: Moon, label: "Dark" },
                    { k: "system" as const, icon: MonitorSmartphone, label: "System" },
                  ].map((o) => {
                    const on = theme === o.k;
                    return (
                      <button key={o.k} onClick={() => changeTheme(o.k)}
                        className="flex flex-col items-center gap-1 rounded-2xl border p-3 transition"
                        style={{ background: on ? "color-mix(in oklab, var(--primary) 12%, transparent)" : "var(--background)", borderColor: on ? "var(--primary)" : "var(--border)" }}>
                        <o.icon size={18} style={{ color: on ? "var(--primary)" : undefined }} />
                        <span className="text-[12px] font-semibold">{o.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="mt-6 w-full rounded-full border border-destructive/40 bg-background py-3 text-sm font-semibold text-destructive hover:bg-destructive/5">Log out</button>
          <div className="mt-4 pb-10 text-center text-[11px] text-muted-foreground">Woot · v1.0.0</div>
        </div>
      </div>
    </PageTransition>
  );
}
import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Sparkles, Phone, Store, User } from "lucide-react";
import { motion } from "motion/react";
import { WootLogo } from "./Logo";

export function Sidebar({ base }: { base: "dashboard" | "customer" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: `/${base}/chats`, label: "Chats", icon: MessageCircle },
    { to: `/${base}/stories`, label: "Stories", icon: Sparkles },
    { to: `/${base}/calls`, label: "Calls", icon: Phone },
    { to: `/${base}/shop`, label: "Shop", icon: Store },
    { to: `/profile`, label: "Profile", icon: User },
  ] as const;

  return (
    <nav
      aria-label="Primary"
      className="hidden h-full w-[220px] shrink-0 flex-col border-r bg-background/60 px-3 py-5 md:flex"
    >
      <div className="px-2 pb-6">
        <WootLogo size={22} />
      </div>
      <div className="flex flex-col gap-1">
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold"
              style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-nav-pill"
                  className="absolute inset-0 -z-0 rounded-xl"
                  style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 grid place-items-center">
                <Icon size={19} strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className="relative z-10">{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
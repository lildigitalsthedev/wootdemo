import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Sparkles, Phone, Store, User } from "lucide-react";
import { motion } from "motion/react";

export function BottomNav({ base }: { base: "dashboard" | "customer" }) {
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
      className="fixed inset-x-0 bottom-0 z-30 pointer-events-none flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] px-3"
      aria-label="Primary"
    >
      <div
        className="pointer-events-auto flex items-stretch gap-1 rounded-full border px-2 py-2 shadow-card"
        style={{
          background: "color-mix(in oklab, var(--background) 55%, transparent)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderColor: "color-mix(in oklab, var(--foreground) 10%, transparent)",
        }}
      >
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="group relative flex min-w-[54px] flex-col items-center gap-0.5 rounded-full px-2 py-1.5 sm:min-w-[68px]"
              style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
            >
              {active && (
                <motion.span
                  layoutId="bottom-nav-pill"
                  className="absolute inset-0 -z-0 rounded-full"
                  style={{ background: "color-mix(in oklab, var(--primary) 16%, transparent)" }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <motion.span
                className="relative z-10"
                animate={{ scale: active ? 1.08 : 1, y: active ? -1 : 0 }}
                transition={{ type: "spring", stiffness: 480, damping: 26 }}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 2} />
              </motion.span>
              <motion.span
                className="relative z-10 text-[10.5px] font-semibold leading-tight"
                animate={{ opacity: active ? 1 : 0.85 }}
                transition={{ duration: 0.2 }}
              >
                {it.label}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Phone, Store } from "lucide-react";
import { motion } from "motion/react";
import { StoriesIcon } from "@/components/StoriesIcon";
import { NavAvatar } from "./NavAvatar";

export function BottomNav({ base }: { base: "dashboard" | "customer" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: `/${base}/chats`, label: "Chats", icon: MessageCircle, kind: "lucide" as const },
    { to: `/${base}/stories`, label: "Stories", icon: MessageCircle, kind: "stories" as const },
    { to: `/${base}/calls`, label: "Calls", icon: Phone, kind: "lucide" as const },
    { to: `/${base}/shop`, label: "Shop", icon: Store, kind: "lucide" as const },
    { to: `/profile`, label: "Profile", icon: MessageCircle, kind: "profile" as const, search: { from: base } },
  ] as const;
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 pointer-events-none flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] px-3"
      aria-label="Primary"
    >
      <div
        className="pointer-events-auto flex items-stretch gap-1.5 rounded-full border px-3 py-2 shadow-card sm:gap-2 sm:px-3.5"
        style={{
          background: "color-mix(in oklab, var(--background) 55%, transparent)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderColor: "color-mix(in oklab, var(--foreground) 10%, transparent)",
        }}
      >
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              search={"search" in it ? it.search : undefined}
              className="group relative flex min-w-[62px] flex-col items-center justify-center gap-1 rounded-full px-2.5 py-2 tap-highlight-transparent select-none sm:min-w-[72px]"
              style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
            >
              {active && (
                <motion.span
                  layoutId="bottom-nav-pill"
                  className="absolute inset-0 -z-0 rounded-full"
                  style={{
                    background:
                      "color-mix(in oklab, var(--primary) 14%, transparent)",
                    boxShadow:
                      "inset 0 0 0 1px color-mix(in oklab, var(--primary) 22%, transparent)",
                  }}
                  transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.7 }}
                />
              )}
              <motion.span
                className="relative z-10 flex h-6 items-center justify-center"
                animate={{ scale: active ? 1.06 : 1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.6 }}
              >
                {it.kind === "profile" ? (
                  <NavAvatar size={18} active={active} />
                ) : it.kind === "stories" ? (
                  <StoriesIcon size={20} hasStories active={active} />
                ) : (
                  <it.icon size={20} strokeWidth={active ? 2.4 : 2} />
                )}
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
import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Sparkles, Phone, Store, User } from "lucide-react";

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
              className="group flex min-w-[54px] flex-col items-center gap-0.5 rounded-full px-2 py-1.5 transition-all sm:min-w-[68px]"
              style={{
                background: active ? "color-mix(in oklab, var(--primary) 16%, transparent)" : "transparent",
                color: active ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 2} />
              <span className="text-[10.5px] font-semibold leading-tight">{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
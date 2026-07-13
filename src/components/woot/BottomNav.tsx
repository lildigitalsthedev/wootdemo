import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Sparkles, Phone, Store } from "lucide-react";

export function BottomNav({ base }: { base: "dashboard" | "customer" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: `/${base}/chats`, label: "Chats", icon: MessageCircle },
    { to: `/${base}/stories`, label: "Stories", icon: Sparkles },
    { to: `/${base}/calls`, label: "Calls", icon: Phone },
    { to: `/${base}/shop`, label: "Shop", icon: Store },
  ] as const;
  return (
    <nav className="sticky bottom-0 z-30 border-t bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-stretch justify-between px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          const Icon = it.icon;
          return (
            <Link key={it.to} to={it.to} className="group flex flex-1 flex-col items-center gap-1 py-1.5">
              <span
                className="grid h-9 w-14 place-items-center rounded-2xl transition-all"
                style={{
                  background: active ? "color-mix(in oklab, var(--primary) 14%, transparent)" : "transparent",
                  color: active ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className="text-[11px] font-medium" style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}>
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Sparkles, Phone, Store, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { WootLogo } from "./Logo";

const NAV_ITEMS = (base: "dashboard" | "customer") => [
  { to: `/${base}/chats`, label: "Chats", icon: MessageCircle },
  { to: `/${base}/stories`, label: "Stories", icon: Sparkles },
  { to: `/${base}/calls`, label: "Calls", icon: Phone },
  { to: `/${base}/shop`, label: "Shop", icon: Store },
] as const;

const PROFILE_ITEM = { label: "Profile", icon: User } as const;

/** Width reserved in page layouts for the collapsed rail (icons-only). Kept in sync
 * with the `w-20` class below — if that changes, update the `md:pl-20` usages too. */
export const SIDEBAR_COLLAPSED_WIDTH = 80;

export function Sidebar({ base }: { base: "dashboard" | "customer" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [expanded, setExpanded] = useState(false);
  const items = NAV_ITEMS(base);

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  return (
    <motion.nav
      aria-label="Primary"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      initial={false}
      animate={{ width: expanded ? 232 : SIDEBAR_COLLAPSED_WIDTH }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      className="fixed inset-y-0 left-0 z-[35] hidden flex-col overflow-hidden border-r py-5 md:flex"
      style={{
        background: "color-mix(in oklab, var(--background) 72%, transparent)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderColor: "color-mix(in oklab, var(--foreground) 8%, transparent)",
      }}
    >
      <div className="flex items-center px-[15px] pb-6">
        {expanded ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
            <WootLogo size={20} />
          </motion.div>
        ) : (
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-2xl"
            style={{ background: "var(--primary)", color: "white", boxShadow: "0 8px 20px -8px color-mix(in oklab, var(--primary) 60%, transparent)" }}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 6l3 12 3-8 3 8 3-12 3 12 3-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3">
        {items.map((it) => (
          <NavRow key={it.to} to={it.to} label={it.label} Icon={it.icon} active={isActive(it.to)} expanded={expanded} />
        ))}
      </div>

      <div className="mt-auto border-t px-3 pt-3" style={{ borderColor: "color-mix(in oklab, var(--foreground) 8%, transparent)" }}>
        <NavRow to="/profile" search={{ from: base }} label={PROFILE_ITEM.label} Icon={PROFILE_ITEM.icon} active={isActive("/profile")} expanded={expanded} />
      </div>
    </motion.nav>
  );
}

function NavRow({
  to, search, label, Icon, active, expanded,
}: {
  to: string; search?: Record<string, string>; label: string; Icon: typeof MessageCircle; active: boolean; expanded: boolean;
}) {
  return (
    <Link
      to={to}
      search={search}
      className="group relative flex h-12 items-center gap-3 rounded-2xl px-[15px] text-[14px] font-semibold"
      style={{ color: active ? "var(--primary)" : "var(--muted-foreground)" }}
    >
      {active && (
        <motion.span
          layoutId="sidebar-nav-pill"
          className="absolute inset-0 -z-0 rounded-2xl"
          style={{ background: "color-mix(in oklab, var(--primary) 14%, transparent)" }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative z-10 grid h-5 w-5 shrink-0 place-items-center">
        <Icon size={19} strokeWidth={active ? 2.4 : 2} />
      </span>
      <AnimatePresence>
        {expanded && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  MessageCircle, Sparkles, Phone, Store, User, Plus, Users, Megaphone, ListPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { WootLogo } from "./Logo";

const NAV_ITEMS = (base: "dashboard" | "customer") => [
  { to: `/${base}/chats`, label: "Chats", icon: MessageCircle },
  { to: `/${base}/stories`, label: "Stories", icon: Sparkles },
  { to: `/${base}/calls`, label: "Calls", icon: Phone },
  { to: `/${base}/shop`, label: "Shop", icon: Store },
] as const;

/** Width reserved in page layouts for the collapsed rail (icons-only). Kept in sync
 *  with the `w-20` class below — if that changes, update the `lg:pl-20` usages too. */
export const SIDEBAR_COLLAPSED_WIDTH = 80;

type NewChatKind = "chat" | "group" | "broadcast" | "list";

const NEW_CHAT_ACTIONS: {
  kind: NewChatKind; label: string; icon: LucideIcon; tint?: string;
}[] = [
  { kind: "chat", label: "New Chat", icon: MessageCircle },
  { kind: "group", label: "New Group", icon: Users, tint: "#7c3aed" },
  { kind: "broadcast", label: "New Broadcast", icon: Megaphone, tint: "#f97316" },
  { kind: "list", label: "New List", icon: ListPlus, tint: "#15803d" },
];

export function Sidebar({ base }: { base: "dashboard" | "customer" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [newChatOpen, setNewChatOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const items = NAV_ITEMS(base);

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  useEffect(() => {
    if (!newChatOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) setNewChatOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [newChatOpen]);

  const triggerNewChat = (kind: NewChatKind) => {
    const dispatch = () =>
      window.dispatchEvent(new CustomEvent("woot:new-chat", { detail: { kind } }));
    const chatsPath = `/${base}/chats` as const;
    setNewChatOpen(false);
    if (!pathname.startsWith(chatsPath)) {
      // Navigate to the Chats screen first, then open the modal once mounted.
      void navigate({ to: chatsPath }).then(() => setTimeout(dispatch, 30));
    } else {
      setTimeout(dispatch, 0);
    }
  };

  return (
    <motion.nav
      aria-label="Primary"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); setNewChatOpen(false); }}
      initial={false}
      animate={{ width: expanded ? 232 : SIDEBAR_COLLAPSED_WIDTH }}
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      className="fixed inset-y-0 left-0 z-40 hidden flex-col overflow-visible border-r bg-background py-5 lg:flex"
      style={{ borderColor: "color-mix(in oklab, var(--foreground) 8%, transparent)" }}
    >
      <div className="flex items-center px-[15px] pb-6">
        {expanded ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
            <WootLogo size={20} />
          </motion.div>
        ) : (
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-2xl"
            style={{
              background: "var(--primary)",
              color: "white",
              boxShadow: "0 8px 20px -8px color-mix(in oklab, var(--primary) 60%, transparent)",
            }}
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

      <div
        ref={popoverRef}
        className="relative mt-auto border-t px-3 pt-3"
        style={{ borderColor: "color-mix(in oklab, var(--foreground) 8%, transparent)" }}
      >
        <button
          type="button"
          onClick={() => setNewChatOpen((v) => !v)}
          aria-label="New chat"
          aria-expanded={newChatOpen}
          className="relative mb-1 flex h-12 w-full items-center gap-3 overflow-hidden rounded-2xl px-[15px] text-[14px] font-semibold shadow-sm transition-transform active:scale-[0.98]"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <span className="grid h-5 w-5 shrink-0 place-items-center">
            <Plus size={20} strokeWidth={2.6} />
          </span>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap"
              >
                New Chat
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <NavRow
          to="/profile"
          search={{ from: base }}
          label="Profile"
          Icon={User}
          active={isActive("/profile")}
          expanded={expanded}
        />

        <AnimatePresence>
          {newChatOpen && (
            <motion.div
              initial={{ opacity: 0, x: -8, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="absolute bottom-16 left-full z-50 ml-3 w-56 overflow-hidden rounded-2xl border bg-background p-1.5 shadow-card"
              style={{ borderColor: "color-mix(in oklab, var(--foreground) 8%, transparent)" }}
            >
              {NEW_CHAT_ACTIONS.map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.kind}
                    onClick={() => triggerNewChat(a.kind)}
                    className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-[13px] font-semibold hover:bg-accent"
                  >
                    <span
                      className="grid h-8 w-8 place-items-center rounded-full text-white"
                      style={{ background: a.tint ?? "var(--primary)" }}
                    >
                      <Icon size={14} />
                    </span>
                    <span>{a.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function NavRow({
  to, search, label, Icon, active, expanded,
}: {
  to: string; search?: Record<string, string>; label: string; Icon: LucideIcon; active: boolean; expanded: boolean;
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
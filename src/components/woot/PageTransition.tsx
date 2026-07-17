import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

// Order of the primary tabs, used only to decide slide direction (left vs
// right) when moving between them. Anything not in this list (chat detail,
// settings, premium, business profile, etc.) just fades in place — sliding
// only makes sense for lateral moves between sibling tabs.
const TAB_ORDER = ["chats", "stories", "calls", "shop", "profile"] as const;

function tabIndexFromPath(pathname: string): number {
  for (let i = 0; i < TAB_ORDER.length; i++) {
    if (pathname.includes(`/${TAB_ORDER[i]}`)) return i;
  }
  return -1;
}

/**
 * Lightweight, GPU-only horizontal slide between primary tabs (Telegram-style).
 * Uses transform + opacity exclusively — no layout, no blur, no scale — so it
 * stays smooth even on low-end devices. Falls back to a plain fade for
 * non-tab pages or when the user prefers reduced motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduceMotion = useReducedMotion();
  const prevIndexRef = useRef<number>(tabIndexFromPath(pathname));

  const currentIndex = tabIndexFromPath(pathname);
  const prevIndex = prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const isTabToTab = currentIndex !== -1 && prevIndex !== -1 && currentIndex !== prevIndex;
  const direction = isTabToTab ? (currentIndex > prevIndex ? 1 : -1) : 0;

  if (reduceMotion) {
    return <div className="w-full min-w-0 flex-1">{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: direction * 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="w-full min-w-0 flex-1"
    >
      {children}
    </motion.div>
  );
}
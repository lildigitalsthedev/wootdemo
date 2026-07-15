import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";

export type FabAction = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  tint?: string;
};

export function Fab({ actions }: { actions: FabAction[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-x-0 bottom-24 z-40 mx-auto max-w-3xl px-4">
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        <AnimatePresence>
          {open &&
            actions.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.button
                  key={a.label}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.18, delay: i * 0.03 }}
                  onClick={() => {
                    a.onClick();
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-full border bg-background/95 py-2 pl-4 pr-2 text-[13px] font-semibold shadow-card backdrop-blur-xl"
                >
                  <span>{a.label}</span>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-white"
                    style={{ background: a.tint ?? "var(--primary)" }}
                  >
                    <Icon size={16} />
                  </span>
                </motion.button>
              );
            })}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.92 }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen((v) => !v)}
          className="grid h-14 w-14 place-items-center rounded-full text-primary-foreground shadow-card"
          style={{ background: "var(--primary)" }}
          aria-label="Actions"
        >
          <Plus size={22} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
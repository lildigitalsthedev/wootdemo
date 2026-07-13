import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function RotatingPlaceholder({ items, interval = 2200, prefix = "" }: { items: string[]; interval?: number; prefix?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  return (
    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center overflow-hidden text-muted-foreground">
      {prefix}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="whitespace-nowrap"
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
import { motion } from "motion/react";

export function WootLogo({ size = 28, mono = false }: { size?: number; mono?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="grid place-items-center rounded-2xl"
        style={{
          width: size + 12,
          height: size + 12,
          background: mono ? "transparent" : "var(--primary)",
          color: mono ? "var(--foreground)" : "white",
          boxShadow: mono ? "none" : "0 8px 20px -8px color-mix(in oklab, var(--primary) 60%, transparent)",
        }}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 6l3 12 3-8 3 8 3-12 3 12 3-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <span className="text-[22px] font-black tracking-tight">Woot<span style={{ color: "var(--primary)" }}>.</span></span>
    </div>
  );
}

export function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${className}`}
      style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary)" }}>
      <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M10 1l2.39 2.05 3.11-.32 1.05 2.96 2.72 1.55-.75 3.03L20 12.5l-2.48 1.83.75 3.03-2.72 1.55-1.05 2.96-3.11-.32L10 19l-2.39 2.05-3.11-.32-1.05-2.96L.73 16.22l.75-3.03L-1 12.5l2.48-1.73-.75-3.03 2.72-1.55L4.5.73l3.11.32L10 1z"/>
      </svg>
      Verified
    </span>
  );
}
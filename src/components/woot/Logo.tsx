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
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      aria-label="Verified"
      title="Verified"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 1.5l2.09 1.79 2.74-.32 1.13 2.51 2.51 1.13-.32 2.74L22 12l-1.85 2.09.32 2.74-2.51 1.13-1.13 2.51-2.74-.32L12 22.5l-2.09-1.79-2.74.32-1.13-2.51L3.53 17.4l.32-2.74L2 12l1.85-2.09-.32-2.74L6.04 6.04l1.13-2.51 2.74.32L12 1.5z"
          fill="#2F6BFF"
        />
        <path
          d="M8 12.2l2.6 2.6L16 9.4"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Broken/dashed circular ring used to indicate "has stories" — the same
 * visual language as Telegram / Instagram / WhatsApp story avatars.
 *
 * Two usage modes:
 *  1. Standalone icon (no children) — used in nav bars.
 *  2. Wrapping an avatar (children) — used around profile pictures.
 */
export function StoryRing({
  size = 24,
  hasStories = true,
  seen = false,
  active = false,
  strokeWidth = 2.25,
  segments = 4,
  gapDeg = 14,
  className,
  children,
}: {
  size?: number;
  hasStories?: boolean;
  seen?: boolean;
  active?: boolean;
  strokeWidth?: number;
  segments?: number;
  gapDeg?: number;
  className?: string;
  children?: ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gapLen = (gapDeg / 360) * circumference;
  const segLen = circumference / segments - gapLen;
  const strokeDasharray = `${Math.max(segLen, 1)} ${gapLen}`;

  const ringColor = !hasStories
    ? "color-mix(in oklab, var(--muted-foreground) 40%, transparent)"
    : seen
      ? "var(--border)"
      : undefined; // undefined -> gradient stroke below

  const gradientId = `story-ring-gradient-${useId()}`;

  const ring = (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={cn("shrink-0 -rotate-90", className)}
      aria-hidden="true"
    >
      {!ringColor && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2F6BFF" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      )}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={ringColor ?? `url(#${gradientId})`}
        strokeWidth={active ? strokeWidth + 0.75 : strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
        className="transition-all duration-200"
      />
    </svg>
  );

  if (!children) return ring;

  return (
    <span className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <span className="absolute inset-0">{ring}</span>
      <span
        className="overflow-hidden rounded-full"
        style={{ width: size - strokeWidth * 3.2, height: size - strokeWidth * 3.2 }}
      >
        {children}
      </span>
    </span>
  );
}
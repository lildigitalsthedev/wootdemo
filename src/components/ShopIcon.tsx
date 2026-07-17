/**
 * Custom storefront icon (replaces lucide-react's `Store`).
 *
 * Built as separate roof / body pieces so the active (selected) nav state
 * can fill just the roof/awning, while the door and window lacing stay
 * outlined — instead of the whole glyph turning into a solid block.
 */
export function ShopIcon({
  size = 20,
  active = false,
  strokeWidth = 2,
  className,
}: {
  size?: number;
  active?: boolean;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? strokeWidth + 0.15 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Roof / awning — the only part that fills when active */}
      <path
        d="M3 9.5 L4.3 4.2 A1 1 0 0 1 5.27 3.5 H18.73 A1 1 0 0 1 19.7 4.2 L21 9.5 Z"
        fill={active ? "currentColor" : "none"}
        className="transition-colors duration-150"
      />
      {/* Roof scallop detail lines */}
      <path d="M3 9.5 A3 2.6 0 0 0 9 9.5" />
      <path d="M9 9.5 A3 2.6 0 0 0 15 9.5" />
      <path d="M15 9.5 A3 2.6 0 0 0 21 9.5" />

      {/* Body — always outlined only, never filled */}
      <path d="M4.5 9.7 V19 A1 1 0 0 0 5.5 20 H18.5 A1 1 0 0 0 19.5 19 V9.7" />

      {/* Door */}
      <path d="M9.5 20 V15.5 A1 1 0 0 1 10.5 14.5 H13.5 A1 1 0 0 1 14.5 15.5 V20" />

      {/* Window lacing (small side window on the storefront base) */}
      <rect x="6.2" y="15.8" width="2.1" height="2.1" rx="0.3" />
    </svg>
  );
}

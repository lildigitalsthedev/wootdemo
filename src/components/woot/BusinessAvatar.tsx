import type { Business } from "@/lib/mock-data";

export function BusinessAvatar({ b, size = 44, rounded = "rounded-2xl" }: { b: Business; size?: number; rounded?: string }) {
  return (
    <div
      className={`grid place-items-center shrink-0 ${rounded}`}
      style={{ width: size, height: size, background: b.color, color: "white", fontSize: size * 0.5 }}
      aria-label={b.name}
    >
      <span>{b.logo}</span>
    </div>
  );
}
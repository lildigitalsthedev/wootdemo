import type { CountryInfo } from "@/lib/countries";

/**
 * Renders a small icon representing a country:
 *  1. If the country has a known outline path, render it as an SVG silhouette.
 *  2. Otherwise, fall back to the country's flag emoji.
 *  3. If neither is available, fall back to a generic globe silhouette.
 */
export function CountryIcon({ country, size = 14 }: { country: CountryInfo; size?: number }) {
  if (country.outline) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d={country.outline} />
      </svg>
    );
  }

  if (country.flag) {
    return (
      <span
        role="img"
        aria-label={`${country.name} flag`}
        style={{ fontSize: size, lineHeight: 1 }}
        className="shrink-0"
      >
        {country.flag}
      </span>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
    </svg>
  );
}

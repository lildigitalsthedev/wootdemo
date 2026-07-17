import { useEffect, useState } from "react";

/**
 * Lightweight country metadata used by the search-scope selector.
 * Each entry includes:
 *  - name: display name shown in the UI (e.g. "Nigeria")
 *  - flag: emoji flag, used as a graceful fallback icon
 *  - outline: a simplified SVG path (viewBox 0 0 100 100) approximating the
 *    country's silhouette, used as the primary icon when available.
 *
 * This is intentionally a small, hand-picked set of simplified outlines for
 * common countries rather than a full geo-data dependency. If a detected
 * country isn't in this set, the UI falls back to the flag emoji, and if
 * even that isn't available, to a generic globe silhouette.
 */
export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  outline?: string;
}

export const COUNTRIES: Record<string, CountryInfo> = {
  NG: {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    outline:
      "M28 12 L62 10 L78 22 L82 34 L74 40 L76 52 L66 60 L64 74 L54 88 L44 86 L40 72 L28 66 L22 52 L30 44 L24 30 Z",
  },
  GH: {
    code: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    outline:
      "M38 10 L60 12 L70 22 L68 36 L74 46 L70 60 L60 72 L58 88 L46 90 L40 76 L30 68 L28 52 L34 40 L28 26 Z",
  },
  KE: {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    outline:
      "M34 8 L64 14 L80 30 L78 46 L86 58 L72 70 L58 92 L44 84 L40 68 L26 58 L22 40 L30 26 Z",
  },
  ZA: {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    outline:
      "M16 40 L34 22 L54 16 L74 22 L88 36 L86 54 L72 66 L60 76 L44 78 L28 68 L18 54 Z",
  },
  US: {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    outline:
      "M6 30 L20 20 L36 22 L44 16 L58 18 L70 24 L86 26 L94 34 L92 44 L80 48 L82 58 L70 62 L64 74 L52 76 L46 66 L34 64 L24 54 L12 48 L8 38 Z",
  },
  CA: {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    outline:
      "M4 24 L18 14 L34 18 L48 10 L64 14 L80 10 L94 20 L92 32 L98 42 L86 50 L88 60 L74 58 L66 68 L52 62 L40 66 L28 58 L16 60 L10 48 L18 40 L8 34 Z",
  },
  GB: {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    outline:
      "M42 6 L54 10 L58 22 L68 26 L66 36 L58 40 L62 50 L54 62 L58 74 L48 88 L42 78 L46 64 L38 56 L40 44 L32 34 L38 24 L36 14 Z",
  },
  IN: {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    outline:
      "M32 6 L52 4 L60 14 L58 24 L68 28 L74 40 L70 52 L74 62 L64 70 L58 86 L50 90 L46 74 L36 66 L38 52 L28 44 L30 30 L24 20 Z",
  },
  AU: {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    outline:
      "M10 36 L24 20 L44 14 L64 18 L82 24 L92 38 L88 52 L94 62 L80 66 L70 60 L58 66 L46 62 L34 68 L20 60 L12 48 Z",
  },
  DE: {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    outline:
      "M34 8 L56 6 L64 16 L60 26 L70 34 L66 46 L72 58 L60 68 L58 80 L46 90 L40 78 L44 64 L34 56 L36 42 L28 30 L32 18 Z",
  },
  FR: {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    outline:
      "M40 6 L58 10 L62 22 L72 26 L70 38 L78 48 L68 58 L66 72 L54 82 L48 70 L36 68 L30 56 L34 44 L26 32 L32 18 Z",
  },
  BR: {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    outline:
      "M30 8 L54 6 L70 14 L82 26 L84 42 L76 54 L78 66 L66 76 L58 90 L46 86 L44 72 L32 66 L26 52 L18 40 L24 26 L20 16 Z",
  },
  MX: {
    code: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    outline:
      "M8 22 L26 16 L40 24 L56 18 L74 22 L88 30 L82 42 L68 46 L60 58 L50 72 L42 68 L40 54 L26 48 L14 38 L18 28 Z",
  },
  EG: {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    outline: "M20 12 L78 12 L78 70 L58 88 L38 88 L20 70 Z",
  },
  ZM: { code: "ZM", name: "Zambia", flag: "🇿🇲" },
  UG: { code: "UG", name: "Uganda", flag: "🇺🇬" },
  TZ: { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  ET: { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  RW: { code: "RW", name: "Rwanda", flag: "🇷🇼" },
  SN: { code: "SN", name: "Senegal", flag: "🇸🇳" },
  CI: { code: "CI", name: "Ivory Coast", flag: "🇨🇮" },
  CM: { code: "CM", name: "Cameroon", flag: "🇨🇲" },
  ES: { code: "ES", name: "Spain", flag: "🇪🇸" },
  IT: { code: "IT", name: "Italy", flag: "🇮🇹" },
  NL: { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  IE: { code: "IE", name: "Ireland", flag: "🇮🇪" },
  PT: { code: "PT", name: "Portugal", flag: "🇵🇹" },
  JP: { code: "JP", name: "Japan", flag: "🇯🇵" },
  CN: { code: "CN", name: "China", flag: "🇨🇳" },
  AE: { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  SA: { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  PK: { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  PH: { code: "PH", name: "Philippines", flag: "🇵🇭" },
  ID: { code: "ID", name: "Indonesia", flag: "🇮🇩" },
};

export const DEFAULT_COUNTRY: CountryInfo = COUNTRIES.US;

/**
 * Detects the user's country using the browser Geolocation API plus a
 * key-less reverse-geocoding lookup. Falls back gracefully:
 *  - if geolocation is unavailable/denied, or the lookup fails, we fall
 *    back to DEFAULT_COUNTRY so the UI always has something sensible to show.
 * The result updates dynamically if the detected country changes (e.g. the
 * lookup resolves after mount, or a later call detects a different country).
 */
export function useUserCountry(): { country: CountryInfo; loading: boolean } {
  const [country, setCountry] = useState<CountryInfo>(DEFAULT_COUNTRY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function resolveFromCoords(lat: number, lon: number) {
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        if (!res.ok) throw new Error("reverse geocode failed");
        const data: { countryCode?: string; countryName?: string } = await res.json();
        if (cancelled) return;
        const code = data.countryCode?.toUpperCase();
        if (code && COUNTRIES[code]) {
          setCountry(COUNTRIES[code]);
        } else if (code && data.countryName) {
          setCountry({ code, name: data.countryName, flag: "🌐" });
        }
      } catch {
        // Network or API failure: keep the current fallback country.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolveFromCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        if (!cancelled) setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return { country, loading };
}

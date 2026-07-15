export type Theme = "light" | "dark" | "system";

export function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const isDark = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", isDark);
  try { localStorage.setItem("woot-theme", t); } catch {}
}

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try { return (localStorage.getItem("woot-theme") as Theme) || "system"; } catch { return "system"; }
}
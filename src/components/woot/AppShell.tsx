import { Link } from "@tanstack/react-router";
import { Bell, Search, User } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({
  title,
  base,
  children,
  right,
  hideProfile = false,
}: {
  title: string;
  base: "dashboard" | "customer";
  children: ReactNode;
  right?: ReactNode;
  hideProfile?: boolean;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col bg-background">
      <header className="sticky top-0 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur-xl">
        <div className="min-w-0">
          <h1 className="truncate text-[22px] font-black tracking-tight">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {right}
          <Link to="/search" className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-accent">
            <Search size={18} />
          </Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-accent">
            <Bell size={18} />
          </button>
          {!hideProfile && (
            <Link
              to={base === "customer" ? "/customer/convert" : "/dashboard/shop"}
              className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft"
              aria-label="Profile"
            >
              <User size={18} />
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
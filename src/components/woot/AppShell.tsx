import { Link } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
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
  void base;
  void hideProfile;
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col bg-background md:max-w-4xl lg:max-w-6xl">
      <header className="sticky top-0 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b bg-background/85 px-4 py-3 backdrop-blur-xl md:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-[22px] font-black tracking-tight md:text-3xl">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {right}
          <Link to="/search" className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-accent">
            <Search size={18} />
          </Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-accent">
            <Bell size={18} />
          </button>
        </div>
      </header>
      <main className="flex-1 md:px-4">{children}</main>
    </div>
  );
}
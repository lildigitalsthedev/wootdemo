import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/woot/BottomNav";
import { Sidebar } from "@/components/woot/Sidebar";

export const Route = createFileRoute("/customer")({
  head: () => ({ meta: [{ title: "Woot" }] }),
  component: () => (
    <div className="flex min-h-[100dvh] w-full bg-surface md:h-[100dvh] md:min-h-0 md:overflow-hidden">
      <Sidebar base="customer" />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col pb-28 md:max-w-none md:min-h-0 md:pb-0">
        <Outlet />
      </div>
      <div className="md:hidden">
        <BottomNav base="customer" />
      </div>
    </div>
  ),
});
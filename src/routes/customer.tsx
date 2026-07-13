import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/woot/BottomNav";

export const Route = createFileRoute("/customer")({
  head: () => ({ meta: [{ title: "Woot" }] }),
  component: () => (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col bg-surface">
      <div className="flex-1"><Outlet /></div>
      <BottomNav base="customer" />
    </div>
  ),
});
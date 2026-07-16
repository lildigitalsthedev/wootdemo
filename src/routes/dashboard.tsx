import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/woot/BottomNav";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Business Dashboard — Woot" }] }),
  component: () => (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col bg-surface md:max-w-4xl lg:max-w-6xl">
      <div className="flex-1 pb-28"><Outlet /></div>
      <BottomNav base="dashboard" />
    </div>
  ),
});
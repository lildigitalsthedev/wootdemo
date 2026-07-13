import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/woot/AppShell";
import { CallsView } from "@/components/woot/CallsView";
import { PageTransition } from "@/components/woot/PageTransition";

export const Route = createFileRoute("/dashboard/calls")({
  head: () => ({ meta: [{ title: "Calls — Woot" }] }),
  component: () => (
    <AppShell title="Calls" base="dashboard">
      <PageTransition><CallsView /></PageTransition>
    </AppShell>
  ),
});
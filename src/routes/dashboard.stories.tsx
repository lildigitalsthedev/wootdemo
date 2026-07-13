import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/woot/AppShell";
import { StoriesView } from "@/components/woot/StoriesView";
import { PageTransition } from "@/components/woot/PageTransition";

export const Route = createFileRoute("/dashboard/stories")({
  head: () => ({ meta: [{ title: "Stories — Woot" }] }),
  component: () => (
    <AppShell title="Stories" base="dashboard">
      <PageTransition><StoriesView /></PageTransition>
    </AppShell>
  ),
});
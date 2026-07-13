import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/woot/AppShell";
import { ChatsView } from "@/components/woot/ChatsView";
import { PageTransition } from "@/components/woot/PageTransition";

export const Route = createFileRoute("/customer/chats")({
  head: () => ({ meta: [{ title: "Chats — Woot" }] }),
  component: () => (
    <AppShell title="Chats" base="customer">
      <PageTransition><ChatsView /></PageTransition>
    </AppShell>
  ),
});
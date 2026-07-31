import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AppShell } from "@/components/woot/AppShell";
import { ChatsView } from "@/components/woot/ChatsView";
import { PageTransition } from "@/components/woot/PageTransition";
import { ChatThread } from "@/components/woot/ChatThread";
import { findBusiness } from "@/lib/mock-data";
import { MessageCircle } from "lucide-react";

const search = z.object({ chat: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/customer/chats")({
  head: () => ({ meta: [{ title: "Chats — Glode" }] }),
  validateSearch: search,
  component: ChatsRoute,
});

function ChatsRoute() {
  const { chat } = Route.useSearch();
  const activeBusiness = chat ? findBusiness(chat) : undefined;

  return (
    <AppShell title="Chats" base="customer" noPadX>
      <div className="md:hidden">
        <PageTransition><ChatsView base="customer" /></PageTransition>
      </div>
      <div className="hidden min-h-0 flex-1 md:flex">
        <div className="relative w-[340px] shrink-0 overflow-y-auto border-r">
          <ChatsView activeId={activeBusiness?.id} base="customer" />
        </div>
        <div className="min-w-0 flex-1">
          {activeBusiness ? (
            <ChatThread key={activeBusiness.id} b={activeBusiness} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <MessageCircle size={40} strokeWidth={1.5} />
              <p className="text-sm">Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

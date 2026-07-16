import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { findBusiness } from "@/lib/mock-data";
import { ChatThread } from "@/components/woot/ChatThread";

export const Route = createFileRoute("/chat/$id")({
  loader: ({ params }) => {
    const b = findBusiness(params.id);
    if (!b) throw notFound();
    return { b };
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.b.name} · Chat` : "Chat" }] }),
  component: ChatPage,
});

// Desktop keeps the chat list + thread together on /dashboard/chats or
// /customer/chats (split view). This route is the mobile full-screen
// experience; if a desktop-width browser lands here directly (e.g. a
// shared link), bounce over to the split view instead of showing an
// orphaned single pane. Customer is the default flow since every
// non-list entry point into this route (business profile, business
// card "Chat" button) is customer-facing.
function ChatPage() {
  const { b } = Route.useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      navigate({ to: "/customer/chats", search: { chat: b.id }, replace: true });
    }
  }, [b.id, navigate]);

  return (
    <div className="mx-auto flex h-[100dvh] max-w-3xl flex-col lg:hidden">
      <ChatThread b={b} onBack={() => navigate({ to: "/customer/chats" })} />
    </div>
  );
}
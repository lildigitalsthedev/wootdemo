import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { findStory, StoryViewer } from "@/components/woot/StoryViewer";

export const Route = createFileRoute("/story/$id")({
  loader: ({ params }) => {
    const s = findStory(params.id);
    if (!s) throw notFound();
    return { s };
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.s.business.name} · Story` : "Story" }] }),
  component: StoryPage,
});

// Desktop keeps the stories list + viewer together on /dashboard/stories or
// /customer/stories (split view), same pattern as /chat/$id. This route is the
// mobile full-screen experience; if a desktop-width browser lands here directly,
// bounce over to the split view instead of showing an orphaned single pane.
function StoryPage() {
  const { s } = Route.useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      navigate({ to: "/customer/stories", search: { story: s.id }, replace: true });
    }
  }, [s.id, navigate]);

  return (
    <div className="mx-auto h-[100dvh] max-w-3xl lg:hidden">
      <StoryViewer story={s} onClose={() => navigate({ to: "/customer/stories" })} />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AppShell } from "@/components/woot/AppShell";
import { StoriesView } from "@/components/woot/StoriesView";
import { PageTransition } from "@/components/woot/PageTransition";
import { StoryViewer, findStory } from "@/components/woot/StoryViewer";
import { Sparkles } from "lucide-react";

const search = z.object({ story: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/dashboard/stories")({
  head: () => ({ meta: [{ title: "Stories — Glode" }] }),
  validateSearch: search,
  component: StoriesRoute,
});

function StoriesRoute() {
  const { story } = Route.useSearch();
  const activeStory = story ? findStory(story) : undefined;

  return (
    <AppShell title="Stories" base="dashboard" noPadX>
      <div className="md:hidden">
        <PageTransition><StoriesView base="dashboard" /></PageTransition>
      </div>
      <div className="hidden min-h-0 flex-1 md:flex">
        <div className="relative w-[340px] shrink-0 overflow-y-auto border-r">
          <StoriesView activeId={activeStory?.id} base="dashboard" />
        </div>
        <div className="min-w-0 flex-1 bg-black">
          {activeStory ? (
            <StoryViewer key={activeStory.id} story={activeStory} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-white/60">
              <Sparkles size={40} strokeWidth={1.5} />
              <p className="text-sm">Select a story to view it</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

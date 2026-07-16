import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AppShell } from "@/components/woot/AppShell";
import { StoriesView } from "@/components/woot/StoriesView";
import { PageTransition } from "@/components/woot/PageTransition";
import { StoryViewer, findStory } from "@/components/woot/StoryViewer";
import { Sparkles } from "lucide-react";

const search = z.object({ story: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/customer/stories")({
  head: () => ({ meta: [{ title: "Stories — Woot" }] }),
  validateSearch: search,
  component: StoriesRoute,
});

function StoriesRoute() {
  const { story } = Route.useSearch();
  const activeStory = story ? findStory(story) : undefined;

  return (
    <AppShell title="Stories" base="customer" noPadX>
      {/* Mobile / tablet: list only, tapping a story opens the full-screen /story/$id overlay */}
      <div className="lg:hidden">
        <PageTransition><StoriesView base="customer" /></PageTransition>
      </div>

      {/* Desktop: list + viewer side by side, list never leaves the screen */}
      <div className="hidden min-h-0 flex-1 lg:flex">
        <div className="relative w-[380px] shrink-0 overflow-y-auto border-r">
          <StoriesView activeId={activeStory?.id} base="customer" />
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

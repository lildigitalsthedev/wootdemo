import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { X, MessageCircle } from "lucide-react";
import { STORIES, type Story } from "@/lib/mock-data";
import { BusinessAvatar } from "@/components/woot/BusinessAvatar";
import { VerifiedBadge } from "@/components/woot/Logo";

/**
 * Renders a single story's playback view: cover image, progress bar, business header,
 * caption, and a reply shortcut. Used both as the desktop right-pane content (Stories
 * split view) and, wrapped in a full-screen container, as the mobile story overlay.
 */
export function StoryViewer({ story, onClose }: { story: Story; onClose?: () => void }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-black text-white">
      <img src={story.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />

      <div className="relative z-10 flex gap-1 px-4 pt-4">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4.5, ease: "linear" }}
          className="h-[3px] flex-1 origin-left rounded-full bg-white"
        />
      </div>

      <div className="relative z-10 flex items-center justify-between gap-3 px-4 pt-3">
        <Link to="/business/$id" params={{ id: story.business.id }} className="flex min-w-0 items-center gap-2.5">
          <BusinessAvatar b={story.business} size={36} rounded="rounded-full" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-[14px] font-semibold">{story.business.name}</span>
              {story.business.verified && <VerifiedBadge />}
            </div>
            <div className="text-[11px] text-white/70">Just now</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20">
            <X size={17} />
          </button>
        )}
      </div>

      <div className="relative z-10 mt-auto flex items-end justify-between gap-3 p-4">
        <p className="max-w-[80%] text-[15px] font-medium leading-snug">{story.caption}</p>
        <Link to="/chat/$id" params={{ id: story.business.id }}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-transform hover:scale-105 hover:bg-white/25 active:scale-95">
          <MessageCircle size={18} />
        </Link>
      </div>
    </div>
  );
}

export function findStory(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

import { StoryRing } from "./StoryRing";
import { useMe } from "@/lib/mock-data";

/**
 * Profile nav-bar icon: shows the logged-in user's real profile picture
 * (or a default avatar/initials if none is set), wrapped in the same
 * dashed story-ring used elsewhere in the app. Reads from the shared
 * `useMe()` store, so it updates instantly whenever the picture changes.
 */
export function NavAvatar({ size = 26, active = false }: { size?: number; active?: boolean }) {
  const me = useMe();
  const hasPhoto = Boolean(me.avatarUrl);

  return (
    <StoryRing size={size + 8} hasStories seen={!active} active={active} strokeWidth={2} segments={4} gapDeg={18}>
      {hasPhoto ? (
        <img src={me.avatarUrl} alt={me.name} className="h-full w-full object-cover" />
      ) : (
        <span
          className="grid h-full w-full place-items-center text-[10px] font-bold text-white"
          style={{ background: me.color }}
        >
          {me.avatar}
        </span>
      )}
    </StoryRing>
  );
}

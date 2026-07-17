import { StoryRing } from '@/components/woot/StoryRing';

interface StoriesIconProps {
  size?: number;
  hasStories?: boolean;
  active?: boolean;
  className?: string;
}

/**
 * Nav-bar stories icon: a broken/dashed circular ring (Telegram/Instagram/
 * WhatsApp style) instead of a solid icon glyph.
 */
export function StoriesIcon({ size = 24, hasStories = true, active = false, className }: StoriesIconProps) {
  return (
    <StoryRing
      size={size}
      hasStories={hasStories}
      active={active}
      strokeWidth={2.4}
      segments={4}
      gapDeg={16}
      className={className}
    />
  );
}
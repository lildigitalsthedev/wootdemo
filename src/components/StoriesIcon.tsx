import { cn } from '@/lib/utils';

interface StoriesIconProps {
  size?: number;
  hasStories?: boolean;
  className?: string;
}

export function StoriesIcon({ 
  size = 24, 
  hasStories = true, 
  className 
}: StoriesIconProps) {
  // Broken/dashed ring - 4 segments like Instagram/Telegram
  const segments = 4;
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference / segments} ${circumference / segments}`;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-primary', className)}
      aria-hidden="true"
    >
      {/* Outer broken ring */}
      <circle
        cx="12"
        cy="12"
        r={radius}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
        className="transition-opacity duration-200"
        style={{ opacity: hasStories ? 1 : 0.3 }}
      />
      {/* Inner dot when no stories */}
      {!hasStories && (
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="currentColor"
          className="text-muted-foreground"
        />
      )}
    </svg>
  );
}

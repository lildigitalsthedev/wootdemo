import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';

interface ProfileIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProfileIcon({ size = 'md', className }: ProfileIconProps) {
  const user = useUser();
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  
  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage 
        src={user.avatarUrl} 
        alt={user.name}
        className="rounded-full"
      />
      <AvatarFallback className="rounded-full bg-primary/10 text-primary font-medium">
        {user.initials}
      </AvatarFallback>
    </Avatar>
  );
}

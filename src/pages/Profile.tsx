import { useUser } from '@/hooks/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Settings, Edit, LogOut } from 'lucide-react';

export function Profile() {
  const user = useUser();
  
  return (
    <div className="flex flex-col h-full">
      {/* Profile Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatarUrl} alt={user.name} className="rounded-full" />
            <AvatarFallback className="rounded-full bg-primary/10 text-primary text-2xl font-bold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">{user.name}</h1>
            <p className="text-muted-foreground text-sm">@{user.name.toLowerCase().replace(' ', '')}</p>
          </div>
        </div>
      </div>
      
      {/* Profile Options */}
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 p-4" aria-label="Profile options">
          <a 
            href="#edit-profile" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Edit size={20} className="text-muted-foreground" />
            <span>Edit Profile</span>
          </a>
          <a 
            href="#settings" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Settings size={20} className="text-muted-foreground" />
            <span>Settings</span>
          </a>
          <button 
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-destructive w-full text-left"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

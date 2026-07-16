import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ProfileIcon } from './ProfileIcon';
import { StoriesIcon } from './StoriesIcon';
import { 
  MessageSquare, 
  Phone, 
  Settings,
  LayoutDashboard 
} from 'lucide-react';
import { useState, useEffect } from 'react';

const TABS = [
  { id: 'chats', label: 'Chats', icon: MessageSquare, path: '/chats' },
  { id: 'stories', label: 'Stories', icon: StoriesIcon, path: '/stories', isCustom: true },
  { id: 'calls', label: 'Calls', icon: Phone, path: '/calls' },
  { id: 'profile', label: 'Profile', icon: ProfileIcon, path: '/profile', isCustom: true },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
] as const;

export function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  
  const getActiveIndex = () => {
    const path = location.pathname;
    return TABS.findIndex(tab => path === tab.path || path.startsWith(tab.path + '/')) ?? 0;
  };
  
  const activeIndex = getActiveIndex();
  
  const handleTabClick = (index: number) => {
    if (index !== activeIndex) {
      navigate(TABS[index].path);
    }
  };
  
  const renderTabIcon = (tab: typeof TABS[0], isActive: boolean) => {
    if (tab.isCustom) {
      // Custom components (ProfileIcon, StoriesIcon)
      const Component = tab.icon as React.ComponentType<any>;
      return <Component size={isDesktop ? 'lg' : 'md'} />;
    }
    // Lucide icons
    const Icon = tab.icon;
    return <Icon size={isDesktop ? 24 : 22} className={cn(isActive && 'text-primary')} />;
  };
  
  if (isDesktop) {
    return (
      <aside className="fixed left-0 top-0 h-full w-16 bg-background border-r border-border flex flex-col items-center justify-between p-4">
        <nav className="flex flex-col gap-2" role="navigation" aria-label="Main navigation">
          {TABS.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(index)}
                className={cn(
                  'relative flex flex-col items-center gap-1 p-2 rounded-lg transition-colors',
                  'hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
                aria-label={tab.label}
              >
                <span className="relative">{renderTabIcon(tab, isActive)}</span>
                <span className="text-xs font-medium whitespace-nowrap">{tab.label}</span>
                {isActive && (
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-border w-full pt-4" />
      </aside>
    );
  }
  
  // Mobile bottom navigation
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border"
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="grid grid-cols-5 h-16">
        {TABS.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(index)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
            >
              <span className="relative">{renderTabIcon(tab, isActive)}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

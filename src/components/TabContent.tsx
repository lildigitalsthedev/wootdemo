import { useLocation } from 'react-router-dom';
import { useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TabContentProps {
  children: ReactNode;
  tabIndex: number;
}

export function TabContent({ children, tabIndex }: TabContentProps) {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(tabIndex);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  
  // Determine current tab index from URL
  const getCurrentTabIndex = () => {
    const path = location.pathname;
    const tabs = ['/chats', '/stories', '/calls', '/profile', '/settings'];
    return tabs.findIndex(tab => path === tab || path.startsWith(tab + '/')) ?? 0;
  };
  
  useEffect(() => {
    const newIndex = getCurrentTabIndex();
    if (newIndex !== activeIndex) {
      setDirection(newIndex > activeIndex ? 'left' : 'right');
      setActiveIndex(newIndex);
    }
  }, [location.pathname]);
  
  // Only render when active or transitioning
  const isActive = activeIndex === tabIndex;
  const isExiting = !isActive; // Simplified - in reality track previous
  
  return (
    <div
      className={cn(
        'absolute inset-0 w-full flex-shrink-0',
        'transition-transform duration-250 ease-out',
        'will-change-transform',
        isActive ? 'translate-x-0 opacity-100' : 
          direction === 'left' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0',
        'pointer-events-none'
      )}
      style={{
        transform: isActive 
          ? 'translateX(0)' 
          : direction === 'left' 
            ? 'translateX(-100%)' 
            : 'translateX(100%)',
        opacity: isActive ? 1 : 0,
      }}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
}

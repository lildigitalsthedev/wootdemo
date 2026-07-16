import { NavigationBar } from '@/components/NavigationBar';
import { TabContent } from '@/components/TabContent';
import { Chats } from './Chats';
import { StoriesPage } from './StoriesPage';
import { Calls } from './Calls';
import { Profile } from './Profile';
import { Settings } from './Settings';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  
  // Determine active tab index for initial render
  const getActiveIndex = () => {
    const path = location.pathname;
    const tabs = ['/chats', '/stories', '/calls', '/profile', '/settings'];
    return tabs.findIndex(tab => path === tab || path.startsWith(tab + '/')) ?? 0;
  };
  
  const activeIndex = getActiveIndex();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Desktop sidebar offset */}
      <div className="hidden lg:pl-16 lg:min-h-screen">
        <main className="relative h-screen overflow-hidden">
          <TabContent tabIndex={0}><Chats /></TabContent>
          <TabContent tabIndex={1}><StoriesPage /></TabContent>
          <TabContent tabIndex={2}><Calls /></TabContent>
          <TabContent tabIndex={3}><Profile /></TabContent>
          <TabContent tabIndex={4}><Settings /></TabContent>
        </main>
      </div>
      
      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <main className="relative flex-1 overflow-hidden pb-16">
          <TabContent tabIndex={0}><Chats /></TabContent>
          <TabContent tabIndex={1}><StoriesPage /></TabContent>
          <TabContent tabIndex={2}><Calls /></TabContent>
          <TabContent tabIndex={3}><Profile /></TabContent>
          <TabContent tabIndex={4}><Settings /></TabContent>
        </main>
        <NavigationBar />
      </div>
      
      {/* Desktop navigation */}
      <NavigationBar />
    </div>
  );
};

export default Index;

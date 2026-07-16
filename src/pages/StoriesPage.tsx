import { StoriesIcon } from '@/components/StoriesIcon';

export function StoriesPage() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Stories</h1>
        <StoriesIcon size={28} hasStories={true} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="text-center text-muted-foreground py-12">
          <p>No stories available</p>
        </div>
      </div>
    </div>
  );
}

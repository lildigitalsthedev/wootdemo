export function Chats() {
  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Chat list placeholder */}
        <div className="text-center text-muted-foreground py-12">
          <p>No chats yet</p>
          <p className="text-sm mt-1">Start a conversation!</p>
        </div>
      </div>
    </div>
  );
}

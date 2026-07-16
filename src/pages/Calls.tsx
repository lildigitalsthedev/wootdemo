export function Calls() {
  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Calls</h1>
      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="text-center text-muted-foreground py-12">
          <p>No recent calls</p>
        </div>
      </div>
    </div>
  );
}

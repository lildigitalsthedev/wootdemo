export function Settings() {
  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex-1 overflow-y-auto space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Account
          </h2>
          <div className="space-y-2">
            <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent cursor-pointer">
              <span>Notifications</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </label>
            <label className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent cursor-pointer">
              <span>Dark Mode</span>
              <input type="checkbox" className="h-4 w-4" />
            </label>
          </div>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Privacy
          </h2>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent text-left">
              <span>Blocked Users</span>
              <span className="text-muted-foreground">Manage</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

font-semibold">Add product</div>
        </div>
      </button>
    </div>
  );
}

function StoreTab({ me }: { me: typeof BUSINESSES[number] }) {
  const fields: { label: string; value: string }[] = [
    { label: "Store name", value: me.name },
    { label: "Handle", value: me.handle },
    { label: "Description", value: me.description },
    { label: "Location", value: me.location },
  ];
  return (
    <div className="grid gap-3 md:max-w-2xl">
      {fields.map((f) => (
        <label key={f.label} className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{f.label}</span>
          <input defaultValue={f.value} className="h-11 w-full rounded-xl border bg-background px-3.5 text-sm outline-none focus:border-primary" />
        </label>
      ))}
      <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
        <div className="flex items-center gap-2 text-sm"><Settings size={16} /> Accept online orders</div>
        <span className="inline-flex h-6 w-11 items-center rounded-full bg-primary p-0.5"><span className="ml-auto h-5 w-5 rounded-full bg-white shadow-soft" /></span>
      </div>
    </div>
  );
}

function CatalogTab() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {["Bestsellers", "New", "Weekend Specials", "Seasonal"].map((c) => (
        <div key={c} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border bg-card p-3 shadow-soft">
          <Layers size={18} className="text-primary" />
          <div>
            <div className="text-sm font-semibold">{c}</div>
            <div className="text-[11px] text-muted-foreground">{Math.floor(Math.random() * 12) + 3} items</div>
          </div>
          <button className="rounded-full border px-3 py-1.5 text-xs font-semibold">Edit</button>
        </div>
      ))}
    </div>
  );
}

function AnalyticsTab() {
  const cards: { l: string; v: string; d: string }[] = [
    { l: "Revenue (7d)", v: "$4,820", d: "+18.4%" },
    { l: "Orders", v: "132", d: "+12" },
    { l: "Chat replies", v: "97%", d: "+3%" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((k) => (
        <div key={k.l} className="rounded-3xl border bg-card p-5 shadow-soft">
          <div className="text-xs text-muted-foreground">{k.l}</div>
          <div className="mt-1 text-2xl font-black tracking-tight">{k.v}</div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
            <TrendingUp size={11} /> {k.d}
          </div>
        </div>
      ))}
      <div className="rounded-3xl border bg-card p-5 shadow-soft sm:col-span-3">
        <div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">Sales this week</span><span className="text-xs text-muted-foreground">Mock data</span></div>
        <div className="flex h-40 items-end gap-2">
          {[38, 62, 44, 78, 56, 88, 74].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex-1 rounded-t-xl" style={{ background: "linear-gradient(180deg, var(--primary), color-mix(in oklab, var(--primary) 30%, transparent))" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <ul className="divide-y overflow-hidden rounded-3xl border bg-card shadow-soft">
      {ORDERS.map((o) => (
        <li key={o.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-primary"><ShoppingBag size={16} /></span>
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold">{o.id} · {o.customer}</div>
            <div className="text-[12px] text-muted-foreground">{o.when}</div>
          </div>
          <div className="text-right">
            <div className="text-[13px] font-bold">${o.total}</div>
            <div className={`text-[11px] font-semibold ${o.status === "Fulfilled" ? "text-emerald-600" : o.status === "Refunded" ? "text-red-500" : "text-amber-600"}`}>{o.status}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CategoriesTab() {
  const cats: { name: string; count: number; tint: string }[] = [
    { name: "Coffee & Espresso", count: 12, tint: "#7c3aed" },
    { name: "Pastries", count: 9, tint: "#f97316" },
    { name: "Cold Drinks", count: 7, tint: "#0ea5e9" },
    { name: "Merchandise", count: 5, tint: "#15803d" },
    { name: "Gift Cards", count: 3, tint: "#db2777" },
    { name: "Seasonal", count: 4, tint: "#f59e0b" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {cats.map((c) => (
        <div key={c.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border bg-card p-3 shadow-soft">
          <span className="grid h-10 w-10 place-items-center rounded-2xl text-white" style={{ background: c.tint }}>
            <Tag size={16} />
          </span>
          <div>
            <div className="text-sm font-semibold">{c.name}</div>
            <div className="text-[11px] text-muted-foreground">{c.count} products</div>
          </div>
          <button className="rounded-full border px-3 py-1.5 text-xs font-semibold hover:bg-accent">Edit</button>
        </div>
      ))}
      <button className="grid place-items-center rounded-2xl border-2 border-dashed border-border p-4 text-muted-foreground transition hover:border-primary hover:text-primary">
        <div className="text-center">
          <Plus className="mx-auto" size={18} />
          <div className="mt-1 text-xs font-semibold">New category</div>
        </div>
      </button>
    </div>
  );
}
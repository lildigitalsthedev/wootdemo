import { motion } from "motion/react";
import { STORIES, COMMUNITIES } from "@/lib/mock-data";
import { BusinessAvatar } from "./BusinessAvatar";

export function StoriesView() {
  return (
    <div className="px-4 py-2">
      <h2 className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Stories</h2>
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
        {STORIES.map((s) => (
          <motion.button key={s.id} whileTap={{ scale: 0.96 }} className="flex w-20 shrink-0 flex-col items-center gap-1.5">
            <span className="rounded-full p-[2px]" style={{ background: s.seen ? "var(--border)" : "conic-gradient(from 180deg at 50% 50%, #2F6BFF, #7c3aed, #f97316, #2F6BFF)" }}>
              <span className="block rounded-full bg-background p-[2px]">
                <BusinessAvatar b={s.business} rounded="rounded-full" size={60} />
              </span>
            </span>
            <span className="w-full truncate text-center text-[11px] font-medium">{s.business.name}</span>
          </motion.button>
        ))}
      </div>

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Featured</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {STORIES.slice(0, 4).map((s) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl shadow-soft" style={{ aspectRatio: "9 / 14" }}>
            <img src={s.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <div className="text-[13px] font-semibold">{s.business.name}</div>
              <div className="text-[11px] text-white/80">Tap to view</div>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Communities</h2>
      <div className="mt-3 grid gap-3">
        {COMMUNITIES.map((c) => (
          <div key={c.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border bg-card p-3 shadow-soft">
            <img src={c.cover} alt="" className="h-14 w-14 rounded-2xl object-cover" />
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold">{c.name}</div>
              <div className="text-[12px] text-muted-foreground">{c.members.toLocaleString()} members</div>
            </div>
            <button className="rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-soft">Join</button>
          </div>
        ))}
      </div>
      <div className="h-8" />
    </div>
  );
}
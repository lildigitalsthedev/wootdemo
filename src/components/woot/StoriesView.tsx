import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Search, Type, Mic, Camera, Video, Users } from "lucide-react";
import { STORIES, COMMUNITIES, ME } from "@/lib/mock-data";
import { BusinessAvatar } from "./BusinessAvatar";
import { Fab } from "./Fab";
import { Modal } from "./Modal";

type Composer = "text" | "voice" | "photo" | "video";

export function StoriesView({ activeId, base = "dashboard" }: { activeId?: string; base?: "dashboard" | "customer" } = {}) {
  const [commSearch, setCommSearch] = useState("");
  const [createComm, setCreateComm] = useState(false);
  const [showCommSearch, setShowCommSearch] = useState(false);
  const [composer, setComposer] = useState<null | Composer>(null);
  const communities = COMMUNITIES.filter((c) => c.name.toLowerCase().includes(commSearch.toLowerCase()));
  const storiesPath: "/dashboard/stories" | "/customer/stories" = base === "dashboard" ? "/dashboard/stories" : "/customer/stories";

  // Desktop sidebar "+" dispatches this when Stories section is active.
  useEffect(() => {
    const onNewStory = (e: Event) => {
      const kind = (e as CustomEvent<{ kind: Composer }>).detail?.kind;
      if (kind === "text" || kind === "voice" || kind === "photo" || kind === "video") {
        setComposer(kind);
      }
    };
    window.addEventListener("woot:new-story", onNewStory);
    return () => window.removeEventListener("woot:new-story", onNewStory);
  }, []);

  return (
    <div className="px-4 py-2">
      <h2 className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent Updates</h2>
      <div className="no-scrollbar relative mt-3 flex gap-3 overflow-x-auto pb-1">
        <button
          className="sticky left-0 z-10 flex w-20 shrink-0 flex-col items-center gap-1.5 pr-2"
          style={{
            background: "linear-gradient(to right, var(--background) 78%, color-mix(in oklab, var(--background) 0%, transparent) 100%)",
          }}
        >
          <span className="relative">
            <span className="grid h-16 w-16 place-items-center rounded-full text-[15px] font-bold text-white" style={{ background: ME.color }}>{ME.avatar}</span>
            <span className="absolute -bottom-0.5 -right-0.5 grid h-6 w-6 place-items-center rounded-full border-2 border-background bg-primary text-white">
              <Plus size={12} strokeWidth={3} />
            </span>
          </span>
          <span className="w-full truncate text-center text-[11px] font-semibold">My Story</span>
        </button>
        {STORIES.map((s) => {
          const active = activeId === s.id;
          const ring = { background: s.seen ? "var(--border)" : "conic-gradient(from 180deg at 50% 50%, #2F6BFF, #7c3aed, #f97316, #2F6BFF)" };
          const inner = (
            <>
              <span className="rounded-full p-[2px]" style={ring}>
                <span className="block rounded-full bg-background p-[2px]">
                  <BusinessAvatar b={s.business} rounded="rounded-full" size={60} />
                </span>
              </span>
              <span className="w-full truncate text-center text-[11px] font-medium">{s.business.name}</span>
            </>
          );
          return (
            <div key={s.id}>
              <Link to="/story/$id" params={{ id: s.id }} className="flex w-20 shrink-0 flex-col items-center gap-1.5 lg:hidden">
                {inner}
              </Link>
              <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }} className="hidden lg:block">
                <Link to={storiesPath} search={{ story: s.id }} className="flex w-20 shrink-0 flex-col items-center gap-1.5"
                  style={active ? { filter: "drop-shadow(0 0 0 2px var(--primary))" } : undefined}>
                  {inner}
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Featured</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {STORIES.slice(0, 4).map((s) => {
          const active = activeId === s.id;
          const card = (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              className="relative overflow-hidden rounded-3xl shadow-soft transition-shadow hover:shadow-card"
              style={{ aspectRatio: "9 / 14", outline: active ? "2px solid var(--primary)" : undefined, outlineOffset: active ? 2 : undefined }}>
              <img src={s.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <div className="text-[13px] font-semibold">{s.business.name}</div>
                <div className="truncate text-[11px] text-white/80">{s.caption}</div>
              </div>
            </motion.div>
          );
          return (
            <div key={s.id}>
              <Link to="/story/$id" params={{ id: s.id }} className="lg:hidden">{card}</Link>
              <Link to={storiesPath} search={{ story: s.id }} className="hidden lg:block">{card}</Link>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Communities</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowCommSearch((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent"
          >
            <Search size={16} />
          </button>
          <button onClick={() => setCreateComm(true)} className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground hover:opacity-90">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showCommSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 overflow-hidden"
          >
            <div className="rounded-2xl border bg-card p-2 shadow-card">
              <input
                autoFocus
                value={commSearch}
                onChange={(e) => setCommSearch(e.target.value)}
                placeholder="Search communities"
                className="h-10 w-full rounded-full border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 grid gap-3">
        {communities.length === 0 && (
          <div className="rounded-3xl border bg-card p-6 text-center text-sm text-muted-foreground">No communities match "{commSearch}"</div>
        )}
        {communities.map((c) => (
          <motion.div key={c.id} whileHover={{ y: -2 }} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border bg-card p-3 shadow-soft transition-shadow hover:shadow-card">
            <img src={c.cover} alt="" className="h-14 w-14 rounded-2xl object-cover" />
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold">{c.name}</div>
              <div className="text-[12px] text-muted-foreground">{c.members.toLocaleString()} members · Active now</div>
            </div>
            <button className="rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105 active:scale-95">Join</button>
          </motion.div>
        ))}
      </div>
      <div className="h-28" />

      {/* Mobile / tablet only — desktop uses the sidebar's contextual + button */}
      <div className="lg:hidden">
        <Fab
          actions={[
            { label: "Text", icon: Type, onClick: () => setComposer("text") },
            { label: "Voice", icon: Mic, onClick: () => setComposer("voice"), tint: "#7c3aed" },
            { label: "Photo", icon: Camera, onClick: () => setComposer("photo"), tint: "#f97316" },
            { label: "Video", icon: Video, onClick: () => setComposer("video"), tint: "#db2777" },
          ]}
        />
      </div>

      <Modal open={composer !== null} onClose={() => setComposer(null)} title={`New ${composer ?? ""} Story`}>
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div key={composer ?? "none"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {composer === "text" && (
                <textarea autoFocus placeholder="What's on your mind?" className="h-40 w-full resize-none rounded-3xl bg-gradient-to-br from-primary to-purple-600 p-6 text-[20px] font-semibold text-white placeholder:text-white/70 outline-none" />
              )}
              {composer === "voice" && (
                <div className="flex flex-col items-center gap-4 py-6">
                  <motion.button whileTap={{ scale: 0.9 }} className="grid h-24 w-24 place-items-center rounded-full bg-primary text-white shadow-card"><Mic size={32} /></motion.button>
                  <div className="text-sm text-muted-foreground">Tap to record · Up to 60s</div>
                </div>
              )}
              {composer === "photo" && (
                <div className="grid aspect-video place-items-center rounded-3xl border-2 border-dashed bg-muted/40 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2"><Camera size={26} /><span className="text-sm">Take a photo or upload</span></div>
                </div>
              )}
              {composer === "video" && (
                <div className="grid aspect-video place-items-center rounded-3xl border-2 border-dashed bg-muted/40 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2"><Video size={26} /><span className="text-sm">Record up to 60 seconds</span></div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <button onClick={() => setComposer(null)} className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft">Share to Story</button>
        </div>
      </Modal>

      <Modal open={createComm} onClose={() => setCreateComm(false)} title="Create Community"
        footer={<div className="flex justify-end"><button onClick={() => setCreateComm(false)} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Create</button></div>}>
        <div className="space-y-4 p-4">
          <div className="grid h-32 place-items-center rounded-3xl bg-gradient-to-br from-primary to-purple-600 text-white">
            <Users size={28} />
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Community name</label>
            <input placeholder="Neighborhood Makers" className="mt-1.5 h-11 w-full rounded-2xl border bg-card px-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
            <textarea placeholder="What's your community about?" className="mt-1.5 h-24 w-full resize-none rounded-2xl border bg-card p-3 text-sm outline-none focus:border-primary" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
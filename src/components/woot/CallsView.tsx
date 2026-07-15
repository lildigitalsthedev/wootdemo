import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone, Video, Search, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { CALLS, findBusiness, BUSINESSES } from "@/lib/mock-data";
import { BusinessAvatar } from "./BusinessAvatar";
import { Fab } from "./Fab";
import { Modal } from "./Modal";

export function CallsView() {
  const [modal, setModal] = useState<null | "voice" | "video" | "search" | "recent">(null);
  const [query, setQuery] = useState("");
  const results = BUSINESSES.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
  return (
    <>
      <ul className="divide-y">
        {CALLS.map((c, i) => {
        const b = findBusiness(c.businessId)!;
        const Icon = c.missed ? PhoneMissed : c.type === "outgoing" ? PhoneOutgoing : PhoneIncoming;
        const color = c.missed ? "text-red-500" : "text-muted-foreground";
        const ActionIcon = c.mode === "video" ? Video : PhoneOutgoing;
        return (
          <motion.li key={c.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
            <Link to="/call/$id" params={{ id: b.id }} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/60 active:bg-accent">
              <span className="relative">
                <BusinessAvatar b={b} rounded="rounded-full" size={48} />
                {c.mode === "video" && (
                  <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-background bg-violet-600 text-white">
                    <Video size={10} />
                  </span>
                )}
              </span>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold">{b.name}</div>
                <div className={`inline-flex items-center gap-1 text-[12px] ${color}`}>
                  <Icon size={12} /> {c.missed ? "Missed" : c.type === "outgoing" ? "Outgoing" : "Incoming"} {c.mode === "video" ? "video" : ""} · {c.time}
                </div>
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-full border bg-background text-primary transition-transform hover:scale-105 hover:bg-accent active:scale-95">
                <ActionIcon size={14} />
              </button>
            </Link>
          </motion.li>
        );
        })}
      </ul>

      <Fab
        actions={[
          { label: "New Voice Call", icon: Phone, onClick: () => setModal("voice") },
          { label: "New Video Call", icon: Video, onClick: () => setModal("video"), tint: "#7c3aed" },
          { label: "Search Business", icon: Search, onClick: () => setModal("search"), tint: "#f97316" },
          { label: "Recent Calls", icon: Clock, onClick: () => setModal("recent"), tint: "#15803d" },
        ]}
      />

      <Modal open={modal !== null} onClose={() => setModal(null)}
        title={modal === "voice" ? "New Voice Call" : modal === "video" ? "New Video Call" : modal === "search" ? "Search Business" : "Recent Calls"}>
        {modal === "recent" ? (
          <ul className="divide-y">
            {CALLS.map((c) => {
              const b = findBusiness(c.businessId)!;
              return (
                <li key={c.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
                  <BusinessAvatar b={b} rounded="rounded-full" size={40} />
                  <div className="min-w-0"><div className="truncate text-sm font-semibold">{b.name}</div><div className="text-[11px] text-muted-foreground">{c.time}</div></div>
                  {c.mode === "video" ? <Video size={16} className="text-violet-600" /> : <Phone size={16} className="text-primary" />}
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <div className="p-4">
              <div className="flex items-center gap-2 rounded-full border bg-card px-3">
                <Search size={14} className="text-muted-foreground" />
                <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search businesses" className="h-10 flex-1 bg-transparent text-sm outline-none" />
              </div>
            </div>
            <ul className="px-2 pb-3">
              {results.map((b) => (
                <li key={b.id}>
                  <button onClick={() => setModal(null)} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-3 py-2.5 text-left hover:bg-accent">
                    <BusinessAvatar b={b} rounded="rounded-full" size={40} />
                    <div className="min-w-0"><div className="truncate text-sm font-semibold">{b.name}</div><div className="truncate text-[11px] text-muted-foreground">{b.handle}</div></div>
                    <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: modal === "video" ? "#7c3aed" : "var(--primary)" }}>
                      {modal === "video" ? <Video size={14} /> : <Phone size={14} />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </>
  );
}
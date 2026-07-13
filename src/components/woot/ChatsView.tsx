import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Search } from "lucide-react";
import { CHATS, CHAT_REQUESTS, GROUPS, findBusiness } from "@/lib/mock-data";
import { BusinessAvatar } from "./BusinessAvatar";
import { VerifiedBadge } from "./Logo";

const tabs = ["All", "Unread", "Requests", "Groups"] as const;
type Tab = typeof tabs[number];

export function ChatsView() {
  const [tab, setTab] = useState<Tab>("All");
  const list = tab === "Unread" ? CHATS.filter((c) => c.unread > 0) : CHATS;
  return (
    <div>
      <div className="px-4 pt-2">
        <div className="flex items-center gap-2 rounded-full border bg-card px-3 shadow-soft">
          <Search size={16} className="text-muted-foreground" />
          <input placeholder="Search chats" className="h-10 flex-1 bg-transparent text-sm outline-none" />
        </div>
      </div>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4">
        {tabs.map((t) => {
          const active = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)}
              className="relative shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold"
              style={{
                background: active ? "var(--primary)" : "var(--card)",
                color: active ? "white" : "var(--foreground)",
                borderColor: active ? "transparent" : "var(--border)",
              }}>
              {t}
            </button>
          );
        })}
      </div>

      {tab === "Groups" ? (
        <ul className="mt-2 divide-y">
          {GROUPS.map((g) => (
            <li key={g.id} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-lg font-bold text-accent-foreground">{g.name[0]}</div>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold">{g.name}</div>
                <div className="truncate text-[13px] text-muted-foreground">{g.last}</div>
                <div className="text-[11px] text-muted-foreground">{g.members} members</div>
              </div>
            </li>
          ))}
        </ul>
      ) : tab === "Requests" ? (
        <ul className="mt-2 divide-y">
          {CHAT_REQUESTS.map((r) => {
            const b = findBusiness(r.businessId)!;
            return (
              <li key={r.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
                <BusinessAvatar b={b} />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5"><span className="truncate font-semibold">{b.name}</span>{b.verified && <VerifiedBadge />}</div>
                  <div className="truncate text-[13px] text-muted-foreground">{r.note}</div>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Accept</button>
                  <button className="rounded-full border px-3 py-1.5 text-xs font-semibold">Ignore</button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-2 divide-y">
          {list.map((c, i) => {
            const b = findBusiness(c.businessId)!;
            return (
              <motion.li key={c.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                <Link to="/chat/$id" params={{ id: b.id }} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 hover:bg-accent/60">
                  <BusinessAvatar b={b} rounded="rounded-full" size={48} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-[15px] font-semibold">{b.name}</span>
                      {b.verified && <VerifiedBadge />}
                    </div>
                    <div className="truncate text-[13px] text-muted-foreground">{c.last}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] text-muted-foreground">{c.time}</span>
                    {c.unread > 0 && (
                      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{c.unread}</span>
                    )}
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
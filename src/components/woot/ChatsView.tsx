import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Search, MessageCircle, Users, Megaphone, ListPlus, Check, Package, Receipt, MapPin, Mic, Archive } from "lucide-react";
import { CHATS, CHAT_REQUESTS, GROUPS, findBusiness, CONTACTS, LISTS, type Chat } from "@/lib/mock-data";
import { BusinessAvatar } from "./BusinessAvatar";
import { VerifiedBadge } from "./Logo";
import { Fab } from "./Fab";
import { Modal } from "./Modal";

const tabs = ["All", "Unread", "Archived", "Requests", "Groups"] as const;
type Tab = typeof tabs[number];

const ATTACHMENT_ICON: Record<NonNullable<Chat["attachment"]>, typeof Package> = {
  order: Package,
  invoice: Receipt,
  location: MapPin,
  voice: Mic,
  product: Package,
};

export function ChatsView() {
  const [tab, setTab] = useState<Tab>("All");
  const [modal, setModal] = useState<null | "chat" | "group" | "broadcast" | "list">(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [chatSearch, setChatSearch] = useState("");
  const notArchived = CHATS.filter((c) => !c.archived);
  const list = (
    tab === "Unread" ? notArchived.filter((c) => c.unread > 0)
    : tab === "Archived" ? CHATS.filter((c) => c.archived)
    : notArchived
  ).filter((c) => {
    if (!chatSearch.trim()) return true;
    const b = findBusiness(c.businessId);
    return b?.name.toLowerCase().includes(chatSearch.toLowerCase()) || c.last.toLowerCase().includes(chatSearch.toLowerCase());
  });

  const openModal = (m: typeof modal) => {
    setSelected(new Set());
    setQuery("");
    setModal(m);
  };
  const toggle = (id: string) => {
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const filteredContacts = CONTACTS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="px-4 pt-2">
        <div className="flex items-center gap-2 rounded-full border bg-card px-3 shadow-soft transition-colors focus-within:border-primary">
          <Search size={16} className="text-muted-foreground" />
          <input
            value={chatSearch}
            onChange={(e) => setChatSearch(e.target.value)}
            placeholder="Search chats"
            className="h-10 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4">
        {tabs.map((t) => {
          const active = tab === t;
          const count = t === "Archived" ? CHATS.filter((c) => c.archived).length : t === "Unread" ? notArchived.filter((c) => c.unread > 0).length : null;
          return (
            <motion.button key={t} onClick={() => setTab(t)} whileTap={{ scale: 0.95 }}
              className="relative shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors"
              style={{
                background: active ? "var(--primary)" : "var(--card)",
                color: active ? "white" : "var(--foreground)",
                borderColor: active ? "transparent" : "var(--border)",
              }}>
              <span className="inline-flex items-center gap-1.5">
                {t === "Archived" && <Archive size={12} />}
                {t}
                {!!count && <span className="opacity-70">· {count}</span>}
              </span>
            </motion.button>
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
          <AnimatePresence mode="popLayout">
            {list.map((c, i) => {
              const b = findBusiness(c.businessId)!;
              const AttachIcon = c.attachment ? ATTACHMENT_ICON[c.attachment] : null;
              return (
                <motion.li key={c.id} layout initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.02, duration: 0.2 }}>
                  <Link to="/chat/$id" params={{ id: b.id }} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/60 active:bg-accent">
                    <BusinessAvatar b={b} rounded="rounded-full" size={48} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-[15px] font-semibold">{b.name}</span>
                        {b.verified && <VerifiedBadge />}
                      </div>
                      <div className="flex items-center gap-1 truncate text-[13px] text-muted-foreground">
                        {AttachIcon && <AttachIcon size={12} className="shrink-0 text-primary" />}
                        <span className="truncate">{c.last}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] text-muted-foreground">{c.time}</span>
                      {c.unread > 0 && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{c.unread}</motion.span>
                      )}
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
          {list.length === 0 && (
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-16 text-center text-sm text-muted-foreground">
              {tab === "Archived" ? "No archived chats yet." : chatSearch ? `No chats match "${chatSearch}".` : "No chats yet."}
            </motion.li>
          )}
        </ul>
      )}

      <Fab
        actions={[
          { label: "New Chat", icon: MessageCircle, onClick: () => openModal("chat") },
          { label: "New Group", icon: Users, onClick: () => openModal("group"), tint: "#7c3aed" },
          { label: "New Broadcast", icon: Megaphone, onClick: () => openModal("broadcast"), tint: "#f97316" },
          { label: "New List", icon: ListPlus, onClick: () => openModal("list"), tint: "#15803d" },
        ]}
      />

      <Modal
        open={modal === "chat"}
        onClose={() => setModal(null)}
        title="New Chat"
      >
        <div className="p-4">
          <div className="flex items-center gap-2 rounded-full border bg-card px-3">
            <Search size={14} className="text-muted-foreground" />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search people or businesses" className="h-10 flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>
        <div className="px-2">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Contacts</div>
          <ul>
            {filteredContacts.slice(0, 12).map((c) => (
              <li key={c.id}>
                <button onClick={() => setModal(null)} className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl px-3 py-2.5 text-left hover:bg-accent">
                  <span className="grid h-11 w-11 place-items-center rounded-full text-[13px] font-bold text-white" style={{ background: c.color }}>{c.avatar}</span>
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-semibold">{c.name}</div>
                    <div className="truncate text-[12px] text-muted-foreground">{c.last}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal
        open={modal === "group" || modal === "broadcast"}
        onClose={() => setModal(null)}
        title={modal === "group" ? "New Group" : "New Broadcast"}
        footer={
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-muted-foreground">{selected.size} selected</span>
            <button onClick={() => setModal(null)} disabled={selected.size === 0} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft disabled:opacity-40">
              {modal === "group" ? "Create group" : "Send broadcast"}
            </button>
          </div>
        }
      >
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 rounded-full border bg-card px-3">
            <Search size={14} className="text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Add people" className="h-10 flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>
        <ul className="px-2 pb-3">
          {filteredContacts.map((c) => {
            const on = selected.has(c.id);
            return (
              <li key={c.id}>
                <button onClick={() => toggle(c.id)} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-3 py-2.5 text-left hover:bg-accent">
                  <span className="grid h-11 w-11 place-items-center rounded-full text-[13px] font-bold text-white" style={{ background: c.color }}>{c.avatar}</span>
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-semibold">{c.name}</div>
                    <div className="truncate text-[12px] text-muted-foreground">{c.handle}</div>
                  </div>
                  <span className="grid h-6 w-6 place-items-center rounded-full border" style={{ background: on ? "var(--primary)" : "transparent", borderColor: on ? "transparent" : "var(--border)", color: "white" }}>
                    {on && <Check size={14} />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Modal>

      <Modal
        open={modal === "list"}
        onClose={() => setModal(null)}
        title="New List"
        footer={
          <div className="flex justify-end">
            <button onClick={() => setModal(null)} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft">Create list</button>
          </div>
        }
      >
        <div className="space-y-4 p-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">List name</label>
            <input placeholder="e.g. Wholesale partners" className="mt-1.5 h-11 w-full rounded-2xl border bg-card px-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Start from a template</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {LISTS.map((l) => (
                <button key={l.id} className="flex items-center gap-2 rounded-2xl border bg-card p-3 text-left hover:bg-accent">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-base" style={{ background: `${l.tint}22`, color: l.tint }}>{l.emoji}</span>
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold">{l.name}</div>
                    <div className="text-[11px] text-muted-foreground">{l.count} people</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
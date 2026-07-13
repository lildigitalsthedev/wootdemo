import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState, useRef } from "react";
import { ArrowLeft, Camera, Paperclip, Phone, Send, ShoppingBag, Video } from "lucide-react";
import { findBusiness } from "@/lib/mock-data";
import { BusinessAvatar } from "@/components/woot/BusinessAvatar";
import { VerifiedBadge } from "@/components/woot/Logo";

export const Route = createFileRoute("/chat/$id")({
  loader: ({ params }) => {
    const b = findBusiness(params.id);
    if (!b) throw notFound();
    return { b };
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.b.name} · Chat` : "Chat" }] }),
  component: ChatPage,
});

type Msg = { id: string; from: "me" | "them"; text: string; time: string };

function ChatPage() {
  const { b } = Route.useLoaderData();
  const navigate = useNavigate();
  const scroller = useRef<HTMLDivElement>(null);
  const initial: Msg[] = useMemo(() => ([
    { id: "m1", from: "them", text: `Hey! Thanks for reaching out to ${b.name} 👋`, time: "9:38 AM" },
    { id: "m2", from: "them", text: "How can we help today?", time: "9:38 AM" },
    { id: "m3", from: "me", text: "Hi! Do you have the new drop in stock?", time: "9:40 AM" },
    { id: "m4", from: "them", text: "Yes — we have your size. Want me to hold a pair?", time: "9:41 AM" },
  ]), [b.name]);
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: "me", text, time }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), from: "them", text: "On it — sending you a link now ✨", time }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="mx-auto flex h-[100dvh] max-w-3xl flex-col bg-surface">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-background/85 px-3 py-3 backdrop-blur-xl">
        <button onClick={() => navigate({ to: "/dashboard/chats" })} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
          <ArrowLeft size={18} />
        </button>
        <Link to="/business/$id" params={{ id: b.id }} className="flex min-w-0 items-center gap-3">
          <BusinessAvatar b={b} size={40} rounded="rounded-full" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-[15px] font-semibold">{b.name}</span>
              {b.verified && <VerifiedBadge />}
            </div>
            <div className="text-[11px] text-muted-foreground">Active now</div>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <Link to="/call/$id" params={{ id: b.id }} className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><Phone size={16} /></Link>
          <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent"><Video size={16} /></button>
        </div>
      </header>

      <div ref={scroller} className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        <div className="mx-auto w-fit rounded-full bg-background/80 px-3 py-1 text-[11px] text-muted-foreground shadow-soft">Today</div>
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div key={m.id}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[14px] leading-relaxed shadow-soft ${m.from === "me" ? "text-primary-foreground" : "bg-card"}`}
                style={m.from === "me" ? { background: "var(--primary)", borderTopRightRadius: 8 } : { borderTopLeftRadius: 8 }}>
                {m.text}
                <div className={`mt-0.5 text-[10px] ${m.from === "me" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</div>
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl bg-card px-3 py-2 shadow-soft" style={{ borderTopLeftRadius: 8 }}>
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                    animate={{ y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
          <Link to="/business/$id" params={{ id: b.id }}
            className="flex max-w-[80%] items-center gap-3 rounded-2xl bg-card p-2.5 shadow-soft" style={{ borderTopLeftRadius: 8 }}>
            <img src={b.images[0]} className="h-14 w-14 rounded-xl object-cover" alt="" />
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold">New drop just landed</div>
              <div className="text-[11px] text-muted-foreground">Tap to view in store</div>
            </div>
            <ShoppingBag size={16} className="text-primary" />
          </Link>
        </motion.div>
      </div>

      <div className="border-t bg-background px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2 rounded-full border bg-card px-2 shadow-soft">
          <button className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-accent"><Paperclip size={16} /></button>
          <input value={draft} onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Message" className="h-11 flex-1 bg-transparent text-[14px] outline-none" />
          <button className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-accent"><Camera size={16} /></button>
          <button onClick={send} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}
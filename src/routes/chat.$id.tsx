import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState, useRef } from "react";
import { ArrowLeft, Camera, Paperclip, Phone, Send, ShoppingBag, Video, Play, MapPin, Receipt, Package, CheckCheck } from "lucide-react";
import { findBusiness, productsFor, CHATS, type Business } from "@/lib/mock-data";
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

type Msg =
  | { id: string; from: "me" | "them"; time: string; kind: "text"; text: string }
  | { id: string; from: "me" | "them"; time: string; kind: "product"; productId: string; caption: string }
  | { id: string; from: "me" | "them"; time: string; kind: "invoice"; label: string; amount: number; status: "unpaid" | "paid" }
  | { id: string; from: "me" | "them"; time: string; kind: "order"; orderId: string; status: "confirmed" | "preparing" | "shipped" | "delivered" }
  | { id: string; from: "me" | "them"; time: string; kind: "location"; label: string; address: string }
  | { id: string; from: "me" | "them"; time: string; kind: "voice"; duration: string };

const CATEGORY_OPENERS: Record<string, string> = {
  Restaurant: "Hi! Do you take reservations for tonight?",
  Cafe: "Hey — are you open right now?",
  Bakery: "Can I place an order for pickup tomorrow?",
  Hotel: "Hi, checking availability for this weekend.",
  Healthcare: "Hi, I'd like to book an appointment.",
  Pharmacy: "Do you have my prescription ready?",
  "Real Estate": "Hi, is the listing still available?",
  Mechanic: "My car's making a noise — can I bring it in?",
  Cleaning: "Can I book a deep clean for next week?",
  Repairs: "I have a small repair job, are you available?",
  Construction: "We're planning a renovation, can we chat?",
  Photography: "Hi! Do you have availability next month?",
  Education: "Hi, I'd like to learn more about your program.",
  Beauty: "Do you have any openings this week?",
  Barber: "Can I book a cut for Wednesday?",
  Spa: "Hi, what packages do you offer?",
  Phones: "Hi, do you have this model in stock?",
  Electronics: "Can you fix a cracked screen?",
  Cars: "Is the listed vehicle still available?",
  Auto: "Can I book a detail this week?",
  Furniture: "Hi, is this piece available in a different finish?",
};

function buildConversation(b: Business, attachment?: string): Msg[] {
  const products = productsFor(b.id);
  const p0 = products[0];
  const opener = CATEGORY_OPENERS[b.category] ?? "Hi! Do you have the new drop in stock?";
  const msgs: Msg[] = [
    { id: "m1", from: "them", kind: "text", text: `Hey! Thanks for reaching out to ${b.name} 👋`, time: "9:38 AM" },
    { id: "m2", from: "them", kind: "text", text: "How can we help today?", time: "9:38 AM" },
    { id: "m3", from: "me", kind: "text", text: opener, time: "9:40 AM" },
    { id: "m4", from: "them", kind: "text", text: "Yes — let me pull that up for you.", time: "9:41 AM" },
  ];
  if (p0) {
    msgs.push({ id: "m5", from: "them", kind: "product", productId: p0.id, caption: "Here's what we've got available", time: "9:42 AM" });
  }
  if (attachment === "invoice") {
    msgs.push({ id: "m6", from: "them", kind: "invoice", label: `${b.name} — Order #WT-${1000 + b.name.length}`, amount: p0 ? p0.price + 12 : 48, status: "unpaid", time: "9:44 AM" });
  } else if (attachment === "order") {
    msgs.push({ id: "m6", from: "them", kind: "order", orderId: `#WT-${2000 + b.name.length}`, status: "shipped", time: "9:44 AM" });
  } else if (attachment === "location") {
    msgs.push({ id: "m6", from: "them", kind: "location", label: b.name, address: b.location, time: "9:44 AM" });
  } else if (attachment === "voice") {
    msgs.push({ id: "m6", from: "them", kind: "voice", duration: "0:24", time: "9:44 AM" });
  } else {
    msgs.push({ id: "m6", from: "them", kind: "text", text: "Want me to hold that for you?", time: "9:44 AM" });
  }
  return msgs;
}

function ChatPage() {
  const { b } = Route.useLoaderData();
  const navigate = useNavigate();
  const scroller = useRef<HTMLDivElement>(null);
  const chatMeta = useMemo(() => CHATS.find((c) => c.businessId === b.id), [b.id]);
  const initial: Msg[] = useMemo(() => buildConversation(b, chatMeta?.attachment), [b, chatMeta]);
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
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: "me", kind: "text", text, time }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), from: "them", kind: "text", text: "On it — sending you a link now ✨", time }]);
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
            <div className="text-[11px] text-muted-foreground">{b.openNow ? "Active now" : "Away · " + b.hours}</div>
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
              <MessageBubble m={m} b={b} />
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
      </div>

      <div className="border-t bg-background px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2 rounded-full border bg-card px-2 shadow-soft transition-colors focus-within:border-primary">
          <button className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-transform hover:scale-105 hover:bg-accent"><Paperclip size={16} /></button>
          <input value={draft} onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Message" className="h-11 flex-1 bg-transparent text-[14px] outline-none" />
          <button className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-transform hover:scale-105 hover:bg-accent"><Camera size={16} /></button>
          <button onClick={send} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105 active:scale-95"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ m, b }: { m: Msg; b: Business }) {
  const mine = m.from === "me";
  const bubbleBase = "max-w-[78%] shadow-soft";
  const timeStamp = (
    <div className={`mt-0.5 flex items-center gap-1 text-[10px] ${mine ? "text-white/70" : "text-muted-foreground"}`}>
      {m.time}{mine && <CheckCheck size={12} />}
    </div>
  );

  if (m.kind === "text") {
    return (
      <div className={`${bubbleBase} rounded-2xl px-3.5 py-2 text-[14px] leading-relaxed ${mine ? "text-primary-foreground" : "bg-card"}`}
        style={mine ? { background: "var(--primary)", borderTopRightRadius: 8 } : { borderTopLeftRadius: 8 }}>
        {m.text}
        {timeStamp}
      </div>
    );
  }

  if (m.kind === "product") {
    const p = productsFor(b.id).find((x) => x.id === m.productId);
    if (!p) return null;
    return (
      <Link to="/business/$id" params={{ id: b.id }}
        className={`${bubbleBase} flex items-center gap-3 rounded-2xl bg-card p-2.5 transition-transform hover:-translate-y-0.5`}
        style={{ borderTopLeftRadius: mine ? undefined : 8, borderTopRightRadius: mine ? 8 : undefined }}>
        <img src={p.image} className="h-14 w-14 rounded-xl object-cover" alt="" />
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold">{p.name}</div>
          <div className="text-[11px] text-muted-foreground">${p.price} · {m.caption}</div>
        </div>
        <ShoppingBag size={16} className="shrink-0 text-primary" />
      </Link>
    );
  }

  if (m.kind === "invoice") {
    return (
      <div className={`${bubbleBase} w-64 overflow-hidden rounded-2xl border bg-card`} style={{ borderTopLeftRadius: mine ? undefined : 8 }}>
        <div className="flex items-center gap-2 border-b bg-accent/40 px-3.5 py-2.5">
          <Receipt size={14} className="text-primary" />
          <span className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Invoice</span>
        </div>
        <div className="px-3.5 py-3">
          <div className="text-[13px] font-semibold">{m.label}</div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-black tracking-tight">${m.amount}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
              {m.status === "paid" ? "Paid" : "Unpaid"}
            </span>
          </div>
          {m.status === "unpaid" && (
            <button className="mt-2.5 w-full rounded-full bg-primary py-2 text-[12px] font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">Pay now</button>
          )}
        </div>
        <div className="border-t px-3.5 py-1.5 text-[10px] text-muted-foreground">{m.time}</div>
      </div>
    );
  }

  if (m.kind === "order") {
    const steps = ["confirmed", "preparing", "shipped", "delivered"] as const;
    const idx = steps.indexOf(m.status);
    return (
      <div className={`${bubbleBase} w-64 overflow-hidden rounded-2xl border bg-card`} style={{ borderTopLeftRadius: mine ? undefined : 8 }}>
        <div className="flex items-center gap-2 border-b bg-accent/40 px-3.5 py-2.5">
          <Package size={14} className="text-primary" />
          <span className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">Order {m.orderId}</span>
        </div>
        <div className="px-3.5 py-3">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-1 last:flex-none">
                <span className="h-1.5 flex-1 rounded-full" style={{ background: i <= idx ? "var(--primary)" : "var(--border)" }} />
              </div>
            ))}
          </div>
          <div className="mt-2 text-[12px] font-semibold capitalize">{m.status}</div>
        </div>
        <div className="border-t px-3.5 py-1.5 text-[10px] text-muted-foreground">{m.time}</div>
      </div>
    );
  }

  if (m.kind === "location") {
    return (
      <div className={`${bubbleBase} w-64 overflow-hidden rounded-2xl border bg-card`} style={{ borderTopLeftRadius: mine ? undefined : 8 }}>
        <div className="grid h-24 place-items-center bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_70%)] bg-accent/30">
          <MapPin size={22} className="text-primary" />
        </div>
        <div className="px-3.5 py-2.5">
          <div className="text-[13px] font-semibold">{m.label}</div>
          <div className="text-[11px] text-muted-foreground">{m.address}</div>
        </div>
        <div className="border-t px-3.5 py-1.5 text-[10px] text-muted-foreground">{m.time}</div>
      </div>
    );
  }

  // voice
  return (
    <div className={`${bubbleBase} flex w-56 items-center gap-2.5 rounded-2xl px-3.5 py-2.5 ${mine ? "text-primary-foreground" : "bg-card"}`}
      style={mine ? { background: "var(--primary)", borderTopRightRadius: 8 } : { borderTopLeftRadius: 8 }}>
      <button className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${mine ? "bg-white/20" : "bg-primary text-primary-foreground"}`}>
        <Play size={13} fill="currentColor" />
      </button>
      <div className="flex flex-1 items-center gap-[2px]">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={`w-[2px] rounded-full ${mine ? "bg-white/50" : "bg-muted-foreground/40"}`} style={{ height: 4 + ((i * 7) % 12) }} />
        ))}
      </div>
      <span className={`shrink-0 text-[11px] ${mine ? "text-white/80" : "text-muted-foreground"}`}>{m.duration}</span>
    </div>
  );
}
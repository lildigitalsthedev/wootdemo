import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing, MessageCircle, Video } from "lucide-react";
import { CALLS, type Business } from "@/lib/mock-data";
import { BusinessAvatar } from "@/components/woot/BusinessAvatar";
import { VerifiedBadge } from "@/components/woot/Logo";

/**
 * Desktop right-pane companion for a selected call in the Calls list. This is distinct
 * from /call/$id (the full-screen *active* in-call UI with mute/mic/video controls) —
 * this pane shows historical context for a *past* call, similar to clicking a call log
 * entry in WhatsApp Web: contact summary, full call history with them, and quick actions
 * to call back or message, not a live call session.
 */
export function CallDetail({ b }: { b: Business }) {
  const history = CALLS.filter((c) => c.businessId === b.id);

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex flex-col items-center gap-3 border-b px-6 py-10 text-center">
        <BusinessAvatar b={b} size={88} rounded="rounded-3xl" />
        <div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[19px] font-bold">{b.name}</span>
            {b.verified && <VerifiedBadge />}
          </div>
          <div className="mt-0.5 text-[13px] text-muted-foreground">{b.category} · {b.location}</div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Link to="/call/$id" params={{ id: b.id }}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] active:scale-95">
            <Phone size={15} /> Voice call
          </Link>
          <Link to="/call/$id" params={{ id: b.id }}
            className="flex items-center gap-2 rounded-full border bg-background px-4 py-2.5 text-[13px] font-semibold transition-transform hover:scale-[1.03] hover:bg-accent active:scale-95">
            <Video size={15} /> Video call
          </Link>
          <Link to="/chat/$id" params={{ id: b.id }}
            className="grid h-10 w-10 place-items-center rounded-full border bg-background transition-transform hover:scale-105 hover:bg-accent active:scale-95">
            <MessageCircle size={15} />
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Call history</div>
        <ul className="mt-2 divide-y">
          {history.map((c, i) => {
            const Icon = c.missed ? PhoneMissed : c.type === "outgoing" ? PhoneOutgoing : PhoneIncoming;
            const color = c.missed ? "text-red-500" : "text-muted-foreground";
            return (
              <motion.li key={c.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between gap-3 py-3">
                <span className={`inline-flex items-center gap-1.5 text-[13px] ${color}`}>
                  <Icon size={13} />
                  {c.missed ? "Missed" : c.type === "outgoing" ? "Outgoing" : "Incoming"} {c.mode === "video" ? "video call" : "call"}
                </span>
                <span className="text-[12px] text-muted-foreground">{c.time}</span>
              </motion.li>
            );
          })}
          {history.length === 0 && (
            <li className="py-8 text-center text-[13px] text-muted-foreground">No call history with {b.name} yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

import { PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CALLS, findBusiness } from "@/lib/mock-data";
import { BusinessAvatar } from "./BusinessAvatar";

export function CallsView() {
  return (
    <ul className="divide-y">
      {CALLS.map((c) => {
        const b = findBusiness(c.businessId)!;
        const Icon = c.missed ? PhoneMissed : c.type === "outgoing" ? PhoneOutgoing : PhoneIncoming;
        const color = c.missed ? "text-red-500" : "text-muted-foreground";
        return (
          <li key={c.id}>
            <Link to="/call/$id" params={{ id: b.id }} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 hover:bg-accent/60">
              <BusinessAvatar b={b} rounded="rounded-full" size={48} />
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold">{b.name}</div>
                <div className={`inline-flex items-center gap-1 text-[12px] ${color}`}>
                  <Icon size={12} /> {c.missed ? "Missed" : c.type === "outgoing" ? "Outgoing" : "Incoming"} · {c.time}
                </div>
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-full border bg-background text-primary hover:bg-accent"><PhoneOutgoing size={14} /></button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
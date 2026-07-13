import { Link } from "@tanstack/react-router";
import { MapPin, Star, MessageCircle, ShoppingBag, Phone } from "lucide-react";
import { motion } from "motion/react";
import { BusinessAvatar } from "./BusinessAvatar";
import { ImageSlideshow } from "./ImageSlideshow";
import { VerifiedBadge } from "./Logo";
import type { Business } from "@/lib/mock-data";

export function BusinessCard({ b, expanded = false }: { b: Business; expanded?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden rounded-3xl border bg-card shadow-soft"
    >
      <ImageSlideshow images={b.images} className="aspect-[16/9]" />
      <div className="p-4">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
          <BusinessAvatar b={b} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[15px] font-semibold">{b.name}</h3>
              {b.verified && <VerifiedBadge />}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-muted-foreground">
              <span className="truncate">{b.category}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-0.5"><MapPin size={11} />{b.location}</span>
              <span>·</span>
              <span>{b.distance}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 text-[13px] font-semibold">
              <Star size={12} fill="currentColor" className="text-amber-500" />
              {b.rating.toFixed(1)}
            </div>
            <div className="text-[11px] text-muted-foreground">{b.reviews.toLocaleString()} reviews</div>
          </div>
        </div>
        {expanded && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-[13px] leading-relaxed text-muted-foreground"
          >
            {b.description}
          </motion.p>
        )}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Link
            to="/chat/$id"
            params={{ id: b.id }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-[13px] font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            <MessageCircle size={14} /> Chat
          </Link>
          <Link
            to="/business/$id"
            params={{ id: b.id }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border bg-background py-2.5 text-[13px] font-semibold hover:bg-accent"
          >
            <ShoppingBag size={14} /> Shop
          </Link>
          <Link
            to="/call/$id"
            params={{ id: b.id }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border bg-background py-2.5 text-[13px] font-semibold hover:bg-accent"
          >
            <Phone size={14} /> Call
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
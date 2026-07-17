import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Heart, Search, ShoppingCart, Star, X } from "lucide-react";
import { AppShell } from "@/components/woot/AppShell";
import { PageTransition } from "@/components/woot/PageTransition";
import { Fab } from "@/components/woot/Fab";
import { Modal } from "@/components/woot/Modal";
import {
  BUSINESSES,
  PRODUCTS,
  findBusiness,
  useCart,
  addToCart,
  removeFromCart,
  toggleFavoriteProduct,
  toggleFavoriteCategory,
  redeemCartCode,
  currentCartCode,
} from "@/lib/mock-data";

export const Route = createFileRoute("/customer/shop")({
  head: () => ({ meta: [{ title: "Shop — Woot" }] }),
  component: CustomerShop,
});

type ShopModal = "cart" | "redeem" | null;

function CustomerShop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [modal, setModal] = useState<ShopModal>(null);
  const [redeemInput, setRedeemInput] = useState("");
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const cart = useCart();

  const cats = useMemo(() => ["All", ...Array.from(new Set(BUSINESSES.map((b) => b.category)))], []);
  const items = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const b = findBusiness(p.businessId)!;
      if (cat !== "All" && b.category !== cat) return false;
      if (q && !`${p.name} ${b.name}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    }).slice(0, 60);
  }, [q, cat]);

  const cartCount = cart.lines.reduce((sum, l) => sum + l.qty, 0);

  const handleRedeem = () => {
    const result = redeemCartCode(redeemInput);
    if (result.ok) {
      setRedeemInput("");
      setRedeemError(null);
      setModal("cart");
    } else {
      setRedeemError(result.error);
    }
  };

  return (
    <AppShell title="Shop" base="customer">
      <PageTransition>
        <div className="px-4 pt-2">
          <div className="flex items-center gap-2 rounded-full border bg-card px-3 shadow-soft">
            <Search size={16} className="text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands, shops"
              className="h-11 flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4">
          {cats.map((c) => {
            const active = cat === c;
            const isFavorite = c !== "All" && cart.favoriteCategories.has(c);
            return (
              <button key={c} onClick={() => setCat(c)}
                className="relative shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold"
                style={{ background: active ? "var(--primary)" : "var(--card)", color: active ? "white" : "var(--foreground)", borderColor: active ? "transparent" : "var(--border)" }}>
                <span className="inline-flex items-center gap-1">
                  {c}
                  {isFavorite && <Star size={10} className="fill-current text-amber-400" />}
                </span>
              </button>
            );
          })}
        </div>
        {cat !== "All" && (
          <div className="px-4 pt-2">
            <button
              onClick={() => toggleFavoriteCategory(cat)}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold hover:bg-accent"
            >
              <Star size={12} className={cart.favoriteCategories.has(cat) ? "fill-current text-amber-400" : "text-muted-foreground"} />
              {cart.favoriteCategories.has(cat) ? "Favorited category" : "Favorite this category"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
          {items.map((p) => {
            const b = findBusiness(p.businessId)!;
            const isFavorite = cart.favoriteProductIds.has(p.id);
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-3xl border bg-card shadow-soft">
                <div className="relative">
                  <Link to="/business/$id" params={{ id: b.id }} className="block">
                    <div className="relative aspect-square overflow-hidden">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                      {p.tag && <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">{p.tag}</span>}
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleFavoriteProduct(p.id)}
                    aria-label="Favorite"
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/85 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart size={14} className={isFavorite ? "fill-current text-red-500" : "text-foreground"} />
                  </button>
                </div>
                <div className="p-3">
                  <Link to="/business/$id" params={{ id: b.id }}>
                    <div className="truncate text-[13px] font-semibold">{p.name}</div>
                    <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{b.name}</div>
                  </Link>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[13px] font-bold">${p.price}</span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground">
                      <Star size={10} className="text-amber-500" fill="currentColor" /> {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(p.id)}
                    className="mt-2 w-full rounded-full border py-1.5 text-[11px] font-semibold hover:bg-accent"
                  >
                    Add to cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </PageTransition>

      {/* Mobile / tablet only. Customers don't create shops, so this FAB is
          scoped to what a customer actually does here: manage their cart
          and redeem a cart code a friend sent them — not "add a new shop". */}
      <div className="lg:hidden">
        <Fab
          actions={[
            { label: `Cart (${cartCount})`, icon: ShoppingCart, onClick: () => setModal("cart") },
            { label: "Redeem cart code", icon: Star, onClick: () => setModal("redeem"), tint: "#7c3aed" },
          ]}
        />
      </div>

      <Modal
        open={modal === "cart"}
        onClose={() => setModal(null)}
        title="Your Cart"
        footer={
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-muted-foreground">{cartCount} item{cartCount === 1 ? "" : "s"}</span>
            <button onClick={() => setModal(null)} disabled={cartCount === 0} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft disabled:opacity-40">
              Checkout
            </button>
          </div>
        }
      >
        <div className="p-4">
          {cart.lines.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Your cart is empty. Add products, or redeem a cart code a friend sent you.
            </div>
          ) : (
            <ul className="divide-y">
              {cart.lines.map((line) => {
                const p = PRODUCTS.find((pr) => pr.id === line.productId);
                if (!p) return null;
                const b = findBusiness(p.businessId)!;
                return (
                  <li key={line.productId} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
                    <img src={p.image} className="h-12 w-12 rounded-xl object-cover" alt="" />
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-semibold">{p.name}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{b.name} · Qty {line.qty}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold">${(p.price * line.qty).toFixed(0)}</span>
                      <button onClick={() => removeFromCart(line.productId)} aria-label="Remove" className="grid h-7 w-7 place-items-center rounded-full hover:bg-accent">
                        <X size={14} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {cart.lines.length > 0 && (
            <div className="mt-4 rounded-2xl border bg-card p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Share this cart</div>
              <div className="mt-1.5 flex items-center gap-2">
                <input readOnly value={currentCartCode()} className="h-9 flex-1 truncate rounded-xl border bg-background px-2.5 text-xs outline-none" />
                <button
                  onClick={() => navigator.clipboard?.writeText(currentCartCode())}
                  className="shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold hover:bg-accent"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        open={modal === "redeem"}
        onClose={() => setModal(null)}
        title="Redeem Cart Code"
        footer={
          <div className="flex justify-end">
            <button onClick={handleRedeem} disabled={!redeemInput.trim()} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft disabled:opacity-40">
              Add to my cart
            </button>
          </div>
        }
      >
        <div className="space-y-3 p-4">
          <p className="text-sm text-muted-foreground">
            Got a cart code from a friend? Paste it below to add their picks straight to your cart.
          </p>
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cart code</label>
            <input
              autoFocus
              value={redeemInput}
              onChange={(e) => {
                setRedeemInput(e.target.value);
                setRedeemError(null);
              }}
              placeholder="Paste cart code here"
              className="mt-1.5 h-11 w-full rounded-2xl border bg-card px-3 text-sm outline-none focus:border-primary"
            />
            {redeemError && <p className="mt-1.5 text-xs text-red-500">{redeemError}</p>}
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/woot/AppShell";
import { PageTransition } from "@/components/woot/PageTransition";
import { MarketplaceView } from "@/components/woot/Marketplace";

export const Route = createFileRoute("/customer/shop")({
  head: () => ({ meta: [{ title: "Shop — Woot" }] }),
  component: CustomerShop,
});

function CustomerShop() {
  return (
    <AppShell title="Shop" base="customer">
      <PageTransition>
        <MarketplaceView />
      </PageTransition>
    </AppShell>
  );
}

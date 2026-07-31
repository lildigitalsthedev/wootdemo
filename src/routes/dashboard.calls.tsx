import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AppShell } from "@/components/woot/AppShell";
import { CallsView } from "@/components/woot/CallsView";
import { PageTransition } from "@/components/woot/PageTransition";
import { CallDetail } from "@/components/woot/CallDetail";
import { findBusiness } from "@/lib/mock-data";
import { Phone } from "lucide-react";

const search = z.object({ call: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/dashboard/calls")({
  head: () => ({ meta: [{ title: "Calls — Glode" }] }),
  validateSearch: search,
  component: CallsRoute,
});

function CallsRoute() {
  const { call } = Route.useSearch();
  const activeBusiness = call ? findBusiness(call) : undefined;

  return (
    <AppShell title="Calls" base="dashboard" noPadX>
      <div className="md:hidden">
        <PageTransition><CallsView base="dashboard" /></PageTransition>
      </div>
      <div className="hidden min-h-0 flex-1 md:flex">
        <div className="relative w-[340px] shrink-0 overflow-y-auto border-r">
          <CallsView activeId={activeBusiness?.id} base="dashboard" />
        </div>
        <div className="min-w-0 flex-1">
          {activeBusiness ? (
            <CallDetail key={activeBusiness.id} b={activeBusiness} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <Phone size={40} strokeWidth={1.5} />
              <p className="text-sm">Select a call to see details</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

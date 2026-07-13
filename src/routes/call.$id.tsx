import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Mic, MicOff, Phone, Video, VideoOff, Volume2 } from "lucide-react";
import { findBusiness } from "@/lib/mock-data";
import { BusinessAvatar } from "@/components/woot/BusinessAvatar";

export const Route = createFileRoute("/call/$id")({
  loader: ({ params }) => {
    const b = findBusiness(params.id);
    if (!b) throw notFound();
    return { b };
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `Calling ${loaderData.b.name}` : "Call" }] }),
  component: CallPage,
});

function CallPage() {
  const { b } = Route.useLoaderData();
  const navigate = useNavigate();
  const [secs, setSecs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [video, setVideo] = useState(false);
  useEffect(() => { const t = setInterval(() => setSecs((s) => s + 1), 1000); return () => clearInterval(t); }, []);
  const fmt = (n: number) => `${Math.floor(n / 60).toString().padStart(2, "0")}:${(n % 60).toString().padStart(2, "0")}`;
  return (
    <div className="relative mx-auto flex h-[100dvh] max-w-3xl flex-col justify-between overflow-hidden text-white"
      style={{ background: "radial-gradient(ellipse at top, #1e293b, #020617)" }}>
      <img src={b.cover} className="absolute inset-0 h-full w-full object-cover opacity-40" alt="" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col items-center gap-5 px-4 pt-16">
        <div className="text-xs uppercase tracking-widest text-white/70">In call · Woot</div>
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 240, damping: 20 }}>
          <div className="grid h-32 w-32 place-items-center rounded-[2rem] shadow-card ring-8 ring-white/10">
            <BusinessAvatar b={b} size={110} rounded="rounded-[1.6rem]" />
          </div>
        </motion.div>
        <div className="text-center">
          <div className="text-2xl font-black tracking-tight">{b.name}</div>
          <div className="mt-1 text-sm text-white/70">{fmt(secs)}</div>
        </div>
      </div>

      <div className="relative mx-auto mb-10 flex w-full max-w-md items-center justify-between gap-3 px-6">
        <button onClick={() => setMuted((v) => !v)} className="grid h-14 w-14 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20">
          {muted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button onClick={() => setVideo((v) => !v)} className="grid h-14 w-14 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20">
          {video ? <Video size={20} /> : <VideoOff size={20} />}
        </button>
        <button className="grid h-14 w-14 place-items-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20">
          <Volume2 size={20} />
        </button>
        <button onClick={() => navigate({ to: "/dashboard/calls" })} className="grid h-14 w-16 place-items-center rounded-full bg-red-500 shadow-card transition hover:bg-red-600">
          <Phone size={20} className="rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
}
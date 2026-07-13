import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function ImageSlideshow({ images, className = "", interval = 2600 }: { images: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={i}
          src={images[i]}
          alt=""
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </AnimatePresence>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <span key={idx} className="h-1 rounded-full transition-all"
            style={{ width: idx === i ? 14 : 6, background: idx === i ? "white" : "rgba(255,255,255,0.6)" }} />
        ))}
      </div>
    </div>
  );
}
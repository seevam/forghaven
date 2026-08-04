"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const features = [
  { icon: "🌾", title: "Local Grain", body: "Six partner farms supply our malt within a 120-mile radius." },
  { icon: "🍺", title: "Open Fermentation", body: "Old-world technique, copper vessels, unhurried timelines." },
  { icon: "🪵", title: "Barrel Aged", body: "Oregon bourbon and rye barrels for seasonal reserves." },
  { icon: "🏔", title: "Mountain Water", body: "Cascade snowmelt — naturally filtered, mineral-balanced." },
];

function FeatureCard({ item, i }: { item: typeof features[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="p-5 border"
      style={{ borderColor: "var(--divider)", background: "rgba(200,132,58,0.03)" }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ borderColor: "rgba(200,132,58,0.3)", background: "rgba(200,132,58,0.06)" }}
    >
      <div className="text-2xl mb-3">{item.icon}</div>
      <h4 className="font-display font-semibold mb-2" style={{ color: "var(--offwhite)" }}>{item.title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: "var(--parchment-dim)" }}>{item.body}</p>
    </motion.div>
  );
}

const headingLines: React.ReactNode[] = [
  "Rooted in valley soil.",
  <><em className="italic" style={{ color: "var(--amber)" }}>Refined by fire.</em></>,
];

export default function Heritage() {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="heritage"
      ref={ref}
      className="px-8 md:px-14 py-24 md:py-36 grid md:grid-cols-2 gap-16 md:gap-24 items-center"
      style={{ background: "var(--charcoal-mid)" }}
    >
      {/* Image side */}
      <div className="relative overflow-hidden" ref={imgRef}>
        {/* Clip-path reveal wrapper */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <motion.div
            className="relative w-full"
            style={{ height: "clamp(320px, 60vh, 600px)", y: imgY, scale: 1.15 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=900&q=80"
              alt="Heritage brewing"
              fill
              className="object-cover"
              style={{ filter: "sepia(0.2) brightness(0.82)" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>

        {/* Years badge */}
        <motion.div
          className="absolute top-8 -right-4 md:-right-6 px-6 py-5 text-center"
          style={{ background: "var(--amber)" }}
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="font-display font-black text-3xl leading-none" style={{ color: "var(--charcoal)" }}>15</div>
          <div className="text-[10px] tracking-widest uppercase mt-1.5 font-semibold" style={{ color: "var(--charcoal)" }}>
            Years<br />Brewing
          </div>
        </motion.div>

        {/* Accent image — clip-path reveal from bottom */}
        <motion.div
          className="absolute -bottom-8 -left-4 md:-left-6 w-2/5 border-4 overflow-hidden"
          style={{ height: "clamp(120px, 22vh, 200px)", borderColor: "var(--charcoal-mid)" }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1571767454098-246b94fbcf70?w=500&q=80"
            alt="Copper kettles"
            fill
            className="object-cover"
            style={{ filter: "sepia(0.15) brightness(0.85)" }}
            sizes="20vw"
          />
        </motion.div>
      </div>

      {/* Text side */}
      <div>
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="block w-10 h-px" style={{ background: "var(--amber)" }} />
          <span className="text-[11px] tracking-[0.28em] uppercase font-medium" style={{ color: "var(--amber)" }}>
            Heritage
          </span>
        </motion.div>

        {/* Line-by-line masked heading */}
        <h2
          className="font-display font-bold leading-tight mb-7"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "var(--offwhite)" }}
        >
          {headingLines.map((line, i) => (
            <span key={i} style={{ display: "block", overflow: "hidden" }}>
              <motion.span
                style={{ display: "block" }}
                initial={{ y: "108%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.2 + i * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          className="leading-relaxed mb-7 font-light"
          style={{ color: "var(--parchment-dim)", fontSize: "0.95rem" }}
          initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Forgehaven began in a converted blacksmith&apos;s shed in 2009, with two copper kettles,
          a water source fed by the Cascade foothills, and a single-minded obsession with making
          beer that tastes like somewhere specific.
        </motion.p>

        <motion.p
          className="leading-relaxed mb-10 font-light"
          style={{ color: "var(--parchment-dim)", fontSize: "0.95rem" }}
          initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          Every grain we use is sourced within 120 miles. Every recipe is tested until it stops being
          a recipe and starts being a place. That has never changed.
        </motion.p>

        <div className="grid grid-cols-2 gap-4">
          {features.map((f, i) => <FeatureCard key={f.title} item={f} i={i} />)}
        </div>
      </div>
    </section>
  );
}

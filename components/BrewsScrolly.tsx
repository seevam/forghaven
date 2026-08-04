"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const brews = [
  {
    index: "I",
    type: "Amber Ale",
    name: "Coppersmith Reserve",
    year: "2024",
    desc: "A deep amber with toasted caramel malt, dried fig, and a whisper of smoked oak at the finish. Brewed slow in open copper vessels — the way it was always meant to be done.",
    notes: ["Caramel Malt", "Dried Fig", "Smoked Oak"],
    abv: "5.8%",
    ibu: "32",
    season: "Year-round",
    color: "#C8843A",
    bg: "rgba(200,132,58,0.06)",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
  {
    index: "II",
    type: "Pale Lager",
    name: "Valley Floor Lager",
    year: "2024",
    desc: "Crisp, clean, deceptively complex. Oregon valley barley gives this lager a delicate sweetness balanced by floral Cascade hops. Cold-conditioned for 6 weeks.",
    notes: ["Floral Hops", "Barley Sweet", "Crisp Finish"],
    abv: "4.4%",
    ibu: "18",
    season: "Summer - Fall",
    color: "#DFA05A",
    bg: "rgba(223,160,90,0.05)",
    img: "https://images.unsplash.com/photo-1608270586620?w=900&q=80",
  },
  {
    index: "III",
    type: "Imperial Stout",
    name: "Ironveil Dark",
    year: "2023",
    desc: "Black as a moonless night, with roasted espresso, bittersweet chocolate and a long warming finish. Aged 90 days in bourbon barrels from a distillery two valleys over.",
    notes: ["Espresso", "Dark Chocolate", "Bourbon Barrel"],
    abv: "11.2%",
    ibu: "65",
    season: "Winter",
    color: "#8B6347",
    bg: "rgba(139,99,71,0.07)",
    img: "https://images.unsplash.com/photo-1436076863939?w=900&q=80",
  },
];

export default function BrewsScrolly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update active brew based on scroll
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * brews.length), brews.length - 1);
      setActiveIndex(Math.max(0, idx));
    });
    return unsub;
  }, [scrollYProgress]);

  const brew = brews[activeIndex];

  return (
    <section id="brews" ref={containerRef} style={{ height: `${brews.length * 100}vh` }}>
      {/* Sticky panel */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Section label */}
        <div
          className="absolute top-24 left-8 md:left-14 z-10 flex items-center gap-4"
        >
          <span className="block w-10 h-px" style={{ background: "var(--amber)" }} />
          <span className="text-[11px] tracking-[0.28em] uppercase font-medium" style={{ color: "var(--amber)" }}>
            Our Brews
          </span>
        </div>

        {/* Brew index dots */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {brews.map((b, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                background: i === activeIndex ? "var(--amber)" : "rgba(200,132,58,0.3)",
                transform: i === activeIndex ? "scale(1.6)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Animated background tint */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            style={{ background: brew.bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        {/* Main content grid */}
        <div className="relative z-10 h-full grid md:grid-cols-2 items-center px-8 md:px-14 pt-28 pb-16 gap-10 md:gap-20">
          {/* Left: Text */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="flex items-baseline gap-4 mb-5">
                  <span
                    className="font-display font-black opacity-20"
                    style={{ fontSize: "clamp(5rem, 10vw, 9rem)", color: brew.color, lineHeight: 1 }}
                  >
                    {brew.index}
                  </span>
                  <span
                    className="text-[11px] tracking-[0.24em] uppercase font-medium"
                    style={{ color: brew.color }}
                  >
                    {brew.type}
                  </span>
                </div>

                <h2
                  className="font-display font-bold leading-tight mb-5"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--offwhite)" }}
                >
                  {brew.name}
                </h2>

                <p
                  className="leading-relaxed mb-8 font-light text-base md:text-lg"
                  style={{ color: "var(--parchment-dim)", maxWidth: 480 }}
                >
                  {brew.desc}
                </p>

                {/* Tasting tags */}
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {brew.notes.map((n) => (
                    <span
                      key={n}
                      className="text-[11px] tracking-widest uppercase px-3.5 py-1.5 border"
                      style={{ borderColor: "rgba(200,132,58,0.3)", color: "var(--parchment-dim)" }}
                    >
                      {n}
                    </span>
                  ))}
                </div>

                {/* Spec row */}
                <div className="flex gap-8">
                  {[
                    { label: "ABV", val: brew.abv },
                    { label: "IBU", val: brew.ibu },
                    { label: "Season", val: brew.season },
                  ].map((s) => (
                    <div key={s.label}>
                      <div
                        className="text-[10px] tracking-widest uppercase mb-1"
                        style={{ color: "var(--parchment-dim)" }}
                      >
                        {s.label}
                      </div>
                      <div
                        className="font-medium text-sm"
                        style={{ color: "var(--offwhite)" }}
                      >
                        {s.val}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative hidden md:block"
              initial={{ opacity: 0, scale: 0.92, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div
                className="absolute -top-4 -left-4 w-full h-full"
                style={{ border: `1px solid ${brew.color}22` }}
              />
              <div className="relative w-full" style={{ height: "clamp(280px, 55vh, 500px)" }}>
                <Image
                  src={brew.img}
                  alt={brew.name}
                  fill
                  className="object-cover"
                  style={{ filter: "brightness(0.85) sepia(0.1)" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Year badge */}
              <div
                className="absolute bottom-0 right-0 px-5 py-4 text-center"
                style={{ background: brew.color }}
              >
                <div className="font-display font-black text-xl leading-none" style={{ color: "var(--charcoal)" }}>
                  {brew.year}
                </div>
                <div className="text-[10px] tracking-widest uppercase mt-1 font-semibold" style={{ color: "var(--charcoal)" }}>
                  Vintage
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom scroll hint */}
        <div
          className="absolute bottom-6 left-8 md:left-14 text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "var(--parchment-dim)" }}
        >
          Scroll to explore all {brews.length} brews
        </div>
      </div>
    </section>
  );
}

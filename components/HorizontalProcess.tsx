"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Malting & Milling",
    body: "Local barley is malted in-house, dried over beech wood, then milled fresh each morning. No pre-milled grain. No shortcuts.",
    icon: "🌾",
    img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&q=80",
  },
  {
    num: "02",
    title: "Mashing",
    body: "Grain meets mountain water in open copper mash tuns at precise temperatures — coaxing every sugar out slowly over 90 minutes.",
    icon: "🥣",
    img: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=700&q=80",
  },
  {
    num: "03",
    title: "Fermentation",
    body: "Open fermentation in our stone cellar. Our house yeast strain has been maintained for eleven years. It gives Forgehaven its character.",
    icon: "🫧",
    img: "https://images.unsplash.com/photo-1504227638900-c229ac9a1f34?w=700&q=80",
  },
  {
    num: "04",
    title: "Conditioning",
    body: "Cold conditioning from 21 to 90 days. Barrel aging where the recipe calls for it. Ready when it's ready — not before.",
    icon: "🪵",
    img: "https://images.unsplash.com/photo-1532634733-cae1395e440f?w=700&q=80",
  },
];

export default function HorizontalProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Translate the inner horizontal track
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(steps.length - 1) * 100}vw`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="craft" ref={containerRef} style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section label */}
        <div className="absolute top-10 left-8 md:left-14 z-10 flex items-center gap-4">
          <span className="block w-10 h-px" style={{ background: "var(--amber)" }} />
          <span className="text-[11px] tracking-[0.28em] uppercase font-medium" style={{ color: "var(--amber)" }}>
            The Craft
          </span>
        </div>

        {/* Progress bar inside section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{ background: "var(--divider)" }}
        >
          <motion.div
            className="h-full"
            style={{ background: "var(--amber)", width: progressWidth }}
          />
        </div>

        {/* Step counter */}
        <motion.div
          className="absolute top-10 right-8 md:right-14 z-10 font-display font-bold"
          style={{ color: "var(--parchment-dim)", fontSize: "0.8rem", letterSpacing: "0.12em" }}
        >
          {steps.map((_, i) => (
            <span key={i} />
          ))}
        </motion.div>

        {/* Horizontal track */}
        <motion.div
          className="flex h-full"
          style={{ x, width: `${steps.length * 100}vw` }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative w-screen h-full flex flex-col md:flex-row items-center"
              style={{ flexShrink: 0 }}
            >
              {/* Image half */}
              <div className="relative hidden md:block w-1/2 h-full overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.7) sepia(0.15)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, transparent 60%, var(--charcoal) 100%)" }}
                />
              </div>

              {/* Text half */}
              <div className="w-full md:w-1/2 px-8 md:px-20 flex flex-col justify-center py-32 md:py-0">
                <div
                  className="font-display font-black mb-6 opacity-25"
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "var(--amber)", lineHeight: 1 }}
                >
                  {step.num}
                </div>
                <div className="text-3xl mb-5">{step.icon}</div>
                <h3
                  className="font-display font-bold mb-5 leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--offwhite)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="leading-relaxed font-light"
                  style={{ color: "var(--parchment-dim)", maxWidth: 420, fontSize: "1.05rem" }}
                >
                  {step.body}
                </p>
                <div
                  className="mt-8 text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--amber)" }}
                >
                  Step {i + 1} of {steps.length}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

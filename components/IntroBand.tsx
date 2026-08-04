"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { num: 14, label: "Signature Brews" },
  { num: 6, label: "Local Farm Partners" },
  { num: 15, label: "Years of Craft" },
  { num: 120, label: "Mile Grain Radius" },
];

const lines: React.ReactNode[] = [
  <>Every grain within{" "}<em className="italic" style={{ color: "var(--amber)" }}>120 miles.</em></>,
  <>Every recipe tested until it stops being a recipe</>,
  <>and starts being a{" "}<em className="italic" style={{ color: "var(--amber)" }}>place.</em></>,
];

function Counter({ num, label, delay }: { num: number; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, num, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, num]);

  return (
    <motion.div
      ref={ref}
      className="border-l-2 pl-5"
      style={{ borderColor: "var(--amber)" }}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="font-display font-black leading-none tabular-nums"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--amber)" }}
      >
        {count}
        <span style={{ color: "var(--amber-light)", fontSize: "0.5em" }}>+</span>
      </div>
      <div className="text-[11px] tracking-[0.18em] uppercase mt-1.5" style={{ color: "var(--parchment-dim)" }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function IntroBand() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="grid md:grid-cols-2 gap-16 md:gap-24 items-center px-8 md:px-14 py-20 md:py-28"
      style={{ borderTop: "1px solid var(--divider)", borderBottom: "1px solid var(--divider)" }}
    >
      <h2
        className="font-display font-bold"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", color: "var(--offwhite)", lineHeight: 1.3 }}
      >
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block", overflow: "hidden" }}>
            <motion.span
              style={{ display: "block" }}
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.11, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      <div className="grid grid-cols-2 gap-8 md:gap-10">
        {stats.map((s, i) => (
          <Counter key={s.label} num={s.num} label={s.label} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

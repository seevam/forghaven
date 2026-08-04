"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const stats = [
  { num: "14", label: "Signature Brews" },
  { num: "6", label: "Local Farm Partners" },
  { num: "15", label: "Years of Craft" },
  { num: "120", label: "Mile Grain Radius" },
];

function Counter({ num, label }: { num: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className="border-l-2 pl-5"
      style={{ borderColor: "var(--amber)" }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div
        className="font-display font-black leading-none"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--amber)" }}
      >
        {num}
        <span style={{ color: "var(--amber-light)", fontSize: "0.5em" }}>+</span>
      </div>
      <div
        className="text-[11px] tracking-[0.18em] uppercase mt-1.5"
        style={{ color: "var(--parchment-dim)" }}
      >
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
      style={{
        borderTop: "1px solid var(--divider)",
        borderBottom: "1px solid var(--divider)",
      }}
    >
      <motion.h2
        className="font-display font-bold leading-snug"
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
          color: "var(--offwhite)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Every grain within{" "}
        <em className="italic" style={{ color: "var(--amber)" }}>
          120 miles.
        </em>{" "}
        Every recipe tested until it stops being a recipe and starts being a{" "}
        <em className="italic" style={{ color: "var(--amber)" }}>
          place.
        </em>
      </motion.h2>

      <div className="grid grid-cols-2 gap-8 md:gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Counter num={s.num} label={s.label} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

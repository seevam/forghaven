"use client";
import { motion } from "framer-motion";

const words = ["Copper", "Malt", "Patience", "Craft", "Oregon", "Barrel", "Character", "Fire"];

export default function Marquee() {
  return (
    <div
      className="relative py-10 overflow-hidden"
      style={{
        borderTop: "1px solid var(--divider)",
        borderBottom: "1px solid var(--divider)",
        background: "var(--charcoal-light)",
      }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span
              className="font-display font-black italic"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: i % 4 === 0 ? "var(--amber)" : "var(--divider)",
              }}
            >
              {w}
            </span>
            <span style={{ color: "var(--amber)", fontSize: "1.2rem" }}>&#10022;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

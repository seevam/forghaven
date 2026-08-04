"use client";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const words = ["Copper", "Malt", "Patience", "Craft", "Oregon", "Barrel", "Character", "Fire"];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xOffset = useRef(0);
  const x = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-800, 800], [-3, 3], { clamp: false });

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    const halfWidth = track ? track.scrollWidth / 2 : 0;
    if (!halfWidth) return;

    const base = 55;
    const boost = Math.abs(velocityFactor.get()) * 28;
    const speed = base + boost;

    xOffset.current -= speed * (delta / 1000);
    if (xOffset.current <= -halfWidth) xOffset.current += halfWidth;

    x.set(xOffset.current);
  });

  return (
    <div
      className="relative py-10 overflow-hidden"
      style={{
        borderTop: "1px solid var(--divider)",
        borderBottom: "1px solid var(--divider)",
        background: "var(--charcoal-light)",
      }}
    >
      <motion.div ref={trackRef} className="flex gap-12 whitespace-nowrap" style={{ x }}>
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

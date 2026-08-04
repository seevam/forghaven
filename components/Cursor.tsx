"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.6 });
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { damping: 18, stiffness: 280 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement)?.closest("a, button, [data-cursor]");
      scale.set(hit ? 1.9 : 1);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY, scale, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Dot — tracks exactly */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          background: "var(--amber)",
        }}
      />
      {/* Ring — spring lag + scale on hover */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 38,
          height: 38,
          border: "1.5px solid rgba(200,132,58,0.6)",
          scale: springScale,
        }}
      />
    </>
  );
}

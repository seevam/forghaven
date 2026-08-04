"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

function MagneticBtn({ children, href, primary }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 12, stiffness: 180 });
  const sy = useSpring(y, { damping: 12, stiffness: 180 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.22);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.22);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      <a
        href={href}
        className="text-xs tracking-widest uppercase font-semibold px-9 py-4 transition-colors duration-300 inline-block"
        style={primary
          ? { background: "var(--amber)", color: "var(--charcoal)" }
          : { color: "var(--parchment-dim)" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (primary) el.style.background = "var(--amber-light)";
          else el.style.color = "var(--parchment)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (primary) el.style.background = "var(--amber)";
          else el.style.color = "var(--parchment-dim)";
        }}
      >
        {children}
      </a>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden flex flex-col justify-end"
      style={{ minHeight: "100svh" }}
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1532634733-cae1395e440f?w=1800&q=85"
            alt="Brewery interior"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(28,26,23,0.98) 0%, rgba(28,26,23,0.5) 50%, rgba(28,26,23,0.8) 100%)",
          }}
        />
      </motion.div>

      {/* Amber pour line */}
      <div className="absolute top-0 right-[12%] w-[1px] h-full overflow-hidden pointer-events-none">
        <motion.div
          className="w-full"
          style={{ background: "linear-gradient(to bottom, transparent, var(--amber), transparent)" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.4 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>

      {/* Text content */}
      <motion.div
        className="relative z-10 px-8 md:px-14 pb-20 md:pb-28"
        style={{ y: textY, opacity }}
      >
        <motion.div
          className="flex items-center gap-4 mb-5 md:mb-7"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="block w-10 h-px" style={{ background: "var(--amber)" }} />
          <span className="text-xs tracking-[0.28em] uppercase font-medium" style={{ color: "var(--amber)" }}>
            Est. 2009 &mdash; Ashford Valley, Oregon
          </span>
        </motion.div>

        {/* Line-by-line masked h1 reveal */}
        <h1
          className="font-display font-black leading-none mb-4 md:mb-7"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--offwhite)" }}
        >
          {(["Where Craft", <>Meets{" "}<em className="italic" style={{ color: "var(--amber)" }}>Character.</em></>] as React.ReactNode[]).map((line, i) => (
            <span key={i} style={{ display: "block", overflow: "hidden" }}>
              <motion.span
                style={{ display: "block" }}
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 1 + i * 0.13, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="text-base leading-relaxed max-w-md mb-7 md:mb-11 font-light"
          style={{ color: "var(--parchment-dim)" }}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 1.35 }}
        >
          Small-batch ales and lagers brewed with old-world patience, local grain,
          and an obsessive attention to what makes great beer unforgettable.
        </motion.p>

        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <MagneticBtn href="#brews" primary>Explore Our Brews</MagneticBtn>
          <MagneticBtn href="#heritage">
            Our Story <span style={{ color: "var(--amber)" }}>&#8595;</span>
          </MagneticBtn>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 right-14 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
      >
        <span
          className="text-[10px] tracking-[0.28em] uppercase"
          style={{ color: "var(--parchment-dim)", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px"
          style={{ background: "var(--amber)", height: 48 }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

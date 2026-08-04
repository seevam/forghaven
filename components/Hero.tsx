"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

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
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=1800&q=85"
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

      {/* Amber pour line - signature animation */}
      <div className="absolute top-0 right-[12%] w-[1px] h-full overflow-hidden pointer-events-none">
        <motion.div
          className="w-full"
          style={{ background: "linear-gradient(to bottom, transparent, var(--amber), transparent)" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.4 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>

      {/* Text content with parallax */}
      <motion.div
        className="relative z-10 px-8 md:px-14 pb-20 md:pb-28"
        style={{ y: textY, opacity }}
      >
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="block w-10 h-px" style={{ background: "var(--amber)" }} />
          <span className="text-xs tracking-[0.28em] uppercase font-medium" style={{ color: "var(--amber)" }}>
            Est. 2009 &mdash; Ashford Valley, Oregon
          </span>
        </motion.div>

        <motion.h1
          className="font-display font-black leading-none mb-7"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--offwhite)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Where Craft<br />
          Meets{" "}
          <em className="italic" style={{ color: "var(--amber)" }}>
            Character.
          </em>
        </motion.h1>

        <motion.p
          className="text-base leading-relaxed max-w-md mb-11 font-light"
          style={{ color: "var(--parchment-dim)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          Small-batch ales and lagers brewed with old-world patience, local grain,
          and an obsessive attention to what makes great beer unforgettable.
        </motion.p>

        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a
            href="#brews"
            className="text-xs tracking-widest uppercase font-semibold px-9 py-4 transition-all duration-300"
            style={{ background: "var(--amber)", color: "var(--charcoal)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--amber-light)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--amber)")}
          >
            Explore Our Brews
          </a>
          <a
            href="#heritage"
            className="flex items-center gap-3 text-xs tracking-widest uppercase font-medium transition-colors duration-300"
            style={{ color: "var(--parchment-dim)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--parchment)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--parchment-dim)")}
          >
            Our Story <span style={{ color: "var(--amber)" }}>&#8595;</span>
          </a>
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

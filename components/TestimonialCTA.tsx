"use client";
import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import SplitText from "./SplitText";

function MagneticBtn({
  children,
  href,
  primary,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
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
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <a
        href={href}
        className="inline-block text-xs tracking-widest uppercase font-semibold px-10 py-4 transition-colors duration-300"
        style={primary
          ? { background: "var(--amber)", color: "var(--charcoal)" }
          : { border: "1px solid rgba(232,223,200,0.45)", color: "var(--parchment-dim)" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (primary) el.style.background = "var(--amber-light)";
          else { el.style.borderColor = "var(--parchment)"; el.style.color = "var(--offwhite)"; }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (primary) el.style.background = "var(--amber)";
          else { el.style.borderColor = "rgba(232,223,200,0.45)"; el.style.color = "var(--parchment-dim)"; }
        }}
      >
        {children}
      </a>
    </motion.div>
  );
}

const headingLines: React.ReactNode[] = [
  <>Taste the{" "}<em className="italic" style={{ color: "var(--amber)" }}>art</em></>,
  "of serious brewing.",
];

export default function TestimonialCTA() {
  const quoteRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Testimonial */}
      <section
        ref={quoteRef}
        className="px-8 md:px-14 py-24 md:py-36 text-center relative overflow-hidden"
        style={{ background: "var(--charcoal-mid)", borderTop: "1px solid rgba(200,132,58,0.15)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 font-display font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "clamp(12rem, 25vw, 22rem)", color: "rgba(200,132,58,0.04)", top: "-3rem" }}
        >
          &ldquo;
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={quoteInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Word-by-word reveal for the quote */}
          <SplitText
            className="font-display italic font-medium mx-auto mb-8 leading-snug relative"
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)",
              color: "var(--offwhite)",
              maxWidth: 780,
              textAlign: "center",
            }}
            stagger={0.03}
            delay={0.1}
            margin="-80px"
          >
            {"“Forgehaven’s Coppersmith Reserve is the kind of beer that makes you put your phone down. It asks for your full attention—and it earns it.”"}
          </SplitText>

          <motion.cite
            className="text-[11px] tracking-[0.28em] uppercase font-medium not-italic"
            style={{ color: "var(--amber)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            James Oswald, Craft Beer Quarterly
          </motion.cite>
        </motion.div>
      </section>

      {/* CTA */}
      <section
        id="find"
        ref={ctaRef}
        className="px-8 md:px-14 py-24 md:py-40 grid md:grid-cols-2 gap-14 items-center"
        style={{ borderTop: "1px solid rgba(200,132,58,0.2)" }}
      >
        <h2
          className="font-display font-black leading-tight"
          style={{ fontSize: "clamp(2rem, 4.2vw, 4rem)", color: "var(--offwhite)" }}
        >
          {headingLines.map((line, i) => (
            <span key={i} style={{ display: "block", overflow: "hidden" }}>
              <motion.span
                style={{ display: "block" }}
                initial={{ y: "108%" }}
                animate={ctaInView ? { y: 0 } : {}}
                transition={{ duration: 0.88, delay: i * 0.13, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="leading-relaxed mb-4 font-light" style={{ color: "var(--parchment-dim)" }}>
            Find Forgehaven beers at select craft retailers across the Pacific Northwest,
            or visit our taproom in Ashford Valley where all 14 brews are on tap year-round.
          </p>
          <div className="flex flex-row flex-wrap gap-4 items-center">
            <MagneticBtn href="#" primary>Find a Stockist</MagneticBtn>
            <MagneticBtn href="#">Visit the Taproom</MagneticBtn>
          </div>
        </motion.div>
      </section>
    </>
  );
}

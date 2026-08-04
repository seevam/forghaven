"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
        style={{ background: "var(--charcoal-mid)" }}
      >
        {/* Giant decorative quote mark */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 font-display font-black leading-none pointer-events-none select-none"
          style={{
            fontSize: "clamp(12rem, 25vw, 22rem)",
            color: "rgba(200,132,58,0.04)",
            top: "-3rem",
          }}
        >
          &ldquo;
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={quoteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <blockquote
            className="font-display italic font-medium mx-auto mb-8 leading-snug relative"
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)",
              color: "var(--offwhite)",
              maxWidth: 780,
            }}
          >
            &ldquo;Forgehaven&apos;s Coppersmith Reserve is the kind of beer that makes you put
            your phone down. It asks for your full attention — and it earns it.&rdquo;
          </blockquote>
          <cite
            className="text-[11px] tracking-[0.28em] uppercase font-medium not-italic"
            style={{ color: "var(--amber)" }}
          >
            James Oswald, Craft Beer Quarterly
          </cite>
        </motion.div>
      </section>

      {/* CTA */}
      <section
        id="find"
        ref={ctaRef}
        className="px-8 md:px-14 py-24 md:py-40 grid md:grid-cols-2 gap-14 items-center"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <motion.h2
          className="font-display font-black leading-tight"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)", color: "var(--offwhite)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Taste the{" "}
          <em className="italic" style={{ color: "var(--amber)" }}>art</em>
          {" "}of serious brewing.
        </motion.h2>

        <motion.div
          className="flex flex-col gap-4 md:items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="leading-relaxed mb-4 font-light" style={{ color: "var(--parchment-dim)" }}>
            Find Forgehaven beers at select craft retailers across the Pacific Northwest,
            or visit our taproom in Ashford Valley where all 14 brews are on tap year-round.
          </p>
          <a
            href="#"
            className="inline-block text-xs tracking-widest uppercase font-semibold px-10 py-4 transition-all duration-300"
            style={{ background: "var(--amber)", color: "var(--charcoal)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--amber-light)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--amber)")}
          >
            Find a Stockist
          </a>
          <a
            href="#"
            className="inline-block text-xs tracking-widest uppercase font-medium px-10 py-4 border transition-all duration-300"
            style={{ borderColor: "rgba(232,223,200,0.3)", color: "var(--parchment-dim)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--parchment)";
              el.style.color = "var(--offwhite)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(232,223,200,0.3)";
              el.style.color = "var(--parchment-dim)";
            }}
          >
            Visit the Taproom
          </a>
        </motion.div>
      </section>
    </>
  );
}

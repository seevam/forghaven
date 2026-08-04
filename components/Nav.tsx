"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Brews", href: "#brews" },
  { label: "Heritage", href: "#heritage" },
  { label: "Craft", href: "#craft" },
  { label: "Find Us", href: "#find" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-6 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(28,26,23,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <a
        href="#"
        className="font-display font-bold tracking-widest uppercase text-sm"
        style={{ color: "var(--amber)" }}
      >
        Forgehaven
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-xs tracking-widest uppercase font-medium transition-colors duration-300"
              style={{ color: "var(--parchment-dim)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--amber)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--parchment-dim)")}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#brews"
        className="hidden md:inline-block text-xs tracking-widest uppercase font-medium px-5 py-2.5 border transition-all duration-300"
        style={{ borderColor: "var(--amber)", color: "var(--amber)" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "var(--amber)";
          el.style.color = "var(--charcoal)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = "transparent";
          el.style.color = "var(--amber)";
        }}
      >
        Explore Brews
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-px" style={{ background: "var(--amber)" }} />
        <span className="block w-6 h-px" style={{ background: "var(--amber)" }} />
        <span className="block w-4 h-px" style={{ background: "var(--amber)" }} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-8"
            style={{ background: "var(--charcoal)" }}
          >
            <button
              className="absolute top-6 right-8 text-2xl"
              style={{ color: "var(--parchment)" }}
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-3xl font-bold"
                style={{ color: "var(--offwhite)" }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

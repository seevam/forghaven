"use client";

const links = ["Instagram", "Facebook", "Taproom", "Contact", "Privacy Policy"];

export default function Footer() {
  return (
    <footer
      className="px-8 md:px-14 py-12 grid md:grid-cols-3 gap-8 items-center text-center md:text-left"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div>
        <div className="font-display font-bold tracking-widest uppercase text-sm mb-1.5" style={{ color: "var(--amber)" }}>
          Forgehaven Brewing Co.
        </div>
        <div className="text-[11px] tracking-widest uppercase" style={{ color: "var(--parchment-dim)" }}>
          Ashford Valley, Oregon
        </div>
      </div>

      <div className="text-[11px] tracking-wider uppercase" style={{ color: "var(--parchment-dim)" }}>
        &copy; 2026 Forgehaven Brewing Co.<br />
        All rights reserved. Drink responsibly.
      </div>

      <ul className="flex flex-wrap justify-center md:justify-end gap-6 list-none">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-[11px] tracking-widest uppercase transition-colors duration-300"
              style={{ color: "var(--parchment-dim)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--amber)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--parchment-dim)")}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

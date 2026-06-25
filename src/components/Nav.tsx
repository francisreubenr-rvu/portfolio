"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Work",   href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About",  href: "#about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 64,
          zIndex: 110, display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px,4vw,52px)",
          background: solid ? "rgba(12,11,10,0.82)" : "transparent",
          backdropFilter: solid ? "blur(14px)" : "none",
          WebkitBackdropFilter: solid ? "blur(14px)" : "none",
          borderBottom: solid ? "1px solid rgba(244,240,232,0.08)" : "1px solid transparent",
          transition: "background .4s, border-color .4s",
        }}
      >
        <a
          href="#"
          data-cursor
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em", color: "#f4f0e8", textDecoration: "none" }}
        >
          FR<span style={{ color: "#e85c3a" }}>.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "clamp(14px,2.4vw,34px)" }}>
          {links.map(l => (
            <a
              key={l.href} href={l.href} data-cursor
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a79e90", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:francisreubenrbtech25@rvu.edu.in"
            data-cursor data-magnetic="0.35"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0c0b0a", background: "#e85c3a", textDecoration: "none", padding: "9px 18px", borderRadius: 2, display: "inline-block" }}
          >
            Hire me
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: 16 }}>
          <a
            href="mailto:francisreubenrbtech25@rvu.edu.in"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0c0b0a", background: "#e85c3a", textDecoration: "none", padding: "8px 14px", borderRadius: 2 }}
          >
            Hire me
          </a>
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", padding: 4, color: "#f4f0e8" }}
          >
            <span style={{ display: "block", width: 20, height: 1.5, background: "#f4f0e8", marginBottom: 5, transition: "transform .3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: "#f4f0e8", transition: "opacity .3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: "#f4f0e8", marginTop: 5, transition: "transform .3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0c0b0a", display: "flex", flexDirection: "column", paddingTop: 64 }}
        >
          <div style={{ padding: "48px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
            {[...links, { label: "Contact", href: "#contact" }].map((l, i, arr) => (
              <a
                key={l.href} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-heading)", fontWeight: 800,
                  fontSize: "clamp(36px,10vw,56px)", letterSpacing: "-0.03em",
                  color: "#f4f0e8", textDecoration: "none",
                  padding: "20px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid rgba(244,240,232,0.08)" : "none",
                  display: "block",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:francisreubenrbtech25@rvu.edu.in"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#6f685d", marginTop: 40, textDecoration: "none" }}
            >
              francisreubenrbtech25@rvu.edu.in
            </a>
          </div>
        </div>
      )}
    </>
  );
}

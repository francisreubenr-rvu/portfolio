import { useEffect, useState } from "react";

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

  return (
    <>
      {/* ── Desktop: glassmorphic floating pill ──────────────────── */}
      <nav
        className="nav-pill hidden md:flex"
        style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          height: 48,
          zIndex: 110,
          alignItems: "center",
          gap: 4,
          padding: "0 6px 0 20px",
          background: "rgba(12,11,10,0.72)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(244,240,232,0.1)",
          borderRadius: 999,
          transition: "background .4s, border-color .4s, box-shadow .4s",
        }}
      >
        <a
          href="#"
          data-cursor
          style={{
            fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15,
            letterSpacing: "-0.03em", color: "#f4f0e8", textDecoration: "none",
            marginRight: 8, display: "flex", alignItems: "center", gap: 2,
          }}
        >
          FR<span style={{ color: "#e85c3a" }}>.</span>
        </a>

        <span style={{ width: 1, height: 18, background: "rgba(244,240,232,0.1)", marginRight: 4 }} />

        {links.map(l => (
          <a
            key={l.href} href={l.href} data-cursor
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#a79e90", textDecoration: "none",
              padding: "6px 14px", borderRadius: 999,
              transition: "color .2s, background .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#f4f0e8"; e.currentTarget.style.background = "rgba(244,240,232,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#a79e90"; e.currentTarget.style.background = "transparent"; }}
          >
            {l.label}
          </a>
        ))}

        <a
          href="mailto:francisreubenrbtech25@rvu.edu.in"
          data-cursor data-magnetic="0.35"
          style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#0c0b0a", background: "#e85c3a",
            textDecoration: "none", padding: "9px 20px", borderRadius: 999,
            display: "inline-block", transition: "box-shadow .3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(232,92,58,0.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
        >
          Hire me
        </a>
      </nav>

      {/* ── Mobile: top bar ─────────────────────────────────────── */}
      <nav
        className="flex md:hidden"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 64,
          zIndex: 110, alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px,4vw,52px)",
          background: scrolled || menuOpen ? "rgba(12,11,10,0.82)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(244,240,232,0.08)" : "1px solid transparent",
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

        <div style={{ alignItems: "center", gap: 16, display: "flex" }}>
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

      {/* ── Mobile overlay ──────────────────────────────────────── */}
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

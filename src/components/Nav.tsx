"use client";

import { useEffect, useState } from "react";
import { X, Menu } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navBg = scrolled || menuOpen
    ? "rgba(244,240,232,0.97)"
    : "transparent";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid var(--border-subtle)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-14">
          <a
            href="#"
            className="font-heading font-extrabold text-lg tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            FR<span style={{ color: "var(--cyan)" }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-sm font-medium transition-colors duration-150 rounded"
                style={{
                  color:
                    active === l.href.replace("#", "")
                      ? "var(--cyan)"
                      : "var(--text-secondary)",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:francisreubenrbtech25@rvu.edu.in"
              className="ml-3 px-4 py-1.5 text-sm font-medium rounded transition-all duration-150"
              style={{
                background: "var(--cyan-dim)",
                color: "var(--cyan)",
                border: "1px solid var(--accent-mid)",
              }}
            >
              Hire me
            </a>
          </div>

          {/* Mobile: Hire me + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="mailto:francisreubenrbtech25@rvu.edu.in"
              className="px-3 py-1.5 text-sm font-semibold rounded transition-all duration-150"
              style={{
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                background: "transparent",
              }}
            >
              Hire me
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-1.5 rounded transition-colors duration-150"
              style={{ color: "var(--text-primary)" }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-14 md:hidden"
          style={{ background: "var(--bg)" }}
        >
          <div className="flex flex-col px-6 py-10 gap-0">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-5 font-heading font-bold text-3xl tracking-tight transition-colors duration-150 flex items-center justify-between"
                style={{
                  color: "var(--ink)",
                  borderBottom: i < links.length - 1 ? "1px solid var(--border-subtle)" : "none",
                }}
              >
                {l.label}
                {active === l.href.replace("#", "") && (
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                )}
              </a>
            ))}
            <a
              href="mailto:francisreubenrbtech25@rvu.edu.in"
              className="mt-10 text-sm font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              francisreubenrbtech25@rvu.edu.in
            </a>
          </div>
        </div>
      )}
    </>
  );
}

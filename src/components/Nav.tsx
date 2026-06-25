"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(244,240,232,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none",
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

        <div className="flex items-center gap-1">
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
              border: "1px solid rgba(34,211,238,0.2)",
            }}
          >
            Hire me
          </a>
        </div>
      </div>
    </nav>
  );
}

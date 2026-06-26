"use client";
import { Mail } from "lucide-react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Contact() {
  return (
    <footer
      id="contact"
      style={{
        position: "relative", background: "#0c0b0a",
        padding: "clamp(80px,14vh,170px) clamp(20px,4vw,52px) clamp(36px,5vh,56px)",
        borderTop: "1px solid rgba(244,240,232,0.08)",
        overflow: "hidden",
      }}
    >
      {/* glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%,rgba(232,92,58,0.15),transparent 70%)" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", zIndex: 2 }}>
        <p className="label-accent" style={{ marginBottom: "clamp(20px,3vh,32px)" }}>Contact</p>

        <a
          href="mailto:francisreubenrbtech25@rvu.edu.in"
          data-cursor data-magnetic="0.18"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          <h2
            data-reveal="up"
            className="glow-text"
            style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(48px,10vw,170px)", letterSpacing: "-0.035em",
              lineHeight: 0.88, margin: 0, color: "#f4f0e8",
            }}
          >
            Let&apos;s build<br />something<span style={{ color: "#e85c3a" }}>.</span>
          </h2>
        </a>

        {/* ── CTA + Social row ─────────────────────────────────── */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(20px,3vw,48px)", marginTop: "clamp(40px,6vh,72px)" }}>
          <a
            href="mailto:francisreubenrbtech25@rvu.edu.in"
            data-cursor data-magnetic="0.3"
            className="glow-accent"
            style={{
              fontFamily: "var(--font-mono)", fontSize: 13,
              color: "#0c0b0a", background: "#e85c3a",
              padding: "16px 28px", borderRadius: 3,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10,
              transition: "box-shadow .3s, transform .3s",
            }}
          >
            <Mail size={16} />
            <span className="hidden sm:inline">francisreubenrbtech25@rvu.edu.in</span>
            <span className="sm:hidden">Send an email</span>
          </a>

          {/* Social links */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px,2.4vw,32px)" }}>
            <a
              href="https://github.com/francisreubenr-rvu"
              target="_blank" rel="noopener noreferrer"
              data-cursor
              style={{ display: "flex", alignItems: "center", gap: 8, color: "#a79e90", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#f4f0e8"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#a79e90"; }}
            >
              <GithubIcon size={18} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", borderBottom: "1px solid rgba(244,240,232,0.15)", paddingBottom: 2 }}>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/francis-reuben-r"
              target="_blank" rel="noopener noreferrer"
              data-cursor
              style={{ display: "flex", alignItems: "center", gap: 8, color: "#a79e90", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#f4f0e8"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#a79e90"; }}
            >
              <LinkedinIcon size={18} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", borderBottom: "1px solid rgba(244,240,232,0.15)", paddingBottom: 2 }}>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* ── Footer bar ───────────────────────────────────────── */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: 16,
          marginTop: "clamp(56px,9vh,110px)",
          paddingTop: 24, borderTop: "1px solid rgba(244,240,232,0.08)",
        }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, color: "#f4f0e8" }}>
            FR<span style={{ color: "#e85c3a" }}>.</span>
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#6f685d" }}>
            Francis Reuben R · RV University · Bengaluru · 2025
          </span>
        </div>
      </div>
    </footer>
  );
}

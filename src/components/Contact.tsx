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
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%,rgba(232,92,58,0.12),transparent 70%)" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", zIndex: 2 }}>
        <p className="label-accent" style={{ marginBottom: "clamp(20px,3vh,32px)" }}>Contact</p>

        <a
          href="mailto:francisreubenrbtech25@rvu.edu.in"
          data-cursor data-magnetic="0.18"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          <h2
            data-reveal="up"
            style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(40px,9vw,150px)", letterSpacing: "-0.04em",
              lineHeight: 0.9, margin: 0, color: "#f4f0e8",
            }}
          >
            Let&apos;s build<br />something<span style={{ color: "#e85c3a" }}>.</span>
          </h2>
        </a>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(16px,3vw,40px)", marginTop: "clamp(36px,5vh,64px)" }}>
          <a
            href="mailto:francisreubenrbtech25@rvu.edu.in"
            data-cursor data-magnetic="0.3"
            style={{
              fontFamily: "var(--font-mono)", fontSize: 13,
              color: "#0c0b0a", background: "#e85c3a",
              padding: "14px 24px", borderRadius: 2,
              textDecoration: "none", display: "inline-block",
            }}
          >
            <span className="hidden sm:inline">francisreubenrbtech25@rvu.edu.in</span>
            <span className="sm:hidden">Send an email</span>
          </a>
          <a
            href="https://github.com/francisreubenr-rvu"
            target="_blank" rel="noopener noreferrer"
            data-cursor
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.06em", color: "#a79e90", textDecoration: "none", borderBottom: "1px solid rgba(244,240,232,0.2)", paddingBottom: 3 }}
          >
            GitHub ↗
          </a>
          <a
            href="https://twitter.com/"
            target="_blank" rel="noopener noreferrer"
            data-cursor
            style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.06em", color: "#a79e90", textDecoration: "none", borderBottom: "1px solid rgba(244,240,232,0.2)", paddingBottom: 3 }}
          >
            Twitter ↗
          </a>
        </div>

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

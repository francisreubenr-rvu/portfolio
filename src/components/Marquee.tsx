export default function Marquee() {
  const text = "Full-Stack   ✦   AI / ML   ✦   Embedded Systems   ✦   Cybersecurity   ✦   Computer Vision   ✦   ";
  const style: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontWeight: 800,
    fontSize: "clamp(28px,4.4vw,68px)",
    letterSpacing: "-0.02em",
    color: "transparent",
    WebkitTextStroke: "1px rgba(244,240,232,0.32)",
    paddingRight: "0.4em",
    flex: "0 0 auto",
    whiteSpace: "nowrap",
  };

  return (
    <section style={{
      position: "relative", overflow: "hidden",
      padding: "clamp(24px,4vh,48px) 0",
      borderTop: "1px solid rgba(244,240,232,0.08)",
      borderBottom: "1px solid rgba(244,240,232,0.08)",
      background: "#0c0b0a",
    }}>
      <div style={{ display: "flex", width: "max-content", animation: "fr-marq 26s linear infinite", whiteSpace: "nowrap" }}>
        <span style={style} dangerouslySetInnerHTML={{ __html: text.replace(/✦/g, '<span style="color:#e85c3a;-webkit-text-stroke:0">✦</span>') }} />
        <span aria-hidden style={style} dangerouslySetInnerHTML={{ __html: text.replace(/✦/g, '<span style="color:#e85c3a;-webkit-text-stroke:0">✦</span>') }} />
      </div>
    </section>
  );
}

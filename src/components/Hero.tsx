import { useEffect, useRef } from "react";

const DOMAINS = ["AI / ML", "Embedded & IoT", "Cybersecurity", "Full-Stack Web"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&$/";

export default function Hero() {
  const innerRef    = useRef<HTMLDivElement>(null);
  const rotatorRef  = useRef<HTMLSpanElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const el = innerRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const y  = window.scrollY;
      if (y < vh) {
        const p = y / vh;
        const mob = window.innerWidth < 768;
        el.style.transform = `translateY(${p * (mob ? 50 : 130)}px)`;
        el.style.opacity   = String(Math.max(0, 1 - p * (mob ? 0.8 : 1.15)));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Domain rotator
  useEffect(() => {
    const r = rotatorRef.current;
    if (!r) return;
    const items = Array.from(r.children) as HTMLElement[];
    items.forEach((el, k) => {
      el.style.cssText = "position:absolute;left:0;top:0;white-space:nowrap;transition:transform .6s cubic-bezier(.7,0,.2,1),opacity .6s;";
      el.style.opacity = k === 0 ? "1" : "0";
      el.style.transform = k === 0 ? "translateY(0)" : "translateY(110%)";
    });
    let i = 0;
    const iv = setInterval(() => {
      const cur = items[i], ni = (i + 1) % items.length, nx = items[ni];
      cur.style.transform = "translateY(-110%)"; cur.style.opacity = "0";
      nx.style.transition = "none"; nx.style.transform = "translateY(110%)"; nx.style.opacity = "0";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        nx.style.transition = "transform .6s cubic-bezier(.7,0,.2,1),opacity .6s";
        nx.style.transform = "translateY(0)"; nx.style.opacity = "1";
      }));
      i = ni;
    }, 2400);
    return () => clearInterval(iv);
  }, []);

  // Scramble text
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const targets = document.querySelectorAll<HTMLElement>("[data-scramble]");
    let gi = 0;
    targets.forEach(t => {
      const text = t.getAttribute("data-scramble") || "";
      t.textContent = "";
      Array.from(text).forEach(ch => {
        const s = document.createElement("span");
        s.style.cssText = "display:inline-block;opacity:0;will-change:opacity;";
        s.textContent = ch === " " ? "\u00a0" : ch;
        t.appendChild(s);
        const idx = gi++;
        if (ch === " ") { s.style.opacity = "1"; return; }
        let frame = 0; const total = 7 + Math.floor(Math.random() * 5);
        setTimeout(() => {
          s.style.opacity = "1";
          const iv = setInterval(() => {
            if (frame >= total) { s.textContent = ch; clearInterval(iv); }
            else s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
            frame++;
          }, 42);
        }, 120 + idx * 52);
      });
    });
  }, []);

  // Count-up
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-count]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const dec    = parseInt(el.getAttribute("data-dec") || "0", 10);
        const dur = 1500, start = performance.now();
        const step = (now: number) => {
          let p = Math.min((now - start) / dur, 1);
          p = 1 - Math.pow(1 - p, 3);
          el.textContent = dec ? (target * p).toFixed(dec) : Math.round(target * p).toString();
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = dec ? target.toFixed(dec) : Math.round(target).toString();
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative", minHeight: "100vh", display: "flex",
        flexDirection: "column", justifyContent: "flex-end",
        padding: "0 clamp(20px,4vw,52px) clamp(48px,7vh,96px)",
        overflow: "hidden",
      }}
    >
      {/* ── Atmospheric backdrop ────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 70% 85%, rgba(232,92,58,0.45) 0%, transparent 55%),
          radial-gradient(ellipse 50% 45% at 25% 75%, rgba(212,168,67,0.25) 0%, transparent 50%),
          radial-gradient(ellipse 90% 70% at 50% 50%, rgba(244,240,232,0.04) 0%, transparent 70%)
        `,
      }} />

      {/* ── Photo placeholder ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `
          linear-gradient(180deg, transparent 30%, rgba(12,11,10,0.85) 100%),
          radial-gradient(ellipse 45% 70% at 65% 45%, rgba(232,92,58,0.06) 0%, transparent 70%)
        `,
      }} />

      {/* ── Dot grid ────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        backgroundImage: "radial-gradient(circle,rgba(244,240,232,0.05) 1px,transparent 1px)",
        backgroundSize: "34px 34px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%,#000 35%,transparent 80%)",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%,#000 35%,transparent 80%)",
      }} />

      {/* ── Corner meta — hidden on mobile ──────────────────────── */}
      <div className="hero-meta" style={{ position: "absolute", top: 84, left: "clamp(20px,4vw,52px)", zIndex: 3, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f685d" }}>
        Portfolio — 2025
      </div>
      <div className="hero-meta" style={{ position: "absolute", top: 84, right: "clamp(20px,4vw,52px)", zIndex: 3, textAlign: "right", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f685d", lineHeight: 1.7 }}>
        Bengaluru, IN<br />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
            animation: "fr-pulse 2s ease-in-out infinite",
            boxShadow: "0 0 8px rgba(34,197,94,0.5)",
          }} />
          Available for work
        </span>
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <div ref={innerRef} style={{ position: "relative", zIndex: 3, maxWidth: 1280, margin: "0 auto", width: "100%", willChange: "transform, opacity" }}>

        {/* Availability badge — visible on all sizes */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "clamp(16px,2vh,24px)" }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
            animation: "fr-pulse 2s ease-in-out infinite",
            boxShadow: "0 0 8px rgba(34,197,94,0.5)",
          }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#22c55e" }}>
            Open to work
          </span>
        </div>

        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#e85c3a", marginBottom: "clamp(16px,2.5vh,32px)" }}>
          1st Year · CS Engineering · RV University
        </p>

        {/* ── Name — display font, stacked ──────────────────────── */}
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(64px,15vw,260px)", lineHeight: 0.85,
          letterSpacing: "-0.03em", margin: 0, color: "#f4f0e8",
          textShadow: "0 0 80px rgba(232,92,58,0.35), 0 0 160px rgba(232,92,58,0.15), 0 4px 30px rgba(0,0,0,0.5)",
        }}>
          <span data-scramble="FRANCIS" style={{ display: "block", whiteSpace: "nowrap" }}>FRANCIS</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            <span data-scramble="REUBEN">REUBEN</span><span style={{ color: "#e85c3a" }}>.</span>
          </span>
        </h1>

        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "flex-end",
          justifyContent: "space-between", gap: 32,
          marginTop: "clamp(28px,4vh,48px)",
        }}>
          {/* ── Domain rotator ─────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: "clamp(15px,1.5vw,19px)", color: "#a79e90", fontWeight: 500 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#6f685d", textTransform: "uppercase", letterSpacing: "0.12em" }}>Building in</span>
            <span
              ref={rotatorRef}
              style={{ position: "relative", display: "inline-block", height: "1.4em", minWidth: 220, overflow: "hidden", verticalAlign: "bottom", fontFamily: "var(--font-heading)", fontWeight: 700, color: "#f4f0e8" }}
            >
              {DOMAINS.map(d => <span key={d}>{d}</span>)}
            </span>
          </div>

          {/* ── Glassmorphic stat cards ────────────────────────── */}
          <div className="hero-stats" style={{ display: "flex", gap: "clamp(10px,1.6vw,16px)" }}>
            {[
              { val: "9.7",  dec: 1, label: "SGPA" },
              { val: "97.0", dec: 1, label: "ISC Board", suffix: "%" },
              { val: "22",   dec: 0, label: "Projects",  suffix: "+" },
              { val: "3",    dec: 0, label: "Natl. Champion", suffix: "×" },
            ].map(s => (
              <div
                key={s.label}
                className="glass-card"
                style={{
                  padding: "clamp(14px,2vw,22px) clamp(16px,2.4vw,28px)",
                  minWidth: 90,
                  borderColor: "rgba(232,92,58,0.15)",
                  boxShadow: "0 0 30px rgba(232,92,58,0.08), inset 0 1px 0 rgba(244,240,232,0.06)",
                  transition: "border-color .3s, box-shadow .3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(232,92,58,0.4)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(232,92,58,0.2), inset 0 1px 0 rgba(244,240,232,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(232,92,58,0.15)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(232,92,58,0.08), inset 0 1px 0 rgba(244,240,232,0.06)";
                }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px,2.8vw,36px)", color: "#f4f0e8", lineHeight: 1 }}>
                  <span data-count={s.val} data-dec={s.dec}>{s.val}</span>{s.suffix}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6f685d", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────── */}
      <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6f685d" }}>Scroll</span>
        <div style={{ position: "relative", width: 1, height: 40, background: "rgba(244,240,232,0.15)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 10, background: "#e85c3a", animation: "fr-scrolldot 1.8s cubic-bezier(.7,0,.3,1) infinite" }} />
        </div>
      </div>
    </section>
  );
}

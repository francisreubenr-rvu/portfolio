"use client";
import { useEffect, useRef } from "react";

const DOMAINS = ["AI / ML", "Embedded & IoT", "Cybersecurity", "Full-Stack Web"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&$/";

export default function Hero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const rotatorRef  = useRef<HTMLSpanElement>(null);
  const mouseRef    = useRef({ x: -999, y: -999 });
  const rafRef      = useRef(0);

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero   = canvas?.parentElement;
    if (!canvas || !hero) return;
    const ctx  = canvas.getContext("2d")!;
    const DPR  = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    type P = { x: number; y: number; vx: number; vy: number };
    let parts: P[] = [];

    const resize = () => {
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width  = w * DPR; canvas.height = h * DPR;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.max(28, Math.min(96, Math.floor(w * h / 15000)));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const r = hero.getBoundingClientRect();
      const m = { x: mouseRef.current.x - r.left, y: mouseRef.current.y - r.top };
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy);
        if (d < 150 && d > 0.1) { const f = (150 - d) / 150 * 1.6; p.x += dx / d * f; p.y += dy / d * f; }
      }
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < 128) {
            ctx.strokeStyle = `rgba(244,240,232,${(1 - d / 128) * 0.13})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of parts) {
        const near = Math.hypot(p.x - m.x, p.y - m.y) < 150;
        ctx.fillStyle = near ? "rgba(232,92,58,0.95)" : "rgba(244,240,232,0.45)";
        ctx.beginPath(); ctx.arc(p.x, p.y, near ? 2.4 : 1.4, 0, 6.3); ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Mouse tracking for canvas
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const el = innerRef.current;
      const cv = canvasRef.current;
      if (!el || !cv) return;
      const vh = window.innerHeight;
      const y  = window.scrollY;
      if (y < vh) {
        const p = y / vh;
        el.style.transform = `translateY(${p * 130}px)`;
        el.style.opacity   = String(Math.max(0, 1 - p * 1.15));
        cv.style.transform = `translateY(${y * 0.28}px)`;
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
        s.textContent = ch === " " ? " " : ch;
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
      {/* canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* dot grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        backgroundImage: "radial-gradient(circle,rgba(244,240,232,0.05) 1px,transparent 1px)",
        backgroundSize: "34px 34px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%,#000 35%,transparent 80%)",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%,#000 35%,transparent 80%)",
      }} />

      {/* glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "radial-gradient(ellipse 70% 50% at 50% 120%,rgba(232,92,58,0.12),transparent 70%)",
      }} />

      {/* corner meta */}
      <div style={{ position: "absolute", top: 84, left: "clamp(20px,4vw,52px)", zIndex: 3, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f685d" }}>
        Portfolio — 2025
      </div>
      <div style={{ position: "absolute", top: 84, right: "clamp(20px,4vw,52px)", zIndex: 3, textAlign: "right", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f685d", lineHeight: 1.7 }}>
        Bengaluru, IN<br /><span style={{ color: "#e85c3a" }}>●</span> Available for work
      </div>

      {/* main content */}
      <div ref={innerRef} style={{ position: "relative", zIndex: 3, maxWidth: 1280, margin: "0 auto", width: "100%", willChange: "transform, opacity" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#e85c3a", marginBottom: "clamp(20px,3vh,36px)" }}>
          1st Year · CS Engineering · RV University
        </p>

        <h1 style={{
          fontFamily: "var(--font-heading)", fontWeight: 800,
          fontSize: "clamp(52px,13.5vw,228px)", lineHeight: 0.82,
          letterSpacing: "-0.045em", margin: 0, color: "#f4f0e8",
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
          {/* domain rotator */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: "clamp(15px,1.5vw,19px)", color: "#a79e90", fontWeight: 500 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#6f685d", textTransform: "uppercase", letterSpacing: "0.12em" }}>Building in</span>
            <span
              ref={rotatorRef}
              style={{ position: "relative", display: "inline-block", height: "1.4em", minWidth: 220, overflow: "hidden", verticalAlign: "bottom", fontFamily: "var(--font-heading)", fontWeight: 700, color: "#f4f0e8" }}
            >
              {DOMAINS.map(d => <span key={d}>{d}</span>)}
            </span>
          </div>

          {/* stats */}
          <div style={{ display: "flex", gap: "clamp(28px,4vw,56px)" }}>
            {[
              { val: "9.7",  dec: 1, label: "SGPA" },
              { val: "97.0", dec: 1, label: "ISC Board", suffix: "%" },
              { val: "22",   dec: 0, label: "Projects",  suffix: "+" },
              { val: "3",    dec: 0, label: "Natl. Champion", suffix: "×" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px,3vw,40px)", color: "#f4f0e8", lineHeight: 1 }}>
                  <span data-count={s.val} data-dec={s.dec}>{s.val}</span>{s.suffix}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6f685d", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6f685d" }}>Scroll</span>
        <div style={{ position: "relative", width: 1, height: 40, background: "rgba(244,240,232,0.15)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 10, background: "#e85c3a", animation: "fr-scrolldot 1.8s cubic-bezier(.7,0,.3,1) infinite" }} />
        </div>
      </div>
    </section>
  );
}

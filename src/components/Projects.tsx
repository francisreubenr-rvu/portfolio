"use client";
import { useEffect, useRef } from "react";
import { featuredProjects, standardProjects, compactProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

const domainColors: Record<string, string> = {
  "ml-ai":    "#8b7bff",
  security:   "#ff6a4d",
  systems:    "#e0a93f",
  fullstack:  "#46c08a",
  research:   "#d8b94a",
};

// ── Reveal hook ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach(el => {
      const d = el.getAttribute("data-reveal");
      el.style.opacity = "0";
      el.style.transform = d === "left" ? "translateX(-40px)" : d === "right" ? "translateX(40px)" : "translateY(42px)";
      el.style.transition = "opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)";
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "none";
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Featured horizontal scroll ───────────────────────────────────────────────
function FeaturedScroll() {
  const pinRef   = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef  = useRef<HTMLDivElement>(null);
  const extraRef = useRef(0);

  useEffect(() => {
    const layout = () => {
      const pin   = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;
      if (window.innerWidth < 768) { pin.style.height = ""; return; }
      const extra = Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.06);
      extraRef.current = extra;
      pin.style.height = (window.innerHeight + extra) + "px";
    };
    layout();
    window.addEventListener("resize", layout);

    let tick = false;
    const onScroll = () => {
      if (window.innerWidth < 768) return;
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        const pin = pinRef.current;
        const track = trackRef.current;
        const fill  = fillRef.current;
        if (!pin || !track) return;
        const r = pin.getBoundingClientRect();
        const p = Math.min(Math.max(-r.top / extraRef.current, 0), 1);
        track.style.transform = `translate3d(${-p * extraRef.current}px,0,0)`;
        if (fill) fill.style.transform = `scaleX(${p})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <div ref={pinRef} className="feat-pin" style={{ position: "relative" }}>
      <div className="feat-sticky" style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* section label */}
        <div className="feat-label" style={{ position: "absolute", top: "clamp(56px,9vh,96px)", left: "clamp(20px,4vw,52px)", zIndex: 5 }}>
          <p className="label-accent" style={{ marginBottom: 10 }}>Selected Work</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-0.03em", margin: 0, color: "#f4f0e8", lineHeight: 0.95 }}>
            Things I&apos;ve<br />shipped
          </h2>
        </div>

        {/* progress */}
        <div className="feat-progress" style={{ position: "absolute", bottom: "clamp(40px,7vh,72px)", left: "clamp(20px,4vw,52px)", right: "clamp(20px,4vw,52px)", zIndex: 5, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#6f685d", letterSpacing: "0.1em" }}>FEATURED</span>
          <div style={{ flex: 1, height: 1, background: "rgba(244,240,232,0.1)", position: "relative" }}>
            <div ref={fillRef} style={{ position: "absolute", inset: 0, background: "#e85c3a", transform: "scaleX(0)", transformOrigin: "0 50%" }} />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#6f685d", letterSpacing: "0.1em" }}>DRAG / SCROLL →</span>
        </div>

        {/* card track */}
        <div
          ref={trackRef}
          className="feat-track"
          style={{
            display: "flex", alignItems: "center",
            gap: "clamp(20px,3vw,40px)",
            padding: "0 clamp(20px,4vw,52px)",
            paddingLeft: "clamp(280px,34vw,540px)",
            willChange: "transform",
          }}
        >
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.id} project={p} num={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ project: p, num }: { project: Project; num: number }) {
  const accent = domainColors[p.domain] ?? "#e85c3a";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
    };
    const onLeave = () => { el.style.transform = "perspective(1000px) rotateY(0) rotateX(0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <article
      ref={ref}
      data-cursor
      className="feat-card"
      style={{
        flex: "0 0 auto", width: "clamp(300px,42vw,460px)",
        background: "rgba(244,240,232,0.03)",
        border: "1px solid rgba(244,240,232,0.09)",
        borderLeft: `3px solid ${accent}`,
        borderRadius: 6, padding: "clamp(24px,2.6vw,38px)",
        position: "relative", willChange: "transform",
        transition: "transform .3s ease",
      }}
    >
      {/* big number */}
      <div style={{ position: "absolute", top: 24, right: 28, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px,5vw,76px)", color: "rgba(244,240,232,0.05)", lineHeight: 1, pointerEvents: "none" }}>
        {String(num).padStart(2, "0")}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, margin: "0 0 14px" }}>
        {p.domains.join(" · ")}
      </p>
      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,3.2vw,46px)", letterSpacing: "-0.02em", margin: "0 0 12px", color: "#f4f0e8", lineHeight: 1 }}>
        {p.name}
      </h3>
      <div style={{ width: 42, height: 2, background: accent, marginBottom: 18 }} />
      <p style={{ fontSize: 14, lineHeight: 1.65, color: "#a79e90", margin: "0 0 22px" }}>{p.tagline}</p>

      {p.metrics && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {p.metrics.slice(0, 3).map(m => (
            <span key={m} style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "5px 9px", borderRadius: 3, color: accent, background: `${accent}14`, border: `1px solid ${accent}40` }}>{m}</span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.tech.slice(0, 5).map(t => (
          <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "4px 8px", borderRadius: 3, color: "#6f685d", border: "1px solid rgba(244,240,232,0.1)" }}>{t}</span>
        ))}
      </div>
    </article>
  );
}

// ── Standard grid ────────────────────────────────────────────────────────────
function StandardCard({ project: p }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bar = el.querySelector<HTMLElement>(".card-bar");
    const onEnter = () => {
      el.style.background = "rgba(244,240,232,0.05)";
      el.style.borderColor = "rgba(244,240,232,0.16)";
      el.style.transform = "translateY(-4px)";
      if (bar) bar.style.transform = "scaleY(1)";
    };
    const onLeave = () => {
      el.style.background = "rgba(244,240,232,0.025)";
      el.style.borderColor = "rgba(244,240,232,0.08)";
      el.style.transform = "translateY(0)";
      if (bar) bar.style.transform = "scaleY(0)";
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <article
      ref={ref}
      data-reveal="up"
      data-cursor
      style={{
        position: "relative", background: "rgba(244,240,232,0.025)",
        border: "1px solid rgba(244,240,232,0.08)", borderRadius: 6,
        padding: 24, transition: "background .35s,border-color .35s,transform .35s",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6f685d", margin: 0 }}>{p.domains.join(" · ")}</p>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#6f685d" }}>{p.year}</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em", margin: "0 0 10px", color: "#f4f0e8" }}>{p.name}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a79e90", margin: "0 0 18px", minHeight: 42 }}>{p.tagline}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {p.tech.slice(0, 4).map(t => (
          <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "3px 7px", borderRadius: 3, color: "#6f685d", border: "1px solid rgba(244,240,232,0.1)" }}>{t}</span>
        ))}
      </div>
      <div className="card-bar" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "#e85c3a", transform: "scaleY(0)", transformOrigin: "50% 0", transition: "transform .35s cubic-bezier(.22,1,.36,1)" }} />
    </article>
  );
}

// ── Compact row ──────────────────────────────────────────────────────────────
function CompactRow({ project: p, idx }: { project: Project; idx: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const name  = el.querySelector<HTMLElement>(".row-name");
    const arrow = el.querySelector<HTMLElement>(".row-arrow");
    if (arrow) { arrow.style.cssText = "transition:transform .3s,opacity .3s;opacity:0;"; }
    if (name)  name.style.transition = "color .3s";
    const onEnter = () => {
      el.style.paddingLeft = "20px"; el.style.background = "rgba(244,240,232,0.02)";
      if (name)  name.style.color = "#e85c3a";
      if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translate(4px,-4px)"; }
    };
    const onLeave = () => {
      el.style.paddingLeft = "8px"; el.style.background = "transparent";
      if (name)  name.style.color = "#f4f0e8";
      if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "translate(0,0)"; }
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  const href = p.links?.github || p.links?.demo || p.links?.paper || "#";

  return (
    <a
      ref={ref}
      href={href} target="_blank" rel="noopener noreferrer"
      data-cursor
      style={{
        display: "flex", alignItems: "center", gap: "clamp(12px,2vw,28px)",
        padding: "clamp(14px,1.8vh,22px) 8px",
        borderBottom: "1px solid rgba(244,240,232,0.08)",
        textDecoration: "none", position: "relative",
        transition: "padding-left .35s,background .35s",
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#6f685d", width: 28, flex: "0 0 auto" }}>{String(idx).padStart(2, "0")}</span>
      <span className="row-name" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(17px,2vw,24px)", color: "#f4f0e8", flex: "0 0 auto", minWidth: 140 }}>{p.name}</span>
      <span className="crow-tagline" style={{ fontSize: 13, color: "#6f685d", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.tagline}</span>
      <span className="crow-year" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#6f685d", flex: "0 0 auto" }}>{p.year}</span>
      <span className="row-arrow" style={{ color: "#e85c3a", flex: "0 0 auto", fontSize: 14 }}>↗</span>
    </a>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Projects() {
  useReveal();

  return (
    <section id="work" style={{ position: "relative", background: "#0c0b0a" }}>
      <FeaturedScroll />

      {/* Standard + compact */}
      <div style={{ position: "relative", background: "#0c0b0a", padding: "clamp(80px,12vh,150px) clamp(20px,4vw,52px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* header */}
          <div data-reveal="up" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: "clamp(36px,5vh,64px)", flexWrap: "wrap" }}>
            <div>
              <p className="label-accent" style={{ marginBottom: 10 }}>More Work</p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-0.03em", margin: 0, color: "#f4f0e8" }}>The full archive</h2>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#6f685d", maxWidth: 280, textAlign: "right", lineHeight: 1.6 }}>
              A spread across systems, security, ML, and the web — built, shipped, documented.
            </p>
          </div>

          {/* standard grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "clamp(12px,1.4vw,18px)" }}>
            {standardProjects.map(p => <StandardCard key={p.id} project={p} />)}
          </div>

          {/* compact list */}
          <p data-reveal="up" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f685d", margin: "clamp(48px,7vh,80px) 0 18px" }}>
            Additional Work
          </p>
          <div style={{ borderTop: "1px solid rgba(244,240,232,0.08)" }}>
            {compactProjects.map((p, i) => <CompactRow key={p.id} project={p} idx={i + 1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

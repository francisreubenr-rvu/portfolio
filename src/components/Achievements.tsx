import { useEffect, useRef } from "react";

const academic = [
  { label: "First Semester SGPA", value: "9.7",   note: "RV University, B.Tech CSE" },
  { label: "ISC Board",           value: "97.0%", note: "Class XII · Top of cohort" },
  { label: "ICSE Board",          value: "96.4%", note: "Class X" },
];

const competitions = [
  { title: "ASISC National Debate Champion", year: "2024",      desc: "Winner at the All India Senior Inter-School Championship — national level." },
  { title: "Karnataka State KISA Champion",  year: "2023 & 2024", desc: "Two-time state champion at KISA inter-school debates." },
  { title: "Three-time Best MUNner",         year: "2022–2024", desc: "Best / Outstanding Delegate across three Model UN conferences." },
];

function CompCard({ c }: { c: typeof competitions[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => { el.style.borderColor = "rgba(216,162,63,0.4)"; el.style.background = "rgba(244,240,232,0.04)"; };
    const onLeave = () => { el.style.borderColor = "rgba(244,240,232,0.08)"; el.style.background = "rgba(244,240,232,0.025)"; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal="right"
      data-cursor
      style={{ padding: 22, marginBottom: 12, background: "rgba(244,240,232,0.025)", border: "1px solid rgba(244,240,232,0.08)", borderRadius: 6, transition: "border-color .35s,background .35s" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17, color: "#f4f0e8", margin: 0 }}>{c.title}</p>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#d8a23f", background: "rgba(216,162,63,0.1)", padding: "4px 8px", borderRadius: 3, flex: "0 0 auto" }}>{c.year}</span>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a79e90", margin: 0 }}>{c.desc}</p>
    </div>
  );
}

export default function Achievements() {
  return (
    <section
      id="about"
      style={{
        position: "relative", background: "#0c0b0a",
        padding: "clamp(80px,12vh,150px) clamp(20px,4vw,52px)",
        borderTop: "1px solid rgba(244,240,232,0.08)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div data-reveal="up" style={{ marginBottom: "clamp(40px,6vh,72px)" }}>
          <p className="label-accent" style={{ marginBottom: 10 }}>About</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-0.03em", margin: 0, color: "#f4f0e8" }}>
            Identity &amp; record
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,5vw,72px)" }}>
          {/* left: bio + academic */}
          <div>
            <p
              data-reveal="left"
              style={{ fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.75, color: "#a79e90", margin: "0 0 36px" }}
            >
              First-year Computer Science Engineering student at RV University, Bengaluru. I build across the full depth of the stack — from bare-metal firmware on microcontrollers to production web platforms — spanning real-time computer vision, enterprise security, music technology, and civic tech. When I&apos;m not writing code, I debate and do Model UN.
            </p>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f685d", margin: "0 0 16px" }}>Academic</p>
            {academic.map(a => (
              <div
                key={a.label}
                data-reveal="left"
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, padding: "16px 0", borderTop: "1px solid rgba(244,240,232,0.08)" }}
              >
                <div>
                  <p style={{ fontSize: 14, color: "#f4f0e8", margin: "0 0 3px", fontWeight: 500 }}>{a.label}</p>
                  <p style={{ fontSize: 12, color: "#6f685d", margin: 0 }}>{a.note}</p>
                </div>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px,2.2vw,28px)", color: "#e85c3a", flex: "0 0 auto" }}>{a.value}</span>
              </div>
            ))}
          </div>

          {/* right: competitions */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f685d", margin: "0 0 16px" }}>Competitions</p>
            {competitions.map(c => <CompCard key={c.title} c={c} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { Code2, Layers, Server, Brain, Cpu, Shield } from "lucide-react";

const groups = [
  { label: "Languages",           icon: Code2,   proficiency: 92, items: ["TypeScript", "Python", "Rust", "Go", "SQL", "MicroPython", "C"] },
  { label: "Frontend",            icon: Layers,  proficiency: 88, items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Three.js", "Web Audio API"] },
  { label: "Backend",             icon: Server,  proficiency: 85, items: ["FastAPI", "Express.js", "Supabase", "PostgreSQL", "Redis", "MySQL", "Prisma"] },
  { label: "AI / ML",             icon: Brain,   proficiency: 87, items: ["LangChain", "MediaPipe", "scikit-learn", "HuggingFace", "Ollama", "Gemini", "OpenRouter"] },
  { label: "Hardware & Embedded", icon: Cpu,     proficiency: 80, items: ["Raspberry Pi Pico", "ESP32 / S3", "ESP32-CAM", "OLED (I2C)", "WiFi CSI", "MicroPython"] },
  { label: "DevOps & Security",   icon: Shield,  proficiency: 82, items: ["Docker", "GitHub Actions", "Vercel", "Nuclei", "Nmap", "Nikto"] },
];

function SkillPill({ label }: { label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => { el.style.color = "#0c0b0a"; el.style.background = "#f4f0e8"; el.style.borderColor = "#f4f0e8"; };
    const onLeave = () => { el.style.color = "#a79e90"; el.style.background = "transparent"; el.style.borderColor = "rgba(244,240,232,0.1)"; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <span
      ref={ref}
      data-cursor
      style={{
        fontFamily: "var(--font-mono)", fontSize: 12, padding: "7px 12px", borderRadius: 3,
        color: "#a79e90", border: "1px solid rgba(244,240,232,0.1)",
        transition: "color .3s,border-color .3s,background .3s", cursor: "default",
      }}
    >
      {label}
    </span>
  );
}

export default function TechStack() {
  // Animate progress bars on scroll
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>("[data-proficiency]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const fill = el.querySelector<HTMLElement>(".progress-fill");
        if (fill) fill.setAttribute("data-filled", "true");
        io.unobserve(el);
      });
    }, { threshold: 0.3 });
    bars.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="skills"
      style={{
        position: "relative", background: "#0c0b0a",
        padding: "clamp(80px,12vh,150px) clamp(20px,4vw,52px)",
        borderTop: "1px solid rgba(244,240,232,0.08)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div data-reveal="up" style={{ marginBottom: "clamp(40px,6vh,72px)" }}>
          <p className="label-accent" style={{ marginBottom: 10 }}>Skills</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-0.03em", margin: 0, color: "#f4f0e8" }}>
            Technical depth
          </h2>
        </div>

        <div>
          {groups.map(g => {
            const Icon = g.icon;
            return (
              <div
                key={g.label}
                data-reveal="up"
                data-proficiency={g.proficiency}
                className="tech-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(120px,200px) 1fr",
                  gap: "clamp(16px,3vw,48px)",
                  padding: "clamp(22px,3vh,34px) 0",
                  borderTop: "1px solid rgba(244,240,232,0.08)",
                  alignItems: "start",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <Icon size={18} style={{ color: "#e85c3a", opacity: 0.8 }} />
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(16px,1.6vw,20px)", color: "#f4f0e8", margin: 0 }}>{g.label}</p>
                  </div>
                  {/* Proficiency bar */}
                  <div className="progress-track" style={{ marginTop: 8 }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${g.proficiency}%` }}
                    />
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#6f685d", marginTop: 4, letterSpacing: "0.1em" }}>{g.proficiency}%</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.items.map(it => <SkillPill key={it} label={it} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const groups = [
  {
    label: "Languages",
    items: ["TypeScript", "Python", "Rust", "Go", "SQL", "MicroPython", "C"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Three.js", "Web Audio API"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "Express.js", "Supabase", "PostgreSQL", "Redis", "MySQL", "Prisma"],
  },
  {
    label: "AI / ML",
    items: ["LangChain", "MediaPipe", "scikit-learn", "HuggingFace", "Ollama", "Gemini", "OpenRouter"],
  },
  {
    label: "Hardware & Embedded",
    items: ["Raspberry Pi Pico", "ESP32 / ESP32-S3", "ESP32-CAM", "OLED (I2C)", "WiFi CSI", "MicroPython"],
  },
  {
    label: "DevOps & Security",
    items: ["Docker", "GitHub Actions", "Vercel", "Nuclei", "Nmap", "Nikto"],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="label-mono-accent mb-3">Skills</p>
        <h2
          className="display-md mb-14"
          style={{ color: "var(--text-primary)" }}
        >
          Technical Depth
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: gi * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="p-5 rounded-xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p className="label-mono mb-4">{g.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2.5 py-1 rounded-md"
                    style={{
                      background: "var(--surface-2)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

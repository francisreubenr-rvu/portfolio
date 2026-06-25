"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const stats = [
  { value: "9.7", label: "SGPA" },
  { value: "97%", label: "ISC Board" },
  { value: "22+", label: "Projects" },
  { value: "3×", label: "Natl. Champion" },
];

const domains = [
  "Full-Stack Web",
  "AI / ML Systems",
  "Embedded & IoT",
  "Cybersecurity",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 hero-grid overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(34,211,238,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Label */}
          <motion.p variants={fadeUp} className="label-mono-accent mb-8">
            1st Year · RV University · Bengaluru
          </motion.p>

          {/* Name */}
          <motion.h1 variants={fadeUp} className="display-xl mb-6">
            <span style={{ color: "var(--text-primary)" }}>FRANCIS</span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>REUBEN</span>
            <span style={{ color: "var(--cyan)" }}>.</span>
          </motion.h1>

          {/* Descriptor row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-x-6 gap-y-2 mb-12"
          >
            {domains.map((d) => (
              <span
                key={d}
                className="text-base md:text-lg font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {d}
              </span>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-4"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div
                  className="font-heading font-extrabold text-3xl tracking-tight mb-0.5"
                  style={{ color: "var(--cyan)" }}
                >
                  {s.value}
                </div>
                <div className="label-mono">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <a
              href="#work"
              className="flex items-center gap-2 px-6 py-3 font-medium text-sm rounded-lg transition-all duration-200 hover:gap-3"
              style={{
                background: "var(--cyan)",
                color: "#080808",
              }}
            >
              View work
              <ArrowDown size={15} />
            </a>
            <a
              href="mailto:francisreubenrbtech25@rvu.edu.in"
              className="px-6 py-3 font-medium text-sm rounded-lg transition-all duration-200"
              style={{
                background: "var(--surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-default)",
              }}
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

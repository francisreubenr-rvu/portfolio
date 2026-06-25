"use client";

import { motion } from "framer-motion";

const facts = [
  { value: "9.7", label: "SGPA" },
  { value: "97.0%", label: "ISC Board" },
  { value: "22+", label: "Projects" },
  { value: "3×", label: "Natl. Champion" },
];

const domains = "Full-Stack · AI / ML · Embedded & IoT · Cybersecurity";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-28 hero-grid overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          {/* Location label */}
          <motion.p variants={fadeUp} className="label-mono-accent mb-10">
            1st Year · RV University · Bengaluru
          </motion.p>

          {/* Name */}
          <motion.h1 variants={fadeUp} className="display-xl mb-8">
            <span style={{ color: "var(--ink)" }}>FRANCIS</span>
            <br />
            <span style={{ color: "var(--ink)" }}>REUBEN</span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </motion.h1>

          {/* Thin rule */}
          <motion.hr
            variants={fadeUp}
            className="hr-ink mb-7"
          />

          {/* Facts strip — editorial, not SaaS metric boxes */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-y-4 mb-10"
          >
            {facts.map((f) => (
              <div key={f.label}>
                <div
                  className="font-heading font-bold text-2xl tracking-tight mb-0.5"
                  style={{ color: "var(--ink)" }}
                >
                  {f.value}
                </div>
                <div className="label-mono">{f.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Domain strip */}
          <motion.p
            variants={fadeUp}
            className="text-base font-medium mb-10 leading-relaxed"
            style={{ color: "var(--ink-mid)" }}
          >
            {domains}
          </motion.p>

          {/* CTAs — text links, not pill buttons */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-6 flex-wrap"
          >
            <a
              href="#work"
              className="font-medium text-sm group flex items-center gap-1.5 transition-colors duration-150"
              style={{ color: "var(--accent)" }}
            >
              View work
              <span
                className="transition-transform duration-150 group-hover:translate-y-0.5"
                aria-hidden
              >
                ↓
              </span>
            </a>
            <a
              href="mailto:francisreubenrbtech25@rvu.edu.in"
              className="font-medium text-sm transition-colors duration-150"
              style={{ color: "var(--ink-mid)" }}
            >
              <span className="hidden sm:inline">francisreubenrbtech25@rvu.edu.in</span>
              <span className="sm:hidden">Get in touch →</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

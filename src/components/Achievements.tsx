"use client";

import { motion } from "framer-motion";

const academic = [
  {
    label: "First Semester SGPA",
    value: "9.7 / 10",
    note: "RV University, B.Tech CSE",
  },
  {
    label: "ISC Board",
    value: "97.0%",
    note: "Class XII · Top of cohort",
  },
  {
    label: "ICSE Board",
    value: "96.4%",
    note: "Class X",
  },
];

const competitions = [
  {
    title: "ASISC National Debate Champion",
    year: "2024",
    desc: "Winner at the All India Senior Inter-School Championship — national level.",
    domain: "Debate",
  },
  {
    title: "Karnataka State KISA Champion",
    year: "2023 & 2024",
    desc: "Two-time state champion at KISA (Karnataka Inter-School Association) debates.",
    domain: "Debate",
  },
  {
    title: "Three-time Best MUNner",
    year: "2022–2024",
    desc: "Best Delegate / Outstanding Delegate across three separate Model UN conferences.",
    domain: "MUN",
  },
];

export default function Achievements() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="label-mono-accent mb-3">About</p>
        <h2
          className="display-md mb-14"
          style={{ color: "var(--text-primary)" }}
        >
          Identity & Record
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Academic */}
          <div>
            <p className="label-mono mb-5">Academic</p>
            <div className="space-y-3">
              {academic.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start justify-between gap-4 p-4 rounded-xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div>
                    <p
                      className="font-medium text-sm mb-0.5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a.label}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {a.note}
                    </p>
                  </div>
                  <span
                    className="font-heading font-bold text-xl shrink-0 tabular-nums"
                    style={{ color: "var(--cyan)" }}
                  >
                    {a.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 p-4 rounded-xl text-sm leading-relaxed"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              First-year Computer Science Engineering student at RV University,
              Bengaluru. I build across the full depth of the stack — from bare
              metal firmware on microcontrollers to production web platforms. My
              work spans real-time computer vision, enterprise security
              infrastructure, music technology, and civic tech. I debate and do
              MUN when not writing code.
            </motion.div>
          </div>

          {/* Competitions */}
          <div>
            <p className="label-mono mb-5">Competitions</p>
            <div className="space-y-3">
              {competitions.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-4 rounded-xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <p
                      className="font-medium text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {c.title}
                    </p>
                    <span
                      className="font-mono text-xs shrink-0 px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(245,158,11,0.1)",
                        color: "var(--amber)",
                      }}
                    >
                      {c.year}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

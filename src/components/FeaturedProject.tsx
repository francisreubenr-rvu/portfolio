"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

const domainColors: Record<string, string> = {
  "ml-ai":    "#4733a8",   /* deep indigo-violet */
  security:   "#a83218",   /* deep vermillion */
  systems:    "#8a5a14",   /* deep sienna-amber */
  fullstack:  "#1f6b3f",   /* deep forest green */
  research:   "#856411",   /* deep ochre */
};

interface Props {
  project: Project;
  index: number;
}

export default function FeaturedProject({ project, index }: Props) {
  const accentColor = domainColors[project.domain] ?? "var(--cyan)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-xl overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-default)",
        borderLeft: `3px solid ${accentColor}`,
      }}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p
              className="label-mono mb-2"
              style={{ color: accentColor, opacity: 0.85 }}
            >
              {project.domains.join(" · ")}
            </p>
            <h3
              className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {project.name}
            </h3>
            <div className="h-px w-12" style={{ background: accentColor }} />
          </div>

          <div className="flex gap-2 shrink-0 mt-1">
            {project.links?.github && (
              <a
                href={project.links.github}
                aria-label="GitHub"
                className="p-2 rounded-lg transition-colors duration-150"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text-secondary)",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitFork size={16} />
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                aria-label="Live demo"
                className="p-2 rounded-lg transition-colors duration-150"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text-secondary)",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p
          className="text-sm md:text-base leading-relaxed mb-5"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="font-mono text-xs px-2.5 py-1 rounded"
                style={{
                  background: `${accentColor}14`,
                  color: accentColor,
                  border: `1px solid ${accentColor}28`,
                }}
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="text-xs font-mono"
              style={{
                background: "var(--surface-2)",
                color: "var(--text-muted)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

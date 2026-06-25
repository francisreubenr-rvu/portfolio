"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork, FileText } from "lucide-react";
import type { Project } from "@/data/projects";

const domainColors: Record<string, string> = {
  "ml-ai":    "#4733a8",
  security:   "#a83218",
  systems:    "#8a5a14",
  fullstack:  "#1f6b3f",
  research:   "#856411",
};

interface Props {
  project: Project;
  index: number;
}

export default function CompactProject({ project, index }: Props) {
  const accentColor = domainColors[project.domain] ?? "var(--text-muted)";

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
      className="py-3.5 px-2 -mx-2 rounded group transition-colors duration-150"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
      whileHover={{ backgroundColor: "#faf8f3" }}
    >
      {/* Mobile: stacked layout */}
      <div className="flex items-start gap-3 sm:hidden">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
          style={{ background: accentColor }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
              {project.name}
            </h4>
            <div className="flex gap-1 shrink-0">
              {project.links?.github && (
                <a href={project.links.github} aria-label="GitHub" className="p-1" style={{ color: "var(--text-muted)" }} target="_blank" rel="noopener noreferrer">
                  <GitFork size={12} />
                </a>
              )}
              {project.links?.demo && (
                <a href={project.links.demo} aria-label="Demo" className="p-1" style={{ color: "var(--text-muted)" }} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--text-muted)" }}>
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Desktop: single-row layout */}
      <div className="hidden sm:flex items-center gap-3">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: accentColor }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <h4 className="font-medium text-sm shrink-0" style={{ color: "var(--text-primary)" }}>
              {project.name}
            </h4>
            <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
              — {project.tagline}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 shrink-0">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-1.5 py-0.5 rounded"
              style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {project.links?.github && (
            <a href={project.links.github} aria-label="GitHub" className="p-1 rounded" style={{ color: "var(--text-muted)" }} target="_blank" rel="noopener noreferrer">
              <GitFork size={12} />
            </a>
          )}
          {project.links?.demo && (
            <a href={project.links.demo} aria-label="Demo" className="p-1 rounded" style={{ color: "var(--text-muted)" }} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={12} />
            </a>
          )}
          {project.links?.paper && (
            <a href={project.links.paper} aria-label="Paper" className="p-1 rounded" style={{ color: "var(--text-muted)" }} target="_blank" rel="noopener noreferrer">
              <FileText size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

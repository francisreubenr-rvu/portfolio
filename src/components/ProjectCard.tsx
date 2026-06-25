"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

const domainColors: Record<string, string> = {
  "ml-ai": "#a78bfa",
  security: "#f87171",
  systems: "#fb923c",
  fullstack: "#4ade80",
  research: "#facc15",
};

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const accentColor = domainColors[project.domain] ?? "var(--cyan)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-xl p-5 transition-all duration-200"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p
            className="label-mono mb-1.5"
            style={{ color: accentColor, opacity: 0.8 }}
          >
            {project.domains[0]}
          </p>
          <h3
            className="font-heading font-bold text-lg tracking-tight leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {project.name}
          </h3>
        </div>
        <div className="flex gap-1.5 shrink-0">
          {project.links?.github && (
            <a
              href={project.links.github}
              aria-label="GitHub"
              className="p-1.5 rounded transition-colors duration-150"
              style={{ color: "var(--text-muted)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitFork size={14} />
            </a>
          )}
          {project.links?.demo && (
            <a
              href={project.links.demo}
              aria-label="Demo"
              className="p-1.5 rounded transition-colors duration-150"
              style={{ color: "var(--text-muted)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} />
            </a>
          )}
          {project.links?.paper && (
            <a
              href={project.links.paper}
              aria-label="Paper"
              className="p-1.5 rounded transition-colors duration-150"
              style={{ color: "var(--text-muted)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={14} />
            </a>
          )}
        </div>
      </div>

      <p
        className="text-sm leading-relaxed mb-4 flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-1">
        {project.tech.slice(0, 4).map((t) => (
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
        {project.tech.length > 4 && (
          <Badge
            variant="secondary"
            className="text-xs font-mono"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-muted)",
            }}
          >
            +{project.tech.length - 4}
          </Badge>
        )}
      </div>
    </motion.article>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  featuredProjects,
  standardProjects,
  compactProjects,
} from "@/data/projects";
import type { ProjectDomain } from "@/data/projects";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";
import CompactProject from "./CompactProject";

type Filter = "all" | ProjectDomain;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "AI / ML", value: "ml-ai" },
  { label: "Security", value: "security" },
  { label: "Systems", value: "systems" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Research", value: "research" },
];

export default function Projects() {
  const [active, setActive] = useState<Filter>("all");

  const visibleFeatured =
    active === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => p.domain === active);

  const visibleStandard =
    active === "all"
      ? standardProjects
      : standardProjects.filter((p) => p.domain === active);

  const visibleCompact =
    active === "all"
      ? compactProjects
      : compactProjects.filter((p) => p.domain === active);

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="label-mono-accent mb-3">Work</p>
            <h2 className="display-md" style={{ color: "var(--text-primary)" }}>
              Projects
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-150"
                style={
                  active === f.value
                    ? {
                        background: "var(--cyan-dim)",
                        color: "var(--cyan)",
                        border: "1px solid rgba(34,211,238,0.25)",
                      }
                    : {
                        background: "var(--surface)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border-subtle)",
                      }
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured — full width 2-col grid */}
        {visibleFeatured.length > 0 && (
          <div className="mb-12">
            <p className="label-mono mb-5">Featured</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {visibleFeatured.map((p, i) => (
                <FeaturedProject key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Standard — 3-col grid */}
        {visibleStandard.length > 0 && (
          <div className="mb-12">
            <p className="label-mono mb-5">
              {active === "all" ? "All Projects" : "Projects"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleStandard.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Compact — dense list */}
        {visibleCompact.length > 0 && (
          <div>
            <p className="label-mono mb-4">Additional Work</p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12"
              style={{
                border: "1px solid var(--border-subtle)",
                borderRadius: "12px",
                padding: "8px 24px",
                background: "var(--surface)",
              }}
            >
              {visibleCompact.map((p, i) => (
                <CompactProject key={p.id} project={p} index={i} />
              ))}
            </motion.div>
          </div>
        )}

        {/* Empty state */}
        {visibleFeatured.length === 0 &&
          visibleStandard.length === 0 &&
          visibleCompact.length === 0 && (
            <p
              className="text-sm py-16 text-center"
              style={{ color: "var(--text-muted)" }}
            >
              No projects in this domain yet.
            </p>
          )}
      </div>
    </section>
  );
}

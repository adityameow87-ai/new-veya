"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import { projectCategories, projects } from "@/config/projects";
import type { ProjectCategory } from "@/types";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function WorkGallery() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects"
        className="flex flex-wrap gap-2"
      >
        {projectCategories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-medium transition-all duration-300",
              filter === cat.id
                ? "border-accent bg-accent text-on-accent"
                : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border-strong bg-surface px-8 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-2 text-accent">
            <Inbox className="h-6 w-6" aria-hidden />
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            No projects in this category yet. New work is added as projects
            launch — check back soon, or start the first one with us.
          </p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={(i % 3) * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}

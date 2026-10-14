import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import type { Project } from "@/types";
import { categoryLabels } from "@/config/projects";
import { cn } from "@/lib/utils";

/**
 * Stylised, CSS-rendered preview panel — an honest illustrative
 * mockup for concept work (not a real screenshot).
 */
export function MockPreview({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const a = project.accent;

  return (
    <div
      aria-hidden
      className={cn(
        "relative h-full min-h-44 w-full overflow-hidden rounded-xl border border-border bg-background-soft",
        className
      )}
    >
      {/* window chrome */}
      <div className="flex h-7 items-center gap-1.5 border-b border-border bg-surface px-3">
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="ml-3 h-3.5 flex-1 rounded-full border border-border bg-background-soft" />
      </div>

      <div className="relative p-4">
        {(project.variant === "site" || project.variant === "store" || project.variant === "landing") && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-14 rounded-full" style={{ background: a, opacity: 0.8 }} />
              <span className="flex gap-1.5">
                <span className="h-2 w-8 rounded-full bg-border" />
                <span className="h-2 w-8 rounded-full bg-border" />
                <span className="h-2 w-8 rounded-full bg-border" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2 py-2">
                <span className="h-3.5 w-full rounded-full bg-border-strong" />
                <span className="h-3.5 w-4/5 rounded-full bg-border-strong" />
                <span className="mt-1 h-2 w-3/5 rounded-full bg-border" />
                <span
                  className="mt-3 h-7 w-24 rounded-full"
                  style={{ background: a, boxShadow: `0 6px 18px -8px ${a}` }}
                />
              </div>
              <div
                className="rounded-lg border border-border"
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, ${a} 26%, transparent), transparent 70%)`,
                }}
              >
                <div className="m-3 grid grid-cols-3 gap-1.5">
                  {Array.from({ length: project.variant === "store" ? 6 : 3 }).map((_, i) => (
                    <span
                      key={i}
                      className="block aspect-square rounded-md border border-border bg-surface"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {project.variant === "dashboard" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="h-6 w-24 rounded-md border border-border bg-surface-2" />
              <span className="h-6 w-16 rounded-md" style={{ background: a, opacity: 0.85 }} />
            </div>
            <div className="grid grid-cols-4 items-end gap-2 pt-1">
              {[40, 68, 52, 86, 60, 74, 48, 66].map((h, i) => (
                <span
                  key={i}
                  className="mx-auto w-full max-w-5 rounded-t-md"
                  style={{
                    height: `${h}px`,
                    background: `color-mix(in srgb, ${a} ${45 + (i % 3) * 18}%, transparent)`,
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="h-2 w-full rounded-full bg-border" />
              <span className="h-2 w-5/6 rounded-full bg-border" />
              <span className="h-2 w-4/6 rounded-full bg-border" />
            </div>
          </div>
        )}

        {project.variant === "flow" && (
          <div className="flex items-center gap-2 py-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="contents">
                <div className="flex flex-1 flex-col items-center gap-2 rounded-lg border border-border bg-surface p-3">
                  <span
                    className="h-5 w-5 rounded-full"
                    style={{
                      background: `color-mix(in srgb, ${a} ${55 + i * 15}%, transparent)`,
                      boxShadow: i === 2 ? `0 0 14px 2px color-mix(in srgb, ${a} 50%, transparent)` : undefined,
                    }}
                  />
                  <span className="h-1.5 w-4/5 rounded-full bg-border" />
                </div>
                {i < 2 && (
                  <div className="flow-connector" style={{ minWidth: "1rem" }}>
                    <span className="flow-dot" style={{ animationDelay: `${i * 0.9}s` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-lift"
    >
      <div className="p-3 pb-0">
        <MockPreview project={project} className="transition-transform duration-500 group-hover:scale-[1.015]" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-medium text-muted">
            {categoryLabels[project.category]}
          </span>
          {project.isConcept && (
            <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-border-strong px-2.5 py-1 font-medium text-muted">
              <FlaskConical className="h-3 w-3 text-accent" aria-hidden />
              Concept
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
          View project
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

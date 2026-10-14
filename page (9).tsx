import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FlaskConical,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MockPreview } from "@/components/portfolio/ProjectCard";
import {
  adjacentProjects,
  categoryLabels,
  getProject,
  projects,
} from "@/config/projects";
import { site } from "@/config/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — ${categoryLabels[project.category]}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = adjacentProjects(project.slug);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(44rem 28rem at 80% -10%, color-mix(in srgb, ${project.accent} 14%, transparent), transparent 65%)`,
          }}
        />
        <Container className="relative">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-strong"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All work
            </Link>
          </Reveal>
          <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
            <div>
              <Reveal delay={80}>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-border bg-surface px-3 py-1.5 font-medium text-muted">
                    {categoryLabels[project.category]}
                  </span>
                  {project.isConcept && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border-strong px-3 py-1.5 font-medium text-muted">
                      <FlaskConical className="h-3.5 w-3.5 text-accent" aria-hidden />
                      Concept study — illustrative, not client work
                    </span>
                  )}
                  {project.duration && (
                    <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-muted">
                      {project.duration}
                    </span>
                  )}
                </div>
              </Reveal>
              <Reveal delay={150}>
                <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                  {project.title}
                </h1>
              </Reveal>
              <Reveal delay={230}>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  {project.summary}
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/contact" withArrow>
                    Enquire About a Similar Project
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <MockPreview project={project} className="min-h-72 shadow-lift" />
              <p className="mt-3 text-xs text-muted">
                Illustrative preview rendered for this case study — not a
                client screenshot.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col gap-10">
              {[
                { title: "Overview", body: project.overview },
                { title: "The business problem", body: project.problem },
                { title: "The solution", body: project.solution },
                { title: "Design & build approach", body: project.approach },
              ].map((block, i) => (
                <Reveal key={block.title} delay={i * 60}>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {block.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                      {block.body}
                    </p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={120}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Results
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    This is a concept study, so there are no real-world metrics
                    to report — and we won&rsquo;t invent any. When client
                    projects launch, verified outcomes will be published here
                    with permission. Want to be the first?{" "}
                    <Link
                      href="/contact"
                      className="text-accent-strong underline-offset-4 hover:underline"
                    >
                      Start the conversation
                    </Link>
                    .
                  </p>
                </div>
              </Reveal>
            </div>

            <aside className="flex flex-col gap-6">
              <Reveal delay={100}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                    <Layers className="h-4 w-4 text-accent" aria-hidden />
                    Deliverables
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {project.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="text-sm font-semibold tracking-wide uppercase">
                    Technology
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    Stacks are chosen per project — this list reflects the
                    concept study, not a fixed recipe.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      {/* next / previous */}
      <nav
        aria-label="More projects"
        className="border-t border-border bg-background-soft"
      >
        <Container className="grid gap-px overflow-hidden py-0 sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="group flex flex-col gap-2 py-10 pr-6 transition-colors sm:border-r sm:border-border"
          >
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-muted uppercase">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden />
              Previous project
            </span>
            <span className="font-display text-xl font-semibold transition-colors group-hover:text-accent-strong">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col items-end gap-2 py-10 pl-6 text-right transition-colors"
          >
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-muted uppercase">
              Next project
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
            <span className="font-display text-xl font-semibold transition-colors group-hover:text-accent-strong">
              {next.title}
            </span>
          </Link>
        </Container>
      </nav>

      <section className="border-t border-border py-20 text-center">
        <Container size="narrow">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Want Something Like This for Your Business?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
              Tell us about your project and we&rsquo;ll reply with honest,
              practical next steps.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" size="lg" withArrow>
                Contact {site.name}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

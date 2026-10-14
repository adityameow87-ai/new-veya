import type { Metadata } from "next";
import {
  FlaskConical,
  Mail,
  Sheet,
  Filter,
  MessagesSquare,
  Workflow,
  Check,
} from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FlowDiagram } from "@/components/marketing/FlowDiagram";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { projects } from "@/config/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

export const metadata: Metadata = {
  title: "Combined Website + Automation Solutions",
  description:
    "Website enquiry to spreadsheet, lead capture to CRM, contact form to email or Telegram — see how a Veya website and its workflows form one connected business system.",
  alternates: { canonical: "/solutions" },
};

const patterns = [
  {
    icon: Sheet,
    title: "Website enquiry → spreadsheet",
    text: "Every form submission lands as a clean, timestamped row in a spreadsheet your team already checks.",
    status: "Example pattern",
  },
  {
    icon: MessagesSquare,
    title: "Website enquiry → Telegram notification",
    text: "A structured summary of each enquiry arrives in Telegram seconds after the visitor hits send.",
    status: "Example pattern",
  },
  {
    icon: Workflow,
    title: "Lead capture → CRM",
    text: "New enquiries create or update CRM records automatically, keeping your pipeline current without retyping.",
    status: "Example pattern",
  },
  {
    icon: Mail,
    title: "Contact form → email notification",
    text: "A dependable classic: validated enquiries delivered to the right inbox, formatted for quick replies.",
    status: "Example pattern",
  },
  {
    icon: Filter,
    title: "Lead qualification workflows",
    text: "Submissions are scored and routed by service, budget, or urgency — so high-intent leads get the fastest response.",
    status: "Example pattern",
  },
  {
    icon: FlaskConical,
    title: "LeadFlow intake pipeline",
    text: "The enquiry → validation → record → notification chain running on this very website is a working implementation of the same architecture.",
    status: "Working demo",
  },
];

export default function SolutionsPage() {
  const combined = projects.filter((p) => p.category === "combined").slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow="Combined Solutions"
        title={
          <>
            Your Website and Workflows.{" "}
            <span className="text-gradient">Working Together.</span>
          </>
        }
        description="A great website creates opportunities. Smart automations help manage what happens next. Bring both together to build a more connected business."
      >
        <Button href="/contact" withArrow>
          Plan Your Solution
        </Button>
        <Button href="/work" variant="secondary">
          See Combined Projects
        </Button>
      </PageHero>

      {/* the journey */}
      <section className="border-t border-border py-20 sm:py-28" aria-labelledby="journey">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">The complete journey</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 id="journey" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                From First Visit to Fast Follow-Up
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                A connected system means no step relies on someone remembering
                to check an inbox. Each stage is designed, tested, and visible.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="mt-12 overflow-x-auto rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <FlowDiagram
                className="min-w-[52rem]"
                nodes={[
                  { icon: "globe", label: "Visitor", sub: "finds your website" },
                  { icon: "database", label: "Enquiry", sub: "short, validated form" },
                  { icon: "table", label: "Data capture", sub: "sheet, CRM, database" },
                  { icon: "bell", label: "Notification", sub: "email or Telegram" },
                ]}
              />
              <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted">
                <span className="font-medium text-foreground">Follow-up</span>{" "}
                closes the loop — your team responds while intent is high, with
                full context already organised. The flow above is illustrative;
                integrations are configured to your actual tools during the
                project.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* patterns */}
      <section className="border-t border-border bg-background-soft py-20 sm:py-28" aria-labelledby="patterns">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">What this looks like in practice</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 id="patterns" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Connection Patterns We Build
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Patterns marked <span className="font-medium text-foreground">"Example"</span>{" "}
                are common configurations available for your project;{" "}
                <span className="font-medium text-foreground">"Working demo"</span>{" "}
                labels something implemented and running today.
              </p>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((pattern, i) => (
              <Reveal as="li" key={pattern.title} delay={(i % 3) * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                      <pattern.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span
                      className={
                        pattern.status === "Working demo"
                          ? "inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-strong"
                          : "inline-flex items-center gap-1 rounded-full border border-dashed border-border-strong px-2.5 py-1 text-xs font-medium text-muted"
                      }
                    >
                      {pattern.status === "Working demo" && (
                        <Check className="h-3 w-3" aria-hidden />
                      )}
                      {pattern.status}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{pattern.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {pattern.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* bundles */}
      <section className="border-t border-border py-20 sm:py-28" aria-labelledby="bundles">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="eyebrow">Website + automation bundles</p>
              </Reveal>
              <Reveal delay={90}>
                <h2 id="bundles" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  One Build. One Coherent System.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  When the website and the workflows are designed together, the
                  handoffs disappear: forms ask for exactly what your process
                  needs, notifications carry exactly the context your team
                  uses, and nothing depends on copy-paste.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <ul className="mt-7 flex flex-col gap-3">
                  {[
                    "Enquiry forms designed around your follow-up process",
                    "Data structured for the tools you already use",
                    "One point of contact, one documentation set, one handover",
                    "Better value than commissioning the pieces separately",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <ul className="grid gap-6">
              {combined.map((project, i) => (
                <Reveal as="li" key={project.slug} delay={i * 110}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTASection
        title="Plan Your Connected Solution"
        description="Tell us how enquiries reach you today and where they should end up. We'll design the shortest path between the two."
        primaryLabel="Plan Your Solution"
        primaryHref="/contact"
        secondaryLabel="View Pricing Approach"
        secondaryHref="/pricing"
      />
    </>
  );
}

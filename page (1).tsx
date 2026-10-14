import type { Metadata } from "next";
import {
  BellRing,
  Cable,
  ClipboardCheck,
  KeyRound,
  Puzzle,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FlowDiagram } from "@/components/marketing/FlowDiagram";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { serviceGroups } from "@/config/services";

export const metadata: Metadata = {
  title: "Business Automation Services",
  description:
    "Lead capture automation, enquiry processing, spreadsheet and CRM integrations, email and Telegram notifications, social media workflows, AI-assisted tasks, and custom API integrations.",
  alternates: { canonical: "/services/automations" },
};

const dependencies = [
  {
    icon: Puzzle,
    title: "Your software's capabilities",
    text: "Whether a tool offers an API or automation hooks determines what can connect to it — we check this before proposing anything.",
  },
  {
    icon: KeyRound,
    title: "Access and plan levels",
    text: "Some platforms only open their API on paid tiers. Any such requirement is identified in your proposal, never discovered mid-project.",
  },
  {
    icon: Cable,
    title: "API availability",
    text: "Where a direct API doesn't exist, bridging platforms or custom polling may be possible — feasibility is assessed per case.",
  },
  {
    icon: ShieldCheck,
    title: "Permissions and data rules",
    text: "Automations only touch data you authorise. You'll always know exactly what moves where before anything goes live.",
  },
];

const capabilities = [
  "Lead capture and routing",
  "Enquiry processing and validation",
  "Spreadsheet integrations",
  "CRM workflows",
  "Email notifications",
  "Telegram notifications",
  "Social media workflow support",
  "AI-assisted processing",
  "Custom API integrations",
];

export default function AutomationsPage() {
  const group = serviceGroups.find((g) => g.id === "automations")!;

  return (
    <>
      <PageHero
        eyebrow="Service — Automations"
        title={
          <>
            Less Repetitive Work.{" "}
            <span className="text-gradient">More Room to Grow.</span>
          </>
        }
        description="Connect everyday business tools, streamline repetitive tasks, and create workflows that give you more time to focus on meaningful work."
      >
        <Button href="/contact" withArrow>
          Map My Workflow
        </Button>
        <Button href="/solutions" variant="secondary">
          See It Working With a Website
        </Button>
      </PageHero>

      {/* services */}
      <section className="border-t border-border py-20 sm:py-28" aria-labelledby="automation-services">
        <Container>
          <Reveal>
            <p className="eyebrow">What we automate</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="automation-services" className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Quiet Systems That Handle the Busywork
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((service, i) => (
              <Reveal as="li" key={service.id} delay={(i % 3) * 80}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-14 flex flex-wrap gap-2.5">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
                >
                  {cap}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* illustrative workflow */}
      <section className="border-t border-border bg-background-soft py-20 sm:py-28" aria-labelledby="anatomy">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">The anatomy of a workflow</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 id="anatomy" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                What One Enquiry Becomes
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                This illustrative flow shows the pattern behind most intake
                automations. Your version is configured around the tools you
                already use and trust.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="mt-12 rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <FlowDiagram
                nodes={[
                  { icon: "globe", label: "Enquiry arrives", sub: "form, email, or chat" },
                  { icon: "database", label: "Validated & structured", sub: "clean, complete data" },
                  { icon: "table", label: "Recorded", sub: "sheet, CRM, or database" },
                  { icon: "bell", label: "You're notified", sub: "email or Telegram" },
                ]}
              />
              <div className="mt-7 flex items-start gap-3 border-t border-border pt-5 text-sm leading-relaxed text-muted">
                <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <p>
                  Every stage is inspectable and tested before handover. If a
                  step ever fails, it fails loudly — you'll never silently lose
                  an enquiry.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* dependencies */}
      <section className="border-t border-border py-20 sm:py-28" aria-labelledby="dependencies">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Honest constraints</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 id="dependencies" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                What Integrations Depend On
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Not every tool connects to everything — and anyone who says
                otherwise is guessing. These are the real factors, and we
                verify them during scoping:
              </p>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {dependencies.map((dep, i) => (
              <Reveal as="li" key={dep.title} delay={(i % 2) * 90}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                    <dep.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{dep.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {dep.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <div className="mt-12 flex items-start gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-6">
              <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">Our promise:</span>{" "}
                we only propose automations we have verified can work with your
                stack. If something isn't feasible, you'll hear it in the first
                conversation — along with the closest alternative.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Where Does Your Week Actually Go?"
        description="List the repetitive tasks eating your time — copying data, chasing enquiries, sending reminders. We'll identify what's safely automatable and what genuinely isn't."
        primaryLabel="Start the Conversation"
        primaryHref="/contact"
        secondaryLabel="View Pricing Approach"
        secondaryHref="/pricing"
      />
    </>
  );
}

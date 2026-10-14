import type { Metadata } from "next";
import { CalendarClock, FileText, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { processSteps } from "@/config/services";

export const metadata: Metadata = {
  title: "Our Process — From Idea to Working System",
  description:
    "How a Veya project moves: initial conversation, requirements, proposal and scope, design, development, testing, launch and handover — with honest timelines.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title={
          <>
            A Clear Path From Idea to{" "}
            <span className="text-gradient">Working System.</span>
          </>
        }
        description="Seven stages, no mystery. You'll always know what's happening, what's next, and what (if anything) we need from you."
      >
        <Button href="/contact" withArrow>
          Begin Stage One
        </Button>
        <Button href="/pricing" variant="secondary">
          See Pricing Approach
        </Button>
      </PageHero>

      {/* timeline */}
      <section className="border-t border-border py-20 sm:py-28" aria-label="Project stages">
        <Container size="narrow">
          <ol className="relative flex flex-col gap-0 border-l border-border pl-8 sm:pl-12">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 60} className="relative pb-14 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-8 top-1 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-accent bg-background sm:-left-12"
                />
                <span className="font-display text-sm font-semibold tracking-widest text-accent">
                  {step.step}
                </span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {step.title}
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* honesty notes */}
      <section className="border-t border-border bg-background-soft py-20 sm:py-28" aria-labelledby="expectations">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">What to expect</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 id="expectations" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Timelines and Costs, Stated Honestly
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: CalendarClock,
                title: "Timeline depends on scope",
                text: "A landing page and a connected multi-page system are different projects. Your proposal includes a realistic schedule — and we flag risks to it early, not late.",
              },
              {
                icon: FileText,
                title: "Costs are fixed before work",
                text: "Every engagement starts with an itemised written quote. Third-party subscriptions, hosting, and usage-based services are listed separately and explicitly.",
              },
              {
                icon: ShieldCheck,
                title: "You own the result",
                text: "Domain in your name, hosting you control, documented handover. The goal is a system that serves you — not one that holds you hostage.",
              },
            ].map((note, i) => (
              <Reveal key={note.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                    <note.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{note.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{note.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Every Project Starts With One Conversation."
        description="No forms that vanish into the void, no pushy sales call. Just a practical discussion about what you need and whether we're the right fit."
        primaryLabel="Start Your Project"
        primaryHref="/contact"
        secondaryLabel="Read the FAQ"
        secondaryHref="/faq"
      />
    </>
  );
}

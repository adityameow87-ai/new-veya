import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/config/faq";

export const metadata: Metadata = {
  title: "FAQ — Honest Answers, Up Front",
  description:
    "Answers about project timelines, pricing, maintenance, hosting, domain ownership, automation integrations, third-party software, revisions, and support.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Questions Businesses Actually Ask.{" "}
            <span className="text-gradient">Answered Honestly.</span>
          </>
        }
        description="Timelines, pricing, ownership, integrations, and what happens after launch — the practical stuff, with no hedging."
      />

      <section className="border-t border-border py-16 sm:py-24" aria-label="Frequently asked questions">
        <Container size="narrow">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-center text-sm leading-relaxed text-muted">
              Specific promises — delivery dates, support plans, maintenance
              terms — are only ever made in writing, per project. Anything here
              is general guidance, not a contractual commitment.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Didn't Find Your Answer?"
        description="Ask us directly — every question gets a real reply from a person, not a template."
        primaryLabel="Ask Your Question"
        primaryHref="/contact"
        secondaryLabel="See Our Process"
        secondaryHref="/process"
      />
    </>
  );
}

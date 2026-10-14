import type { Metadata } from "next";
import { ArrowRight, Layers } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { serviceGroups } from "@/config/services";

export const metadata: Metadata = {
  title: "Services — Websites & Business Automations",
  description:
    "Explore Veya's services: business website development, landing pages, e-commerce, lead capture automations, CRM and spreadsheet integrations, and custom workflow solutions.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Thoughtful Websites.{" "}
            <span className="text-gradient">Smarter Workflows.</span>
          </>
        }
        description="Two disciplines that work best together: a professional digital presence, and the quiet systems that handle what happens after someone discovers you."
      >
        <Button href="/contact" withArrow>
          Start a Project
        </Button>
        <Button href="/solutions" variant="secondary">
          See Combined Solutions
        </Button>
      </PageHero>

      {serviceGroups.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`group-${group.id}`}
          className="border-t border-border py-20 sm:py-28"
        >
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <Reveal>
                  <p className="eyebrow">{group.label}</p>
                </Reveal>
                <Reveal delay={90}>
                  <h2
                    id={`group-${group.id}`}
                    className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    {group.title}
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {group.summary}
                  </p>
                </Reveal>
              </div>
              <Reveal delay={120}>
                <Button href={group.href} variant="ghost" withArrow>
                  {group.title} in detail
                </Button>
              </Reveal>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((service, i) => (
                <Reveal as="li" key={service.id} delay={(i % 3) * 80}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ))}

      {/* combined band */}
      <section className="border-t border-border bg-background-soft py-20 sm:py-28">
        <Container size="narrow">
          <Reveal className="text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface text-accent">
              <Layers className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Stronger Together: Websites + Automations
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              A website creates opportunities; automations make sure none of
              them slip away. Bundled solutions connect the two from day one —
              one build, one coherent system.
            </p>
            <div className="mt-9">
              <Button href="/solutions" withArrow>
                Explore Combined Solutions
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Not Sure Which Service Fits?"
        description="Describe your business and what's slowing it down. We'll recommend the smallest project that solves the real problem — even if that means starting with a single page."
        primaryLabel="Tell Us What You Need"
        primaryHref="/contact"
        secondaryLabel="View Pricing Approach"
        secondaryHref="/pricing"
      />
    </>
  );
}

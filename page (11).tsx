import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { pricingNotes, pricingTiers } from "@/config/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — Clear, Itemised, No Surprises",
  description:
    "Veya's pricing approach: starter projects, business solutions and custom systems — every engagement begins with a fixed, itemised quote.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Honest Pricing, <span className="text-gradient">Agreed Up Front.</span>
          </>
        }
        description="Every project is different, so we don't publish pretend numbers. What we do publish is exactly how pricing works — and the promise that you'll approve the full cost before anything begins."
      >
        <Button href="/contact" withArrow>
          Request a Quote
        </Button>
        <Button href="/process" variant="secondary">
          How Projects Work
        </Button>
      </PageHero>

      {/* tiers */}
      <section className="border-t border-border py-20 sm:py-28" aria-label="Project tiers">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.id} delay={i * 90}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-7",
                    tier.featured
                      ? "border-accent/60 bg-surface shadow-lift"
                      : "border-border bg-surface"
                  )}
                >
                  {tier.featured && (
                    <span className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
                      Most common
                    </span>
                  )}
                  <h2 className="font-display text-xl font-semibold">{tier.name}</h2>
                  <p className="mt-1 text-sm text-muted">{tier.tagline}</p>
                  <div className="mt-6 border-y border-border py-5">
                    {tier.startingAt != null ? (
                      <p className="font-display text-3xl font-semibold">
                        From {tier.currency} {tier.startingAt.toLocaleString()}
                      </p>
                    ) : (
                      <>
                        <p className="font-display text-3xl font-semibold">
                          {tier.priceNote}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted">
                          A fixed, itemised figure is included in your written
                          proposal before any commitment.
                        </p>
                      </>
                    )}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    <span className="font-medium text-foreground">Best for:</span>{" "}
                    {tier.bestFor}
                  </p>
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Button
                      href="/contact"
                      variant={tier.featured ? "primary" : "secondary"}
                      className="w-full"
                    >
                      Request {tier.name} Quote
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* the fine print — in normal print */}
      <section className="border-t border-border bg-background-soft py-20 sm:py-28" aria-labelledby="fine-print">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow">The details, in full size</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="fine-print" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              No Asterisks Small Enough to Hide Behind
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4">
            {pricingNotes.map((note, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Tell Us What You Need. We'll Tell You What It Costs."
        description="Share your project requirements and receive a clear, itemised quote — valid, explained line by line, and entirely free of obligation."
        primaryLabel="Request Your Quote"
        primaryHref="/contact"
        secondaryLabel="Read the FAQ"
        secondaryHref="/faq"
      />
    </>
  );
}

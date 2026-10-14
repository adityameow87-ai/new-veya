import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WorkGallery } from "@/components/portfolio/WorkGallery";

export const metadata: Metadata = {
  title: "Work — Portfolio & Concept Studies",
  description:
    "Explore Veya's portfolio: website concepts, automation demos, and combined website + workflow solutions for local services, real estate, fitness, and hospitality businesses.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Work That Shows <span className="text-gradient">How We Think.</span>
          </>
        }
        description="Veya is a growing studio. Rather than invent a track record, we present clearly labelled concept studies and working demos — each one built to the same standard as client work."
      >
        <Button href="/contact" withArrow>
          Start Your Project
        </Button>
      </PageHero>

      <section className="border-t border-border py-20 sm:py-24" aria-label="Project gallery">
        <Container>
          <WorkGallery />
          <Reveal delay={100}>
            <div className="mt-12 flex items-start gap-4 rounded-2xl border border-dashed border-border-strong bg-surface p-6">
              <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">
                  Why concept projects?
                </span>{" "}
                Every card marked "Concept" is an original design and
                engineering study — not client work, and never presented as
                such. As real projects launch, they replace these studies with
                verified outcomes.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Your Project Could Be the First Case Study."
        description="Early clients get senior attention on every detail — and their results, with permission, become the proof for everyone after."
        primaryLabel="Start Your Project"
        primaryHref="/contact"
        secondaryLabel="See Our Process"
        secondaryHref="/process"
      />
    </>
  );
}

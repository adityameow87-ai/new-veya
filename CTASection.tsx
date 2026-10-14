import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";

/** Shared closing call-to-action band for interior pages. */
export function CTASection({
  title = "Let's Build Something That Moves You Forward.",
  description = "Tell us what you're building, what is slowing your business down, or where you'd like to grow. We'll explore a practical solution together.",
  primaryLabel = "Start Your Project",
  primaryHref = "/contact",
  secondaryLabel = "Explore Services",
  secondaryHref = "/services",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46rem 30rem at 50% 120%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />
      <Container className="relative" size="narrow">
        <Reveal className="text-center">
          <p className="eyebrow">— Begin the conversation</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryHref} size="lg" withArrow>
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryLabel}
            </Button>
          </div>
          {site.email && (
            <p className="mt-8 text-sm text-muted">
              Prefer email? Write to us at{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent-strong underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

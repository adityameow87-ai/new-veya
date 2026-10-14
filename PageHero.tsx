import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Shared interior-page hero with the ambient neuron-inspired aura. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44",
        className
      )}
    >
      {/* Ambient neuron aura — decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42rem 30rem at 82% -8%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%), radial-gradient(30rem 24rem at 8% 24%, color-mix(in srgb, var(--accent-deep) 12%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--accent) 26%, transparent) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(50rem 32rem at 70% 0%, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(50rem 32rem at 70% 0%, black, transparent 78%)",
        }}
      />
      <Container className="relative">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {children}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

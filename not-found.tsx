import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-24">
      {/* neuron-inspired decorative synapse map */}
      <svg
        aria-hidden
        viewBox="0 0 900 500"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="var(--accent)" strokeWidth="0.7" fill="none" opacity="0.5">
          <path d="M120 250 C 250 180, 340 300, 470 240 S 700 170, 810 250" />
          <path d="M120 250 C 260 330, 380 200, 520 300 S 720 340, 810 250" />
          <path d="M470 240 C 500 140, 620 120, 700 90" />
          <path d="M470 240 C 430 360, 560 420, 660 440" />
        </g>
        <g fill="var(--accent)">
          <circle cx="120" cy="250" r="7">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="470" cy="240" r="10" opacity="0.9" />
          <circle cx="470" cy="240" r="4" fill="var(--gold)" />
          <circle cx="810" cy="250" r="6" />
          <circle cx="700" cy="90" r="4" opacity="0.7" />
          <circle cx="660" cy="440" r="4" opacity="0.7" />
          <circle cx="520" cy="300" r="4" opacity="0.6" />
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,transparent,var(--bg)_90%)]" aria-hidden />

      <Container className="relative text-center" size="narrow">
        <p className="eyebrow">404 — Signal lost</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
          This branch doesn&rsquo;t connect anywhere.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted">
          The page you&rsquo;re looking for has moved, been renamed, or never
          existed. Let&rsquo;s get you back to a working connection.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg" withArrow>
            Back to Homepage
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Veya
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted">
          Or{" "}
          <Link
            href="/work"
            className="text-accent-strong underline-offset-4 hover:underline"
          >
            browse our work
          </Link>{" "}
          while you&rsquo;re here.
        </p>
      </Container>
    </section>
  );
}

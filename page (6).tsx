import type { Metadata } from "next";
import {
  Compass,
  HeartHandshake,
  Leaf,
  MessageSquareText,
  RefreshCcw,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About — Practical Technology, Thoughtful Design",
  description:
    "Veya's philosophy: practical technology, thoughtful design, reliable implementation, and clear communication — digital systems built around real business needs.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: Leaf,
    title: "Nature's intelligence",
    text: "Good systems, like neurons, are connected, efficient, and adaptive. We build websites and workflows the same way: every part with a purpose, every connection intentional.",
  },
  {
    icon: Wrench,
    title: "Practical technology",
    text: "Tools are chosen for reliability and fit, not fashion. If a spreadsheet solves it, we say so. If it needs custom engineering, we build exactly that — nothing more.",
  },
  {
    icon: Compass,
    title: "Thoughtful design",
    text: "Design is how a business earns trust in the first five seconds. Every layout, word, and interaction exists to make your value obvious and the next step easy.",
  },
  {
    icon: HeartHandshake,
    title: "Reliable implementation",
    text: "We ship what we promise, test it properly, document it, and stay reachable after launch. Boring reliability is a feature.",
  },
  {
    icon: MessageSquareText,
    title: "Clear communication",
    text: "Plain language, honest constraints, and no surprise invoices. You'll always know what's happening, what it costs, and why.",
  },
  {
    icon: RefreshCcw,
    title: "Continuous improvement",
    text: "Every project teaches us something. Processes, components, and workflows get sharper with each build — and existing clients benefit from what we learn.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Veya"
        title={
          <>
            Where Better Ideas Become{" "}
            <span className="text-gradient">Better Systems.</span>
          </>
        }
        description="Veya is a digital solutions studio for small and medium businesses — combining the precision of engineering with the interconnectedness of nature."
      >
        <Button href="/contact" withArrow>
          Work With Us
        </Button>
        <Button href="/process" variant="secondary">
          See How We Work
        </Button>
      </PageHero>

      {/* story */}
      <section className="border-t border-border py-20 sm:py-28" aria-labelledby="story">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div>
              <Reveal>
                <p className="eyebrow">Why Veya exists</p>
              </Reveal>
              <Reveal delay={90}>
                <h2 id="story" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Most Business Software Doesn&rsquo;t Talk. Most Business Websites Don&rsquo;t Work.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-6 flex flex-col gap-5 text-base leading-relaxed text-muted">
                  <p>
                    Small businesses lose hours every week to the same friction:
                    a website that doesn&rsquo;t earn trust, enquiries scattered
                    across inboxes, and customer details retyped between tools
                    that were never connected.
                  </p>
                  <p>
                    Veya exists to close that gap. We build the professional
                    website <em className="text-foreground not-italic">and</em>{" "}
                    the quiet workflows behind it as one system — so a
                    visitor&rsquo;s first click travels all the way to a
                    fast, organised follow-up without leaking anyone&rsquo;s time.
                  </p>
                  <p>
                    The neuron in our identity isn&rsquo;t decoration. It&rsquo;s
                    the design brief: one connected, living system where every
                    signal arrives where it&rsquo;s needed.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="rounded-2xl border border-border bg-surface p-8">
                <p className="eyebrow">Studio notes</p>
                <dl className="mt-6 flex flex-col gap-6">
                  {[
                    {
                      k: "Who we serve",
                      v: "Small and medium businesses: local services, real estate, fitness, hospitality, salons, consultants, and early-stage founders.",
                    },
                    {
                      k: "How we engage",
                      v: "Fixed-scope projects with written proposals, plus bundled website + automation builds and ongoing support arrangements.",
                    },
                    {
                      k: "A note on this section",
                      v: "This page intentionally avoids invented history, team biographies, and client counts. As the studio grows, real milestones will be added here — with dates and details you can verify.",
                    },
                  ].map((row) => (
                    <div key={row.k}>
                      <dt className="text-sm font-semibold text-foreground">{row.k}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-muted">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* principles */}
      <section className="border-t border-border bg-background-soft py-20 sm:py-28" aria-labelledby="principles">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Working principles</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 id="principles" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Six Ideas Behind Every Build
              </h2>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Sound Like the Way You Want to Work?"
        description="Start with a conversation about your business. No jargon, no pressure — just an honest look at whether we can help."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
        secondaryLabel="Browse Our Work"
        secondaryHref="/work"
      />
    </>
  );
}

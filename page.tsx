import type { Metadata } from "next";
import {
  Accessibility,
  BarChart3,
  Gauge,
  Handshake,
  MonitorSmartphone,
  Search,
  Send,
} from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { serviceGroups, websiteBuildSteps } from "@/config/services";
import { projects } from "@/config/projects";

export const metadata: Metadata = {
  title: "Website Development for Businesses",
  description:
    "Business websites, landing pages, portfolio sites, e-commerce and redesigns — responsive, accessible, fast, and built on search-friendly technical foundations.",
  alternates: { canonical: "/services/websites" },
};

const included = [
  {
    icon: MonitorSmartphone,
    title: "Responsive by default",
    text: "Designed mobile-first and verified across phone, tablet, laptop and desktop screens.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    text: "Semantic structure, keyboard-operable controls, readable contrast, and reduced-motion support.",
  },
  {
    icon: Gauge,
    title: "Performance",
    text: "Optimised images, modern delivery, and speed checks before launch — fast matters for trust and search.",
  },
  {
    icon: Search,
    title: "Search-friendly foundations",
    text: "Unique titles and descriptions, clean URLs, structured pages, sitemap and robots configuration.",
  },
  {
    icon: Send,
    title: "Enquiry integration",
    text: "Contact forms with validation, delivered to your inbox — or into sheets, CRMs and notification tools.",
  },
  {
    icon: Handshake,
    title: "Deployment & handover",
    text: "Launched on your domain with documentation, plus analytics integration where you request it.",
  },
];

export default function WebsitesPage() {
  const group = serviceGroups.find((g) => g.id === "websites")!;
  const examples = projects.filter(
    (p) => p.category === "websites" || p.slug === "pulse-fitness-studio"
  ).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Service — Websites"
        title={
          <>
            Your Business Deserves a{" "}
            <span className="text-gradient">Better Digital Presence.</span>
          </>
        }
        description="We design and build modern, responsive websites that communicate your value clearly, strengthen your brand, and help turn visitors into customers."
      >
        <Button href="/contact" withArrow>
          Discuss Your Website
        </Button>
        <Button href="/work" variant="secondary">
          See Example Work
        </Button>
      </PageHero>

      {/* what we build */}
      <section className="border-t border-border py-20 sm:py-28" aria-labelledby="what-we-build">
        <Container>
          <Reveal>
            <p className="eyebrow">What we build</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="what-we-build" className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Five Ways to Show Up Properly Online
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((service, i) => (
              <Reveal as="li" key={service.id} delay={(i % 3) * 80}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* what a project includes */}
      <section className="border-t border-border bg-background-soft py-20 sm:py-28" aria-labelledby="included">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Included in every project</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 id="included" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                The Foundations Are Not Optional Extras
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Every Veya website ships with the fundamentals done properly.
                Scope-specific features are listed individually in your proposal.
              </p>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* build process */}
      <section className="border-t border-border py-20 sm:py-28" aria-labelledby="build-process">
        <Container>
          <Reveal>
            <p className="eyebrow">The build process</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="build-process" className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              From First Idea to Working Website
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {websiteBuildSteps.map((step, i) => (
              <Reveal as="li" key={step.step} delay={(i % 4) * 90}>
                <div className="relative">
                  <span className="font-display text-4xl font-semibold text-accent/35">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <p className="mt-12 max-w-2xl rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
              <BarChart3 className="mr-2 inline h-4 w-4 text-accent" aria-hidden />
              Analytics, e-commerce platforms, booking tools, and other
              integrations are added where your project actually needs them —
              each item is scoped and priced transparently in your proposal.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* examples */}
      <section className="border-t border-border bg-background-soft py-20 sm:py-28" aria-labelledby="examples">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow">Example work</p>
              </Reveal>
              <Reveal delay={90}>
                <h2 id="examples" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Concepts That Show the Standard
                </h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Button href="/work" variant="ghost" withArrow>
                Browse all work
              </Button>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={i * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Ready for a Website That Works as Hard as You Do?"
        description="Tell us about your business and what your website needs to achieve. We'll reply with honest advice and a clear, itemised proposal."
        primaryLabel="Request a Website Proposal"
        primaryHref="/contact"
        secondaryLabel="See Pricing Approach"
        secondaryHref="/pricing"
      />
    </>
  );
}

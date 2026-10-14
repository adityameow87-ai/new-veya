import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Eye,
  Magnet,
  MonitorSmartphone,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { FlowDiagram } from "@/components/marketing/FlowDiagram";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { serviceGroups, processSteps } from "@/config/services";
import { projects } from "@/config/projects";
import { faqs } from "@/config/faq";
import { site } from "@/config/site";
import {
  Building2,
  Target,
  Palette,
  ShoppingBag,
  RefreshCcw,
  Table2,
  Share2,
  Sparkles,
  Plug,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  building: Building2,
  target: Target,
  palette: Palette,
  "shopping-bag": ShoppingBag,
  refresh: RefreshCcw,
  magnet: Magnet,
  table: Table2,
  workflow: Workflow,
  share: Share2,
  sparkles: Sparkles,
  plug: Plug,
};

function MiniService({
  icon,
  name,
  blurb,
  delay = 0,
}: {
  icon: string;
  name: string;
  blurb: string;
  delay?: number;
}) {
  const Icon = iconMap[icon] ?? Workflow;
  return (
    <Reveal delay={delay}>
      <div className="flex items-start gap-3.5 rounded-xl border border-border bg-surface-glass p-4 backdrop-blur-md transition-colors duration-300 hover:border-border-strong">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span>
          <span className="block text-sm font-semibold">{name}</span>
          <span className="mt-0.5 block text-xs leading-relaxed text-muted">
            {blurb}
          </span>
        </span>
      </div>
    </Reveal>
  );
}

/* ============================ SCENE 1 ============================ */
export function HeroScene() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center"
    >
      <div className="scene-shade pointer-events-none absolute inset-0" aria-hidden />
      <div className="scene-shade-t pointer-events-none absolute inset-x-0 top-0 h-40" aria-hidden />
      <Container className="relative pb-24 pt-32">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" aria-hidden />
              {site.name} — Digital Systems Studio
            </p>
          </Reveal>
          <Reveal delay={110}>
            <h1
              id="hero-title"
              className="mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.4rem]"
            >
              Better Digital Systems.{" "}
              <span className="text-gradient">Built to Grow.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Thoughtfully designed websites and intelligent automations that
              help businesses work smarter, connect better, and grow with
              confidence.
            </p>
          </Reveal>
          <Reveal delay={330}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#solutions" size="lg" withArrow>
                Explore Our Solutions
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Start a Conversation
              </Button>
            </div>
          </Reveal>
          <Reveal delay={430}>
            <p className="mt-12 flex items-center gap-2.5 text-xs tracking-wide text-muted">
              <MonitorSmartphone className="h-4 w-4 text-accent" aria-hidden />
              Websites, workflow automations, and the space where they meet.
            </p>
          </Reveal>
        </div>
      </Container>
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-border-strong p-1.5">
          <span className="scroll-hint-dot h-2 w-2 rounded-full bg-accent" />
        </div>
        <ChevronDown className="mx-auto mt-2 h-4 w-4 text-muted" />
      </div>
    </section>
  );
}

/* ============================ SCENE 2 ============================ */
export function WebsitesScene() {
  const group = serviceGroups[0];
  return (
    <section
      aria-labelledby="home-websites"
      className="relative flex min-h-[135svh] items-center py-24"
    >
      <div className="scene-shade pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <p className="eyebrow">01 — Web Experiences</p>
          </Reveal>
          <Reveal delay={90}>
            <h2
              id="home-websites"
              className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
            >
              Your Business Deserves a Better Digital Presence.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              We create modern, responsive websites that communicate your value
              clearly, strengthen your brand, and help turn visitors into
              customers.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {group.items.map((item, i) => (
              <MiniService
                key={item.id}
                icon={item.icon}
                name={item.name}
                blurb={item.benefits[0]}
                delay={i * 70}
              />
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-10">
              <Button href="/services/websites" variant="secondary" withArrow>
                Explore Website Services
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ============================ SCENE 3 ============================ */
export function AutomationsScene() {
  const group = serviceGroups[1];
  return (
    <section
      aria-labelledby="home-automations"
      className="relative flex min-h-[150svh] items-center py-24"
    >
      <div className="scene-shade-r pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <div className="ml-auto max-w-xl lg:max-w-2xl">
          <Reveal>
            <p className="eyebrow">02 — Intelligent Automation</p>
          </Reveal>
          <Reveal delay={90}>
            <h2
              id="home-automations"
              className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
            >
              Less Repetitive Work. More Room to Grow.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Connect everyday business tools, streamline repetitive tasks, and
              create workflows that give you more time to focus on meaningful
              work.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {group.items.map((item, i) => (
              <MiniService
                key={item.id}
                icon={item.icon}
                name={item.name}
                blurb={item.benefits[0]}
                delay={i * 60}
              />
            ))}
          </div>
          <Reveal delay={160}>
            <div className="mt-8 rounded-2xl border border-border bg-surface-glass p-5 backdrop-blur-md">
              <p className="mb-4 text-xs font-medium tracking-[0.18em] text-muted uppercase">
                A typical intake workflow
              </p>
              <FlowDiagram
                nodes={[
                  { icon: "globe", label: "Website Enquiry" },
                  { icon: "database", label: "Processing" },
                  { icon: "table", label: "Spreadsheet" },
                  { icon: "bell", label: "Notification" },
                ]}
              />
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Illustrative flow — integrations are configured around your
                actual tools during a project.
              </p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10">
              <Button href="/services/automations" variant="secondary" withArrow>
                Explore Automation Services
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ============================ SCENE 4 ============================ */
const stages = [
  {
    icon: Eye,
    title: "Attract",
    text: "Give customers a professional place to discover your business.",
  },
  {
    icon: Magnet,
    title: "Capture",
    text: "Make it easy for visitors to enquire about your services.",
  },
  {
    icon: Workflow,
    title: "Connect",
    text: "Send enquiry data into the business tools you already use.",
  },
];

export function ConnectedScene() {
  return (
    <section
      id="solutions"
      aria-labelledby="home-connected"
      className="relative flex min-h-[135svh] items-center py-24"
    >
      <div className="scene-shade-b pointer-events-none absolute inset-0" aria-hidden />

      {/* floating artifact cards — desktop only */}
      <Reveal
        className="pointer-events-none absolute left-[6%] top-[10%] hidden w-60 xl:block"
        delay={200}
      >
        <div className="animate-float rounded-2xl border border-border bg-surface-glass p-4 shadow-lift backdrop-blur-xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            Website preview
          </p>
          <div className="flex flex-col gap-2">
            <span className="h-2.5 w-3/4 rounded-full bg-border-strong" />
            <span className="h-2.5 w-1/2 rounded-full bg-border-strong" />
            <span className="mt-1 h-2 w-2/3 rounded-full bg-border" />
            <span className="mt-2 h-6 w-20 rounded-full bg-accent/80" />
          </div>
        </div>
      </Reveal>
      <Reveal
        className="pointer-events-none absolute right-[5%] top-[16%] hidden w-60 xl:block"
        delay={350}
      >
        <div
          className="animate-float rounded-2xl border border-border bg-surface-glass p-4 shadow-lift backdrop-blur-xl"
          style={{ animationDelay: "1.4s" }}
        >
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
            Workflow preview
          </p>
          <div className="flex flex-col gap-2 text-[11px] text-muted">
            <span className="rounded-lg border border-border bg-surface-2 px-2.5 py-1.5">
              Enquiry received
            </span>
            <span className="rounded-lg border border-border bg-surface-2 px-2.5 py-1.5">
              Record added to sheet
            </span>
            <span className="rounded-lg border border-accent/50 bg-accent/10 px-2.5 py-1.5 text-accent-strong">
              Owner notified
            </span>
          </div>
        </div>
      </Reveal>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">03 — Connected Solutions</p>
          </Reveal>
          <Reveal delay={90}>
            <h2
              id="home-connected"
              className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
            >
              Your Website and Workflows. Working Together.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              A great website creates opportunities. Smart automations help
              manage what happens next. Bring both together to build a more
              connected business.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {stages.map((stage, i) => (
            <Reveal key={stage.title} delay={i * 110}>
              <div className="h-full rounded-2xl border border-border bg-surface-glass p-6 text-left backdrop-blur-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                  <stage.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {stage.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-border bg-surface-glass p-5 backdrop-blur-md">
            <FlowDiagram
              nodes={[
                { icon: "globe", label: "Website Visitor" },
                { icon: "database", label: "Enquiry Form" },
                { icon: "table", label: "Business Data" },
                { icon: "bell", label: "Notification" },
              ]}
            />
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 text-center">
            <Button href="/solutions" withArrow>
              Discuss Your Project
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================ SCENE 5 ============================ */
export function PortfolioScene() {
  const featured = projects.slice(0, 3);
  return (
    <section
      aria-labelledby="home-work"
      className="relative border-t border-border bg-background py-24 sm:py-32"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow">04 — Selected Work</p>
            </Reveal>
            <Reveal delay={90}>
              <h2
                id="home-work"
                className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
              >
                Systems We&rsquo;d Build for Businesses Like Yours.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Veya is a young studio — so instead of inventing client stories,
                we show clearly labelled concept studies and working demos that
                demonstrate exactly how we design and build.
              </p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Button href="/work" variant="secondary" withArrow>
              View Our Work
            </Button>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ================= Process & FAQ (solid sections) ================ */
export function ProcessScene() {
  return (
    <section
      aria-labelledby="home-process"
      className="relative border-t border-border bg-background-soft py-24 sm:py-32"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow">05 — How We Work</p>
            </Reveal>
            <Reveal delay={90}>
              <h2
                id="home-process"
                className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
              >
                A Calm, Transparent Process.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Button href="/process" variant="ghost" withArrow>
              The full process
            </Button>
          </Reveal>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li
              key={step.step}
              className="reveal is-visible bg-surface p-6"
              style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            >
              <span className="font-display text-sm font-semibold text-accent">
                {step.step}
              </span>
              <h3 className="mt-2.5 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description.split(".")[0]}.
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function FaqScene() {
  return (
    <section
      aria-labelledby="home-faq"
      className="relative border-t border-border bg-background py-24 sm:py-32"
    >
      <Container size="narrow">
        <Reveal className="text-center">
          <p className="eyebrow">06 — Questions</p>
          <h2
            id="home-faq"
            className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"
          >
            Honest Answers, Up Front.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-12">
            <Accordion items={faqs.slice(0, 5)} />
          </div>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-8 text-center text-sm text-muted">
            More questions?{" "}
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 text-accent-strong underline-offset-4 hover:underline"
            >
              Read the full FAQ
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================ SCENE 6 ============================ */
export function FinalScene() {
  return (
    <section
      aria-labelledby="home-final"
      className="relative flex min-h-[100svh] items-center border-t border-transparent py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_45%,transparent_30%,var(--bg)_105%)]" aria-hidden />
      <Container className="relative" size="narrow">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow">— Where ideas take root</p>
          </Reveal>
          <Reveal delay={110}>
            <h2
              id="home-final"
              className="mt-6 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl"
            >
              Let&rsquo;s Build Something That{" "}
              <span className="text-gradient">Moves You Forward.</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Tell us what you&rsquo;re building, what is slowing your business
              down, or where you&rsquo;d like to grow. We&rsquo;ll explore a
              practical solution together.
            </p>
          </Reveal>
          <Reveal delay={330}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="lg" withArrow>
                Start Your Project
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                Contact {site.name}
              </Button>
            </div>
          </Reveal>
          {site.email && (
            <Reveal delay={430}>
              <p className="mt-10 text-sm text-muted">
                Or write directly —{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent-strong underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

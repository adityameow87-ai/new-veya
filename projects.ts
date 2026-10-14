import type { Project, ProjectCategory } from "@/types";

export const projectCategories: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "websites", label: "Websites" },
  { id: "automations", label: "Automations" },
  { id: "combined", label: "Combined Solutions" },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  websites: "Website",
  automations: "Automation",
  combined: "Website + Automation",
};

/**
 * Portfolio entries.
 * ------------------------------------------------------------------
 * These are honest concept studies and interactive demos created to
 * demonstrate Veya's design and engineering approach. Each is clearly
 * labelled "Concept". Replace with real client projects as they ship.
 * ------------------------------------------------------------------
 */
export const projects: Project[] = [
  {
    slug: "evergreen-home-services",
    title: "Evergreen Home Services",
    category: "combined",
    summary:
      "A local cleaning company website with enquiries flowing straight into a structured lead sheet and instant notifications.",
    overview:
      "A concept study for a local service business whose enquiries arrive by phone, message, and a basic contact form — and get lost between them.",
    problem:
      "Local service businesses often receive enquiries across several channels with no single place to track them, leading to slow replies and missed jobs.",
    solution:
      "A focused service website with clear pages per offering, a short enquiry form, and a workflow that records each lead into a structured spreadsheet while notifying the owner instantly.",
    approach:
      "Conversion-first content structure, fast static delivery, and a minimal automation chain that uses tools a small business already pays for.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Google Sheets API", "Email / Telegram notification"],
    deliverables: ["Multi-page business website", "Validated enquiry form", "Lead-to-sheet workflow", "Owner notifications"],
    isConcept: true,
    variant: "flow",
    accent: "#34d399",
    duration: "Concept study",
  },
  {
    slug: "atlas-realty-group",
    title: "Atlas Realty Group",
    category: "websites",
    summary:
      "A premium concept website for a real-estate practice — listings, area guides, and a clear valuation enquiry path.",
    overview:
      "A concept website exploring how a boutique real-estate business can present listings and local expertise with editorial polish.",
    problem:
      "Property businesses need to look established immediately; cluttered listing templates and slow pages erode trust before a viewing is ever booked.",
    solution:
      "A composed, image-led site structure: featured listings, neighbourhood guides, agent credibility, and a short valuation-enquiry form connected to the team inbox.",
    approach:
      "Spacious grid layouts, restrained animation, and performance-first media handling so photography loads fast on mobile data.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Optimised media pipeline"],
    deliverables: ["Listing-led website design", "Area guide structure", "Valuation enquiry flow"],
    isConcept: true,
    variant: "site",
    accent: "#6ee7b7",
    duration: "Concept study",
  },
  {
    slug: "pulse-fitness-studio",
    title: "Pulse Fitness Studio",
    category: "combined",
    summary:
      "A landing page concept for a gym, paired with a class-enquiry workflow that notifies the front desk in seconds.",
    overview:
      "A concept showing how a single focused landing page plus a small automation can outperform a sprawling, unmaintained site for local gyms.",
    problem:
      "Gyms run campaigns and trials, but generic pages and slow manual replies waste the intent those campaigns generate.",
    solution:
      "One persuasive landing page per offer, and an automation that records each trial request and pings the front desk instantly so staff can respond while intent is high.",
    approach:
      "High-energy visual direction kept readable, a form asking only what's needed, and Telegram/email notifications scoped to real staff routines.",
    stack: ["Next.js", "Tailwind CSS", "Form validation", "Notification workflow"],
    deliverables: ["Campaign landing page", "Trial-enquiry automation", "Staff notification setup"],
    isConcept: true,
    variant: "landing",
    accent: "#a3e635",
    duration: "Concept study",
  },
  {
    slug: "sage-and-stone-cafe",
    title: "Sage & Stone Café",
    category: "websites",
    summary:
      "A warm, editorial café website concept with menus, opening hours, and private-event enquiries.",
    overview:
      "A hospitality-focused concept site that treats a café's menu and story with the same care as its interior.",
    problem:
      "Cafés rely on social profiles for menus and updates; information is hard to find, and private-event enquiries arrive unstructured.",
    solution:
      "A compact site with a proper menu structure, practical visit information, and a dedicated events-enquiry form that collects dates, party size, and notes up front.",
    approach:
      "Editorial typography, generous whitespace, and an enquiry flow that turns vague messages into actionable requests.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    deliverables: ["Café website", "Menu structure", "Events enquiry form"],
    isConcept: true,
    variant: "site",
    accent: "#d9f99d",
    duration: "Concept study",
  },
  {
    slug: "leadflow-intake-demo",
    title: "LeadFlow Intake Demo",
    category: "automations",
    summary:
      "An interactive demonstration of the enquiry-to-spreadsheet pipeline: form → validation → structured record → notification.",
    overview:
      "A working pattern demo of the automation that powers most Veya client websites — the journey of one enquiry from form field to follow-up.",
    problem:
      "Business owners are told to 'automate lead handling' but rarely get to see precisely what happens to an enquiry after the submit button.",
    solution:
      "A transparent pipeline: client-side and server-side validation, a durable record, then routed notifications — each stage visible and inspectable.",
    approach:
      "Built with the same stack used in production projects, instrumented so every stage can be verified during handover.",
    stack: ["Next.js API routes", "Zod validation", "PostgreSQL", "Notification adapters"],
    deliverables: ["Enquiry API", "Validation layer", "Data capture", "Notification routing"],
    isConcept: true,
    variant: "dashboard",
    accent: "#2dd4bf",
    duration: "Internal demo",
  },
  {
    slug: "salon-booking-flow",
    title: "Salon Booking Flow",
    category: "automations",
    summary:
      "A workflow concept for salons: enquiries triaged by service, summarised, and delivered to the right team member.",
    overview:
      "An automation concept for salons and beauty businesses drowning in unstructured DMs and overlapping booking requests.",
    problem:
      "Booking requests arrive as vague messages; staff spend evenings sorting threads instead of confirming appointments.",
    solution:
      "A structured request form feeds a triage workflow: requests are classified by service and urgency, summarised, and delivered where the team actually looks.",
    approach:
      "Simple inputs for clients, strict rules for routing, and an AI-assisted summary step kept reviewable by humans.",
    stack: ["Workflow automation", "Classification rules", "AI-assisted summaries", "Email / Telegram"],
    deliverables: ["Structured request intake", "Triage workflow", "Team notifications"],
    isConcept: true,
    variant: "flow",
    accent: "#86efac",
    duration: "Concept study",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function adjacentProjects(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return { prev, next };
}

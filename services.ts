import type { ProcessStep, ServiceGroup } from "@/types";

export const serviceGroups: ServiceGroup[] = [
  {
    id: "websites",
    label: "01 — Web Experiences",
    title: "Website Development",
    summary:
      "Modern, responsive websites that communicate your value clearly, strengthen your brand, and help turn visitors into customers.",
    href: "/services/websites",
    items: [
      {
        id: "business-websites",
        name: "Business Websites",
        blurb:
          "A complete, professional website that presents your services, builds trust, and gives customers a clear way to reach you.",
        problem:
          "Your business is hard to evaluate online, or an outdated site costs you credibility before a conversation ever starts.",
        benefits: [
          "Clear service pages structured around what customers ask",
          "Responsive design that works on phones, tablets and desktops",
          "Contact and enquiry paths built into every key page",
        ],
        icon: "building",
        href: "/services/websites",
      },
      {
        id: "landing-pages",
        name: "Landing Pages",
        blurb:
          "Focused pages built around a single offer, campaign, or service — designed to guide visitors toward one clear action.",
        problem:
          "Campaign traffic lands on generic pages that don't explain the offer or give visitors a reason to enquire.",
        benefits: [
          "One message, one audience, one call to action",
          "Fast loading and easy to connect to ads or social campaigns",
          "Enquiry forms wired to your inbox or workflows",
        ],
        icon: "target",
        href: "/services/websites",
      },
      {
        id: "portfolio-brand",
        name: "Portfolio & Brand Websites",
        blurb:
          "Expressive sites for professionals, studios, and creators who need their work to make the first impression.",
        problem:
          "Your work speaks for itself, but your current online presence doesn't do it justice.",
        benefits: [
          "A distinctive visual direction aligned with your identity",
          "Project galleries and case-study structures",
          "A maintainable foundation you can grow over time",
        ],
        icon: "palette",
        href: "/services/websites",
      },
      {
        id: "ecommerce",
        name: "E-commerce Websites",
        blurb:
          "Clean, trustworthy online stores with a straightforward buying experience on every device.",
        problem:
          "Selling online feels complicated, or your current store leaks customers through friction and clutter.",
        benefits: [
          "Product, cart and checkout flows kept simple",
          "Payment and order-notification setup where supported",
          "Automations for order and enquiry handling available",
        ],
        icon: "shopping-bag",
        href: "/services/websites",
      },
      {
        id: "website-redesign",
        name: "Website Redesigns",
        blurb:
          "A careful rebuild of an existing site — keeping what works, fixing what doesn't, and modernising the whole experience.",
        problem:
          "Your site technically works but looks dated, loads slowly, or no longer reflects the business you've become.",
        benefits: [
          "Content and structure audit before any design work",
          "Improved performance, accessibility and mobile experience",
          "Careful migration that protects existing search presence",
        ],
        icon: "refresh",
        href: "/services/websites",
      },
    ],
  },
  {
    id: "automations",
    label: "02 — Intelligent Automation",
    title: "Automation Services",
    summary:
      "Connect everyday business tools, streamline repetitive tasks, and create workflows that give you more time for meaningful work.",
    href: "/services/automations",
    items: [
      {
        id: "lead-capture",
        name: "Lead Capture Workflows",
        blurb:
          "Every website enquiry is captured, structured, and delivered where you need it — automatically and reliably.",
        problem:
          "Enquiries arrive in different places, get buried in inboxes, and follow-ups happen late or not at all.",
        benefits: [
          "Enquiry data validated and organised at the source",
          "Instant routing to email, sheet, or CRM",
          "Optional auto-replies so leads hear from you immediately",
        ],
        icon: "magnet",
        href: "/services/automations",
      },
      {
        id: "crm-spreadsheet",
        name: "Spreadsheet & CRM Integrations",
        blurb:
          "Sync enquiries, bookings, and customer records into the spreadsheets or CRM tools your business already uses.",
        problem:
          "You retype the same customer information into multiple tools, and records drift out of sync.",
        benefits: [
          "Single source of truth for enquiry and customer data",
          "Works with tools like Google Sheets, Airtable and popular CRMs",
          "Depends on your software's API access — assessed up front",
        ],
        icon: "table",
        href: "/services/automations",
      },
      {
        id: "process-automation",
        name: "Business Process Automation",
        blurb:
          "Repetitive internal tasks — notifications, follow-ups, data entry, reporting — handled quietly in the background.",
        problem:
          "Hours every week disappear into copying, pasting, reminding, and checking.",
        benefits: [
          "Map the process first; automate only what saves real time",
          "Notifications to email or Telegram when action is needed",
          "Human checkpoints kept where judgement matters",
        ],
        icon: "workflow",
        href: "/services/automations",
      },
      {
        id: "social-workflows",
        name: "Social Media Workflows",
        blurb:
          "Practical support for publishing and engagement routines — scheduling inputs, content libraries, and response triage.",
        problem:
          "Staying present on social media eats into time that should run the business.",
        benefits: [
          "Content pipelines organised in tools you already know",
          "Enquiry and comment triage routed to one place",
          "Platform rules and API limits respected — scoped per project",
        ],
        icon: "share",
        href: "/services/automations",
      },
      {
        id: "ai-assisted",
        name: "AI-Assisted Business Tasks",
        blurb:
          "Carefully scoped AI steps inside real workflows: summarising enquiries, drafting replies, classifying requests.",
        problem:
          "Useful AI feels out of reach, or generic tools don't fit the way your business actually works.",
        benefits: [
          "Applied only where it measurably helps a workflow",
          "Inputs and outputs kept transparent and reviewable",
          "No black-box promises — behaviour is tested before handover",
        ],
        icon: "sparkles",
        href: "/services/automations",
      },
      {
        id: "custom-integrations",
        name: "Custom Integrations",
        blurb:
          "Bespoke connections between websites, APIs, and internal tools when off-the-shelf automation platforms fall short.",
        problem:
          "Your process spans tools that don't talk to each other, and manual glue work fills the gap.",
        benefits: [
          "Custom API integrations designed around your exact flow",
          "Feasibility confirmed with your software access in advance",
          "Documented, maintainable implementation with handover notes",
        ],
        icon: "plug",
        href: "/services/automations",
      },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Initial conversation",
    description:
      "A relaxed call or message exchange about your business, your goals, and what's slowing you down. No commitment required.",
  },
  {
    step: "02",
    title: "Understanding requirements",
    description:
      "We dig into the details — audiences, content, tools you already use, and what success looks like for this project.",
  },
  {
    step: "03",
    title: "Proposal and scope",
    description:
      "You receive a clear written proposal: deliverables, structure, timeline estimate, and a fixed or capped price. No hidden items.",
  },
  {
    step: "04",
    title: "Design and planning",
    description:
      "Page structures, user flows, and visual direction are agreed before build begins, so there are no surprises later.",
  },
  {
    step: "05",
    title: "Development",
    description:
      "The website and workflows are built in focused stages, with progress you can review and comment on along the way.",
  },
  {
    step: "06",
    title: "Testing and review",
    description:
      "Every page, form, and automation is checked across devices. You test the full experience and request adjustments.",
  },
  {
    step: "07",
    title: "Launch and handover",
    description:
      "We deploy, connect your domain, verify every workflow live, and hand over documentation so you stay in control.",
  },
];

export const websiteBuildSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We learn about your business, customers, competitors, and what the website must achieve.",
  },
  {
    step: "02",
    title: "Structure and planning",
    description:
      "Sitemap, page purposes, and content requirements are agreed so every page has a job.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Visual direction, layouts, and components designed around your brand — reviewed before build.",
  },
  {
    step: "04",
    title: "Development",
    description:
      "Responsive, accessible pages built with performance and search-friendly foundations.",
  },
  {
    step: "05",
    title: "Testing",
    description:
      "Forms, links, layouts, and speed verified across phones, tablets, and desktops.",
  },
  {
    step: "06",
    title: "Deployment",
    description:
      "Launch on fast, reliable hosting with your domain connected and SSL configured.",
  },
  {
    step: "07",
    title: "Handover",
    description:
      "Documentation, analytics (where requested), and a walkthrough so you stay in control.",
  },
];

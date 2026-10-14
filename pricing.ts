import type { PricingTier } from "@/types";

/**
 * Pricing configuration.
 * ------------------------------------------------------------------
 * Final prices have not been published yet. Set `startingAt` to a
 * number (in `currency`) to display "from $X" — until then each tier
 * shows "Request a Quote". Update this single file when pricing is
 * confirmed.
 * ------------------------------------------------------------------
 */
export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Projects",
    tagline: "For focused, well-defined needs",
    startingAt: null,
    currency: "USD",
    priceNote: "Request a Quote",
    bestFor:
      "Landing pages, focused website refreshes, or a single well-scoped automation.",
    features: [
      "One-page website or landing page, or one automation workflow",
      "Mobile-first responsive design",
      "Contact / enquiry form with validation",
      "Basic on-page SEO foundations",
      "Deployment to your hosting and domain connection",
      "Handover walkthrough and documentation",
    ],
  },
  {
    id: "business",
    name: "Business Solutions",
    tagline: "For businesses ready to grow properly",
    startingAt: null,
    currency: "USD",
    priceNote: "Request a Quote",
    bestFor:
      "Multi-page business websites, e-commerce, or a website bundled with lead-handling automations.",
    features: [
      "Multi-page custom website (typically 5–10 pages)",
      "Design direction aligned with your brand",
      "Enquiry capture connected to email, sheet, or CRM",
      "Performance, accessibility and SEO foundations",
      "Content structure guidance and copy support",
      "30 days of post-launch adjustments for launch issues",
    ],
    featured: true,
  },
  {
    id: "custom",
    name: "Custom Projects",
    tagline: "For connected systems and bespoke workflows",
    startingAt: null,
    currency: "USD",
    priceNote: "Request a Quote",
    bestFor:
      "Custom integrations, AI-assisted workflows, and multi-tool automation systems.",
    features: [
      "Scoped discovery and workflow mapping workshop",
      "Custom API integrations between your tools",
      "AI-assisted processing where it measurably helps",
      "Staging environment and acceptance testing",
      "Operational documentation and team handover",
      "Optional ongoing support arrangement",
    ],
  },
];

export const pricingNotes: string[] = [
  "Every project begins with a written, itemised proposal — the price you approve is the price you pay, unless you expand the scope.",
  "Complex integrations, third-party subscriptions (CRM plans, automation platforms, AI usage), hosting, and domain costs may involve additional charges, which are identified in the proposal before work begins.",
  "Timelines depend on project scope and how quickly content and feedback are available; a realistic schedule is included in every proposal.",
];

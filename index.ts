export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "telegram"
  | "x";

export interface SiteConfig {
  name: string;
  domain: string;
  url: string;
  tagline: string;
  description: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  location: string | null;
  socials: Record<SocialPlatform, string | null>;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
}

export interface ServiceItem {
  id: string;
  name: string;
  blurb: string;
  problem: string;
  benefits: string[];
  icon: string;
  href: string;
}

export interface ServiceGroup {
  id: "websites" | "automations";
  label: string;
  title: string;
  summary: string;
  href: string;
  items: ServiceItem[];
}

export type ProjectCategory = "websites" | "automations" | "combined";

export type PreviewVariant =
  | "site"
  | "store"
  | "landing"
  | "dashboard"
  | "flow";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  approach: string;
  stack: string[];
  deliverables: string[];
  isConcept: boolean;
  variant: PreviewVariant;
  accent: string;
  duration?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  startingAt: number | null;
  currency: string;
  priceNote: string;
  bestFor: string;
  features: string[];
  featured?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

import type { NavItem } from "@/types";

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Website Development",
        href: "/services/websites",
        description:
          "Business sites, landing pages, portfolios and e-commerce.",
      },
      {
        label: "Automation Services",
        href: "/services/automations",
        description:
          "Lead capture, CRM and workflow integrations that save time.",
      },
      {
        label: "Combined Solutions",
        href: "/solutions",
        description:
          "A connected website and workflow system working together.",
      },
    ],
  },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Services Overview", href: "/services" },
      { label: "Website Development", href: "/services/websites" },
      { label: "Automation Services", href: "/services/automations" },
      { label: "Combined Solutions", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "About Veya", href: "/about" },
      { label: "Our Process", href: "/process" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

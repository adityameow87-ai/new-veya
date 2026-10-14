import type { SiteConfig } from "@/types";

/**
 * Central business configuration for Veya.
 * ------------------------------------------------------------------
 * EDIT HERE to change contact details across the entire website.
 * Any value set to `null` is treated as "not configured" and the
 * matching public link is automatically hidden from the interface.
 * Replace the placeholder email with the real inbox before launch.
 * ------------------------------------------------------------------
 */
export const site: SiteConfig = {
  name: "Veya",
  domain: "veya.shop",
  url: "https://veya.shop",
  tagline: "Better Digital Systems. Built to Grow.",
  description:
    "Veya designs and builds thoughtful business websites and intelligent automations that help companies work smarter, connect better, and grow with confidence.",

  // Editable placeholder — replace with the verified business inbox.
  email: "hello@veya.shop",

  // Not configured yet — hidden publicly until real values are added.
  phone: null,
  whatsapp: null,
  location: null,

  socials: {
    instagram: null,
    facebook: null,
    linkedin: null,
    telegram: null,
    x: null,
  },
};

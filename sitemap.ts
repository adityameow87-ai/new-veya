import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/config/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/services/websites",
    "/services/automations",
    "/solutions",
    "/work",
    "/about",
    "/process",
    "/pricing",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...projectRoutes];
}

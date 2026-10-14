import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Magnet,
  Palette,
  Plug,
  RefreshCcw,
  Share2,
  ShoppingBag,
  Sparkles,
  Table2,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
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

export function ServiceCard({
  service,
  compact = false,
}: {
  service: ServiceItem;
  compact?: boolean;
}) {
  const Icon = icons[service.icon] ?? Workflow;

  return (
    <Link
      href={service.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-lift sm:p-7",
        compact && "p-5 sm:p-6"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
        }}
      />
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent transition-colors duration-500 group-hover:border-border-strong">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">
        {service.name}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
        {service.blurb}
      </p>
      {!compact && (
        <ul className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4">
          {service.benefits.slice(0, 2).map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-xs leading-relaxed text-muted"
            >
              <span
                aria-hidden
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              {b}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
        Learn more
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}

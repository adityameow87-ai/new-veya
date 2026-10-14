import {
  ArrowDown,
  Bell,
  Database,
  Globe,
  Table2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  database: Database,
  table: Table2,
  bell: Bell,
};

export interface FlowNode {
  icon: keyof typeof iconMap;
  label: string;
  sub?: string;
}

/**
 * Illustrative workflow strip: node → connector (with travelling
 * pulse) → node. Stacks vertically on mobile. Motion is decorative
 * and disabled under prefers-reduced-motion.
 */
export function FlowDiagram({
  nodes,
  className,
  animated = true,
}: {
  nodes: FlowNode[];
  className?: string;
  animated?: boolean;
}) {
  return (
    <ol
      className={cn(
        "flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0",
        className
      )}
      aria-label={nodes.map((n) => n.label).join(" → ")}
    >
      {nodes.map((node, i) => {
        const Icon = iconMap[node.icon];
        return (
          <li key={node.label} className="contents">
            <div className="flex min-w-[9.5rem] flex-1 items-center gap-3.5 rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">
                  {node.label}
                </span>
                {node.sub && (
                  <span className="mt-0.5 text-xs text-muted">{node.sub}</span>
                )}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <>
                <div
                  className="flow-connector mx-3 hidden md:block"
                  aria-hidden
                >
                  {animated && (
                    <span
                      className="flow-dot"
                      style={{ animationDelay: `${i * 0.7}s` }}
                    />
                  )}
                </div>
                <span
                  className="flex justify-center text-accent md:hidden"
                  aria-hidden
                >
                  <ArrowDown className="h-4 w-4" />
                </span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}

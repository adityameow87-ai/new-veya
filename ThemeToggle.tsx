"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import type { ThemePreference } from "@/lib/theme";

const options: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { preference, resolved, setPreference } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const ActiveIcon = !mounted
    ? Monitor
    : preference === "system"
      ? Monitor
      : resolved === "dark"
        ? Moon
        : Sun;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={`Theme: ${mounted ? preference : "system"}. Open theme menu`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-border bg-surface-glass text-muted backdrop-blur-md transition-colors hover:border-border-strong hover:text-foreground",
          compact ? "h-9 w-9" : "h-10 w-10"
        )}
      >
        <ActiveIcon className="h-[18px] w-[18px]" aria-hidden />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Theme preference"
          className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lift"
        >
          {options.map(({ value, label, icon: Icon }) => {
            const active = mounted && preference === value;
            return (
              <button
                key={value}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setPreference(value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-surface-2 text-foreground"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="flex-1 text-left">{label}</span>
                {active && <Check className="h-4 w-4 text-accent" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

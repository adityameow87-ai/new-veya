"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 text-accent transition-transform duration-500 group-hover:rotate-[30deg]"
        aria-hidden
        fill="none"
      >
        <circle cx="16" cy="17" r="5.2" fill="currentColor" opacity="0.9" />
        <circle cx="16" cy="17" r="2.1" fill="var(--gold)" />
        <path
          d="M16 11.8V4.5M12.5 12.6 7 7.5M19.6 12.7l5.4-5.2M11.4 19.5 5 22M20.8 19.8l6.8 1.8M16 22.3v6.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="16" cy="4" r="1.5" fill="currentColor" />
        <circle cx="6.6" cy="7.1" r="1.5" fill="currentColor" />
        <circle cx="25.4" cy="7" r="1.5" fill="currentColor" />
        <circle cx="4.5" cy="22.3" r="1.5" fill="currentColor" />
        <circle cx="28" cy="21.8" r="1.5" fill="currentColor" />
        <circle cx="16" cy="29" r="1.5" fill="currentColor" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">
        {site.name}
      </span>
    </Link>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and lock body scroll while open.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openDrop = () => {
    if (dropTimeout.current) clearTimeout(dropTimeout.current);
    setDropOpen(true);
  };
  const closeDrop = () => {
    if (dropTimeout.current) clearTimeout(dropTimeout.current);
    dropTimeout.current = setTimeout(() => setDropOpen(false), 140);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border bg-surface-glass backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openDrop}
                  onMouseLeave={closeDrop}
                >
                  <Link
                    href={item.href}
                    aria-expanded={dropOpen}
                    aria-haspopup="true"
                    onFocus={openDrop}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive(pathname, item.href)
                        ? "text-accent-strong"
                        : "text-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        dropOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </Link>
                  {dropOpen && (
                    <div
                      className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                      onMouseEnter={openDrop}
                      onMouseLeave={closeDrop}
                    >
                      <div className="overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-lift">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setDropOpen(false)}
                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface-2"
                          >
                            <span className="block text-sm font-medium text-foreground">
                              {child.label}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                              {child.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive(pathname, item.href)
                      ? "text-accent-strong"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-on-accent transition-all duration-300 hover:bg-accent-strong sm:inline-flex"
            >
              Start a Project
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-glass text-foreground backdrop-blur-md lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background transition-all duration-500 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="h-[4.25rem] shrink-0" />
        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-10 pt-4"
        >
          {primaryNav.map((item, i) => (
            <div key={item.href}>
              <Link
                href={item.href}
                tabIndex={mobileOpen ? 0 : -1}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-2xl font-medium tracking-tight transition-all duration-500",
                  isActive(pathname, item.href)
                    ? "text-accent-strong"
                    : "text-foreground",
                  mobileOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                )}
                style={{ transitionDelay: `${80 + i * 50}ms` }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mb-2 ml-4 flex flex-col gap-1 border-l border-border pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      tabIndex={mobileOpen ? 0 : -1}
                      className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-auto pt-8">
            <Link
              href="/contact"
              tabIndex={mobileOpen ? 0 : -1}
              className="flex h-13 items-center justify-center rounded-full bg-accent px-6 py-4 text-base font-medium text-on-accent"
            >
              Start a Project
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

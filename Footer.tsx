import Link from "next/link";
import { Mail } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";
import { Logo } from "@/components/layout/Header";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background-soft">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-accent-strong"
              >
                <Mail className="h-4 w-4 text-accent" aria-hidden />
                {site.email}
              </a>
            )}
          </div>
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold tracking-wide text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent-strong"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} — {site.domain}. All rights reserved.
          </p>
          <p>Concept projects in the portfolio are illustrative studies.</p>
        </div>
      </div>
    </footer>
  );
}

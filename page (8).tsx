import type { Metadata } from "next";
import { Clock3, Mail, MessageSquareText, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact — Start Your Project",
  description:
    "Tell Veya about your website or automation project. Enquiries are reviewed personally and answered within one to two working days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start a Conversation That{" "}
            <span className="text-gradient">Goes Somewhere.</span>
          </>
        }
        description="Tell us what you're building, what is slowing your business down, or where you'd like to grow. We read every enquiry ourselves and reply with substance."
      />

      <section className="border-t border-border py-16 sm:py-24" aria-label="Enquiry form and contact options">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-9">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Project Enquiry
                </h2>
                <p className="mt-2 mb-8 text-sm leading-relaxed text-muted">
                  Fields marked <span className="text-accent">*</span> are
                  required. Everything you write goes only to the Veya team.
                </p>
                <ContactForm />
              </div>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={100}>
                <div className="rounded-2xl border border-border bg-surface p-7">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Direct channels
                  </h2>
                  <ul className="mt-5 flex flex-col gap-4">
                    {site.email && (
                      <li>
                        <a
                          href={`mailto:${site.email}`}
                          className="group flex items-center gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-border-strong"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                            <Mail className="h-5 w-5" aria-hidden />
                          </span>
                          <span>
                            <span className="block text-xs text-muted">Email</span>
                            <span className="block text-sm font-medium group-hover:text-accent-strong">
                              {site.email}
                            </span>
                          </span>
                        </a>
                      </li>
                    )}
                    {site.whatsapp && (
                      <li>
                        <a
                          href={`https://wa.me/${site.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-border-strong"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                            <MessageSquareText className="h-5 w-5" aria-hidden />
                          </span>
                          <span>
                            <span className="block text-xs text-muted">WhatsApp</span>
                            <span className="block text-sm font-medium">Message us</span>
                          </span>
                        </a>
                      </li>
                    )}
                    {site.phone && (
                      <li>
                        <a
                          href={`tel:${site.phone}`}
                          className="group flex items-center gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-border-strong"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent">
                            <PhoneCall className="h-5 w-5" aria-hidden />
                          </span>
                          <span>
                            <span className="block text-xs text-muted">Phone</span>
                            <span className="block text-sm font-medium">{site.phone}</span>
                          </span>
                        </a>
                      </li>
                    )}
                  </ul>
                  {!site.whatsapp && !site.phone && (
                    <p className="mt-4 text-xs leading-relaxed text-muted">
                      Additional channels (WhatsApp, phone, social profiles) are
                      enabled from a single configuration file as soon as
                      they&rsquo;re officially available — email and this form
                      are the verified routes today.
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="rounded-2xl border border-border bg-surface p-7">
                  <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                    <Clock3 className="h-5 w-5 text-accent" aria-hidden />
                    What happens next
                  </h2>
                  <ol className="mt-5 flex flex-col gap-4">
                    {[
                      {
                        k: "1",
                        t: "We review your enquiry",
                        d: "Every message is read by a person, usually within one to two working days.",
                      },
                      {
                        k: "2",
                        t: "You get a substantive reply",
                        d: "Questions, honest advice, and — if we're a fit — suggested next steps.",
                      },
                      {
                        k: "3",
                        t: "A scoped proposal",
                        d: "For projects that go ahead: a written, itemised proposal you can evaluate calmly.",
                      },
                    ].map((step) => (
                      <li key={step.k} className="flex gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 font-display text-sm font-semibold text-accent-strong">
                          {step.k}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{step.t}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">
                            {step.d}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Veya collects, uses, stores, and protects personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "1. Information we collect",
    body: [
      "When you submit the enquiry form, we collect the information you provide: your name, email address, optional business name and website URL, the services you're interested in, your budget range, preferred contact method, and your project description.",
      "We also process standard technical data that hosting providers typically record (such as IP address, browser type, and access times) for security and reliability purposes.",
    ],
  },
  {
    h: "2. How we use your information",
    body: [
      "Enquiry details are used for one purpose: to understand your request and respond to it. If your enquiry leads to a project, the information is used to prepare proposals, deliver services, and communicate about the engagement.",
      "We do not use your details for unrelated marketing, we do not sell personal information, and we do not share it with third parties for their marketing purposes.",
    ],
  },
  {
    h: "3. Legal basis and consent",
    body: [
      "The enquiry form includes an explicit consent checkbox. By submitting it, you agree that we may use the provided details to respond to your enquiry. You can withdraw this consent at any time by contacting us at the address below.",
    ],
  },
  {
    h: "4. Data retention",
    body: [
      "Enquiry records are kept only as long as needed to handle your request and any resulting work. Enquiries that don't lead to an engagement are reviewed periodically and deleted. You may request deletion of your data at any time (see section 7).",
    ],
  },
  {
    h: "5. Service providers",
    body: [
      "This website is hosted with a professional hosting provider, and enquiry data is stored in a secured database operated for this site. If integrations (such as email delivery or notification services) are configured, data may pass through those providers solely to deliver the service you requested. A current list of active providers is available on request.",
    ],
  },
  {
    h: "6. Cookies and analytics",
    body: [
      "The site stores your theme preference (light, dark, or system) in your browser's local storage — this is a functional preference, not a tracker. If privacy-respecting analytics are added in the future, this section will be updated to describe exactly what is collected.",
    ],
  },
  {
    h: "7. Your rights",
    body: [
      "Depending on your jurisdiction, you may have rights to access, correct, export, or delete your personal data, and to object to or restrict its processing. To exercise any of these rights, contact us and we will respond within a reasonable timeframe.",
    ],
  },
  {
    h: "8. Security",
    body: [
      "Access to enquiry data is limited to the people handling your request, connections are encrypted in transit (HTTPS), and reasonable technical measures are taken to protect stored information. No method of transmission or storage is perfectly secure, but minimising what we collect is our first line of defence.",
    ],
  },
  {
    h: "9. Contact about privacy",
    body: [
      `For any privacy question, request, or concern, contact us at ${site.email ?? "the email address published on our contact page"}.`,
    ],
  },
  {
    h: "10. Changes to this policy",
    body: [
      "This policy may be updated as the website and its services evolve. Material changes will be reflected on this page with a revised date.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="What we collect, why we collect it, and the control you keep over it — written to be read, not hidden."
      />
      <section className="border-t border-border py-14 sm:py-20">
        <Container size="narrow">
          <Reveal>
            <div className="mb-12 flex items-start gap-4 rounded-2xl border border-dashed border-border-strong bg-surface p-6">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">
                  Template pending legal review.
                </span>{" "}
                This document is an editable draft prepared for the Veya
                website. It should be reviewed by a qualified professional in
                the relevant jurisdictions before being relied upon in
                production. Last updated: <em>to be confirmed at launch</em>.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <Reveal key={s.h} delay={Math.min(i * 40, 200)}>
                <article>
                  <h2 className="text-xl font-semibold tracking-tight">{s.h}</h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed text-muted">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

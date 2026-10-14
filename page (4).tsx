import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the Veya website and the general framework for project engagements.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    h: "1. About these terms",
    body: [
      "These terms govern the use of the Veya website and describe the general framework within which Veya provides services. Specific engagements are governed by individual written proposals and agreements, which take precedence where they differ from this page.",
    ],
  },
  {
    h: "2. Project scope",
    body: [
      "Every engagement begins with a written proposal describing deliverables, assumptions, timeline estimates, and price. Work outside the agreed scope is quoted separately before it begins — scope changes are always discussed, never silently billed.",
    ],
  },
  {
    h: "3. Payment arrangements",
    body: [
      "Payment schedules are defined per project in the proposal. Typical arrangements involve an initial payment to schedule work, with the balance tied to agreed milestones. Specific terms — amounts, methods, and dates — are only ever those written in your proposal or agreement.",
    ],
  },
  {
    h: "4. Revisions",
    body: [
      "Design and development stages include structured review rounds as defined in the proposal. Additional rounds or changes after approval can be accommodated and are quoted transparently.",
    ],
  },
  {
    h: "5. Ownership and intellectual property",
    body: [
      "Upon full payment, the client owns the final deliverables produced for their project, as specified in the proposal. Veya retains the right to reference non-confidential work in its portfolio unless otherwise agreed. Third-party assets (fonts, libraries, stock media) remain subject to their own licenses.",
    ],
  },
  {
    h: "6. Third-party services",
    body: [
      "Projects may rely on third-party platforms — hosting providers, CRMs, automation platforms, payment processors, AI services. These are governed by their own terms and pricing. Veya is not responsible for changes, outages, or pricing decisions made by third-party providers, but will always help you choose dependable options and adapt where possible.",
    ],
  },
  {
    h: "7. Cancellations",
    body: [
      "Either party may cancel an engagement as described in the written agreement. Work completed up to cancellation is billable as defined in the proposal; any unused prepaid balance is handled fairly and described in the agreement.",
    ],
  },
  {
    h: "8. Warranties and limitations",
    body: [
      "Deliverables are provided with professional care and tested before handover. However, Veya does not guarantee specific business outcomes — such as leads, sales, search rankings, or revenue — because those depend on factors outside any vendor's control. Liability is limited as described in the individual agreement and applicable law.",
    ],
  },
  {
    h: "9. Website content",
    body: [
      "Information on this website, including service descriptions and pricing approach, is general in nature and may change. Concept projects in the portfolio are illustrative studies, not client work, and are labelled accordingly.",
    ],
  },
  {
    h: "10. Contact",
    body: [
      `Questions about these terms can be sent to ${site.email ?? "the contact address published on this website"}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The framework for using this website and working with Veya — in language a person can actually read."
      />
      <section className="border-t border-border py-14 sm:py-20">
        <Container size="narrow">
          <Reveal>
            <div className="mb-12 flex items-start gap-4 rounded-2xl border border-dashed border-border-strong bg-surface p-6">
              <Scale className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">
                  Marked for legal review before production.
                </span>{" "}
                This is an editable terms template. It must be reviewed and
                finalised by a qualified legal professional for the
                jurisdictions in which Veya operates before it is relied upon.
                Last updated: <em>to be confirmed at launch</em>.
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

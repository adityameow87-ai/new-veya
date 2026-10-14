import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { enquirySchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

/**
 * POST /api/enquiry
 * Validates and stores a contact enquiry. Returns 4xx with specific
 * field errors on validation failure, and never claims success unless
 * the record has actually been persisted.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return Response.json(
      { ok: false, error: "Validation failed.", fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot: silently accept but discard obvious bot submissions.
  if (parsed.data.company && parsed.data.company.length > 0) {
    return Response.json({ ok: true });
  }

  const data = parsed.data;
  try {
    await db.insert(enquiries).values({
      name: data.name,
      email: data.email,
      businessName: data.businessName || null,
      websiteUrl: data.websiteUrl || null,
      services: data.services,
      budget: data.budget || null,
      contactMethod: data.contactMethod || "email",
      message: data.message,
      consent: data.consent === true,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[enquiry] failed to store submission:", error);
    return Response.json(
      {
        ok: false,
        error:
          "Your enquiry could not be saved. Please try again, or email us directly.",
      },
      { status: 500 }
    );
  }
}

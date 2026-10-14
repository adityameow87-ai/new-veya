import { z } from "zod";

export const serviceInterests = [
  { value: "website", label: "Website Development" },
  { value: "automation", label: "Business Automation" },
  { value: "combined", label: "Combined Website + Automation" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "other", label: "Something Else" },
] as const;

export const budgetRanges = [
  { value: "undecided", label: "Not sure yet" },
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-8k", label: "$3,000 – $8,000" },
  { value: "8k-plus", label: "$8,000+" },
] as const;

export const contactMethods = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone call" },
] as const;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160),
  businessName: z.string().trim().max(120).optional().or(z.literal("")),
  websiteUrl: z
    .string()
    .trim()
    .max(240)
    .optional()
    .or(z.literal(""))
    .refine(
      (v) =>
        !v ||
        /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(v),
      "Please enter a valid URL."
    ),
  services: z
    .array(z.enum(serviceInterests.map((s) => s.value) as [string, ...string[]]))
    .min(1, "Please select at least one service."),
  budget: z.string().optional().or(z.literal("")),
  contactMethod: z.string().max(40).optional().default("email"),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(3000, "Please keep the description under 3,000 characters."),
  consent: z.literal(true, {
    message: "Please confirm you're happy for us to respond to your enquiry.",
  }),
  // Honeypot — must remain empty. Real users never see this field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

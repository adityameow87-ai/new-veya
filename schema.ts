import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const enquiries = pgTable("enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  businessName: text("business_name"),
  websiteUrl: text("website_url"),
  services: jsonb("services").$type<string[]>().notNull(),
  budget: text("budget"),
  contactMethod: text("contact_method").notNull().default("email"),
  message: text("message").notNull(),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

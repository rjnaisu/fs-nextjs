import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  author: text().notNull(),
  url: text().notNull(),
  likes: integer().notNull().default(0),
});

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;

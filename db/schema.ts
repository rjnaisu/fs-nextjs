import { relations } from "drizzle-orm";
import { integer, pgTable, text, serial } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  author: text().notNull(),
  url: text().notNull(),
  likes: integer().notNull().default(0),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial().primaryKey(),
  username: text().notNull().unique(),
  name: text().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}));

export const blogRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;

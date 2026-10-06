import { relations } from "drizzle-orm";
import { integer, pgTable, text, serial, primaryKey, index, boolean } from "drizzle-orm/pg-core";

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
  passwordHash: text("password_hash").notNull().default(""),
  token: text(),
});

export const readingList = pgTable(
  "reading_list",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    blogId: integer("blog_id")
      .notNull()
      .references(() => blogs.id, { onDelete: "cascade" }),
    read: boolean().notNull().default(false),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.blogId] }),
    index("reading_list_blog_id_idx").on(table.blogId),
  ],
);

export const userRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingList),
}));

export const blogRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingList: many(readingList),
}));

export const readingListRelations = relations(readingList, ({ one }) => ({
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
}));

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;

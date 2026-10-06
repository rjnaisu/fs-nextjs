import { db } from "../../db";
import { eq, sql, ilike } from "drizzle-orm";
import { blogs, readingList } from "../../db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async (filter?: string) => {
  const trimmedFilter = filter?.trim();
  if (filter) {
    return db
      .select()
      .from(blogs)
      .where(ilike(blogs.title, `%${trimmedFilter}%`));
  }
  return db.query.blogs.findMany();
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Cannot create blog without a user");
  }
  // Both inserts run in one statement, so a failed reading-list insert rolls back the blog.
  const createdBlog = db
    .$with("created_blog")
    .as(
      db
        .insert(blogs)
        .values({ title, author, url, userId: user.id })
        .returning({ id: blogs.id, userId: blogs.userId }),
    );

  return db
    .with(createdBlog)
    .insert(readingList)
    .select(
      db
        .select({
          userId: createdBlog.userId,
          blogId: createdBlog.id,
          read: sql<boolean>`false`.as("read"),
        })
        .from(createdBlog),
    );
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: (blog, { eq }) => eq(blog.id, id),
  });
};

export const likeBlog = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};

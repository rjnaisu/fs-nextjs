import { db } from "../../db";
import { eq, sql, ilike } from "drizzle-orm";
import { blogs } from "../../db/schema";

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
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  });

  if (!user) {
    throw new Error("Cannot create blog without a user");
  }

  return db.insert(blogs).values({ title, author, url, userId: user.id });
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

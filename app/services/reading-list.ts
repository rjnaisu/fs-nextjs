import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { readingList } from "@/db/schema";

export const getReadingList = async (userId: number) => {
  const entries = await db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: true },
    orderBy: (entry, { desc }) => [desc(entry.blogId)],
  });

  return entries.map((entry) => ({ ...entry.blog, read: entry.read }));
};

export const addToReadingList = async (userId: number, blogId: number) => {
  return db.insert(readingList).values({ userId, blogId }).onConflictDoNothing();
};

export const markBlogAsRead = async (userId: number, blogId: number) => {
  return db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))
    .returning({ blogId: readingList.blogId });
};

export const isInReadingList = async (userId: number, blogId: number) => {
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
    columns: { blogId: true },
  });

  return !!entry;
};

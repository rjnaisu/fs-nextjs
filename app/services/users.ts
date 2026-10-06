import { users } from "@/db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserDetails = async (token: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    columns: { id: true, username: true, name: true },
    with: { blogs: true },
  });

  if (!user) {
    return undefined;
  }

  const { blogs: createdBlogs, ...details } = user;
  return { ...details, createdBlogs };
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, username),
    with: { blogs: true },
  });
};

export const addApiToken = async (id: number, token: string) => {
  return db.update(users).set({ token }).where(eq(users.id, id));
};

import { users } from "@/db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return db.query.users.findMany();
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

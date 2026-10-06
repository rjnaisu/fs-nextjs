import { db } from "@/db";
import { blogs, readingList, users } from "@/db/schema";
import bcrypt from "bcryptjs";

export const resetDatabase = async () => {
  await db.batch([db.delete(readingList), db.delete(blogs), db.delete(users)]);
};

export const createTestUser = async (username: string, password: string, name: string) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const [user] = await db
    .insert(users)
    .values({ username, passwordHash, name })
    .onConflictDoNothing({ target: users.username })
    .returning({ id: users.id, username: users.username, name: users.name });

  return user;
};

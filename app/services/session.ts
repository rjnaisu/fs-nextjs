import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  return db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  });
};

import { db } from "../../db";

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, username),
    with: { blogs: true },
  });
};

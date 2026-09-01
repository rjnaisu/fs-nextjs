"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import type { RegisterUserState } from "@/app/register/state";

export const registerUser = async (
  _prevState: RegisterUserState,
  formData: FormData,
): Promise<RegisterUserState> => {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
  const errors: RegisterUserState["errors"] = {};

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  }

  if (!name) {
    errors.name = "Name is required";
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords must match";
  }

  if (!errors.username) {
    const existingUser = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.username, username),
    });

    if (existingUser) {
      errors.username = "Username is already taken";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

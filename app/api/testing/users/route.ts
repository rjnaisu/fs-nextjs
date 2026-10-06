import { NextResponse } from "next/server";
import { createTestUser } from "@/app/services/testing";

export const POST = async (request: Request) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { username, password, name } = body ?? {};
  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    !password ||
    typeof name !== "string" ||
    !name.trim()
  ) {
    return NextResponse.json(
      { error: "username, password, and name are required" },
      { status: 400 },
    );
  }

  const user = await createTestUser(username.trim(), password, name.trim());
  if (!user) {
    return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
  }

  return NextResponse.json(user, { status: 201 });
};

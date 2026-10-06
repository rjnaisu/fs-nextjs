import { getUserDetails } from "@/app/services/users";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer[ \t]+(\S+)$/i)?.[1];

  if (!token) {
    return unauthorized();
  }

  const user = await getUserDetails(token);
  if (!user) {
    return unauthorized();
  }

  return NextResponse.json(user, { headers: { "Cache-Control": "no-store" } });
};

function unauthorized() {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401, headers: { "WWW-Authenticate": "Bearer", "Cache-Control": "no-store" } },
  );
}

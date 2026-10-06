import { NextResponse } from "next/server";
import { resetDatabase } from "@/app/services/testing";

export const DELETE = async () => {
  await resetDatabase();
  return NextResponse.json({ message: "Database reset" });
};

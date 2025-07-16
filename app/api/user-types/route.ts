// app/api/user-types/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  try {
    const typy = await prisma.userType.findMany();
    return NextResponse.json(typy);
  } catch (error) {
    console.error("Błąd przy pobieraniu typów:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

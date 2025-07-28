// app/api/user-types/route.ts
import { NextRequest, NextResponse } from "next/server";
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


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (!type || typeof type !== "string" || !type.trim()) {
      return NextResponse.json(
        { error: "Nie podano poprawnej nazwy typu" },
        { status: 400 }
      );
    }

    const dodanyTyp = await prisma.userType.create({
      data: { type: type.trim() },
    });

    return NextResponse.json(dodanyTyp, { status: 201 });
  } catch (error) {
    console.error("❌ Błąd przy dodawaniu typu:", error);
    return NextResponse.json(
      { error: "Błąd serwera podczas dodawania typu" },
      { status: 500 }
    );
  }
}


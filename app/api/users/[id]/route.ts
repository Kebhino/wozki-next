import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Nieprawidłowe ID" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parsedId },
    include: {
      sloty: true,
      UserType: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Nie znaleziono użytkownika" }, { status: 404 });
  }

  return NextResponse.json(user);
}

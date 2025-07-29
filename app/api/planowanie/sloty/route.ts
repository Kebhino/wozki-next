import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const data = searchParams.get("data");
  const locationId = searchParams.get("locationId");

  if (!data || !locationId) {
    return NextResponse.json({ error: "Brak parametrów" }, { status: 400 });
  }

  const sloty = await prisma.slot.findMany({
    where: {
      active: true,
      data: new Date(data),
      locationId: parseInt(locationId),
    },
    orderBy: { from: "asc" },
    include: {
      users: { select: { id: true, name: true } },
      Przydzial: { select: { userId: true } },
      Location: { select: { name: true } },
    },
  });

  return NextResponse.json(sloty);
}

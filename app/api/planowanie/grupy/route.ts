import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dataOd = searchParams.get("dataOd");
  const dataDo = searchParams.get("dataDo");

  if (!dataOd || !dataDo) {
    return NextResponse.json({ error: "Brak zakresu dat" }, { status: 400 });
  }

  const grupy = await prisma.slot.groupBy({
    by: ["data", "locationId"],
    where: {
      active: true,
      data: {
        gte: new Date(dataOd),
        lte: new Date(dataDo),
      },
    },
    orderBy: [{ data: "asc" }],
    _count: true,
  });

  return NextResponse.json(grupy);
}

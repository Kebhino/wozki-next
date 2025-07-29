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

// Dodanie przydziału (jeśli nie istnieje)
export async function POST(req: Request) {
  const { userId, slotId } = await req.json();

  const liczba = await prisma.przydzial.count({
    where: { slotId },
  });

  if (liczba >= 2) {
    return NextResponse.json(
      { error: "Max 2 osoby przydzielone" },
      { status: 400 }
    );
  }

  const istnieje = await prisma.przydzial.findUnique({
    where: { userId_slotId: { userId, slotId } },
  });

  if (!istnieje) {
    await prisma.przydzial.create({
      data: { userId, slotId },
    });
  }

  return NextResponse.json({ success: true });
}


export async function DELETE(req: Request) {
  const { userId, slotId } = await req.json();

  try {
    await prisma.przydzial.delete({
      where: { userId_slotId: { userId, slotId } },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Nie udało się usunąć przydziału" },
      { status: 400 }
    );
  }
}

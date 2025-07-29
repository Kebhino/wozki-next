import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { Prisma } from "@/app/generated/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idTypu = parseInt(id);

  if (isNaN(idTypu)) {
    return NextResponse.json({ error: "Nieprawidłowe ID" }, { status: 400 });
  }

  try {
    const usunietyTyp = await prisma.userType.delete({
      where: { id: idTypu },
    });

    return NextResponse.json(usunietyTyp);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return NextResponse.json(
        { error: "Nie można usunąć typu, ponieważ jest przypisany do użytkowników." },
        { status: 400 }
      );
    }

    console.error("❌ Błąd usuwania typu:", error);
    return NextResponse.json(
      { error: "Nie znaleziono typu lub błąd przy usuwaniu." },
      { status: 500 }
    );
  }
}

// app/api/user-types/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";


export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idTypu = parseInt(id)

  if (isNaN(idTypu)) {
    return NextResponse.json({ error: "Nieprawidłowe ID" }, { status: 400 });
  }

  try { 
  const usunietyTyp = await prisma.userType.delete({
    where: {id: idTypu}
  })

  return NextResponse.json(usunietyTyp)
}

catch (error) {
    return NextResponse.json(
      { error: "Nie znaleziono typu lub błąd przy usuwaniu." },
      { status: 500 }
    );
  }
   
}

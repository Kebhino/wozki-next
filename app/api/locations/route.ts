import { prisma } from '@/prisma/client';
import { Prisma } from '@/app/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {

    const lokalizacje = await prisma.location.findMany({
        orderBy: {id: "asc"}
    })

    return NextResponse.json(lokalizacje)
      
}

export async function POST(request: NextRequest) {

    const body = await request.json()
    const { name } = body

    if (!name) {
        return NextResponse.json({error : "Brak nazwy lokazji"},{status: 400})
        }


    const nowaLokalizacja = await prisma.location.create({
        data: {name} 
    })

    return NextResponse.json(nowaLokalizacja, {status: 201})
    
}

export async function PATCH(request:NextRequest) {
    const body = await request.json()
    const { id, field, value } = body 

    if (!id || value === undefined || !field) { 
        return NextResponse.json({error: "Brak nazyw lokalizacji"}, {status: 400})
    }
    try {
        const updated = await prisma.location.update({
            where: {id},
            data: { [field]: value}
        })
        
        return NextResponse.json(updated)
    }    
     catch(error) { 
        console.log("Nie udało się zaktulizowac danych", error)
        return NextResponse.json({error: "Błąd serwera"}, {status: 500})
    }
}



export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Brak ID lokalizacji" }, { status: 400 });
  }

  try {
    const deleted = await prisma.location.delete({
      where: { id },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("❌ Błąd usuwania lokalizacji:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return NextResponse.json(
        { error: "Nie można usunąć — do tej lokalizacji przypisane są sloty." },
        { status: 409 } // Konflikt danych
      );
    }

    return NextResponse.json(
      { error: "Błąd serwera podczas usuwania lokalizacji" },
      { status: 500 }
    );
  }
}

        

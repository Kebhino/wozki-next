import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// 🔄 GET: pobranie wszystkich użytkowników
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { UserType: true },
      orderBy: { id: 'asc' },
    });
    console.log(users)
    return NextResponse.json(users);
  } catch (error) {
    console.error("Błąd pobierania użytkowników:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });

  }
}

// ➕ POST: dodanie nowego użytkownika
export async function POST(request: Request) {
  const body = await request.json();
  const { name, userTypeId } = body;

  if (!name || !userTypeId) {
    return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
  }

  try {
    const nowyUzytkownik = await prisma.user.create({
      data: {
        name,
        userTypeId: parseInt(userTypeId),
      },
    });

    return NextResponse.json(nowyUzytkownik, { status: 201 });
  } catch (error) {
    console.error("Błąd dodawania użytkownika:", error);
    return NextResponse.json({ error: "Wewnętrzny błąd serwera" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, field, value } = body;

  if (!id || !field || value === undefined) {
    return NextResponse.json({ error: 'Brak wymaganych danych' }, { status: 400 });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: { [field]: value },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Błąd aktualizacji:", error);
    return NextResponse.json({ error: 'Wewnętrzny błąd serwera' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json({ error: "Brak lub błędne ID" }, { status: 400 });
  }

  try {
    const deleted = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("Błąd usuwania użytkownika:", error);
    return NextResponse.json({ error: "Wewnętrzny błąd serwera" }, { status: 500 });
  }
}



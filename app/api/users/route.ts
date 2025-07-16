import { prisma } from '@/prisma/client';
import { NextResponse } from 'next/server';

// 🔄 GET: pobranie wszystkich użytkowników
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { UserType: true },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Błąd pobierania użytkowników:", error);
    return NextResponse.json({ error: "Wewnętrzny błąd serwera" }, { status: 500 });
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

import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() { 
try { 
    const sloty = await prisma.slot.findMany({ 
        include: { Location: true },
        orderBy: {id: 'asc'}
    })
    return NextResponse.json(sloty)
}catch (error) { 

    return NextResponse.json({error: "Bład serwera"}, {status: 500})
}
}

export async function POST(request:NextRequest) {

    try { 
    const body = await request.json()
    console.log(body)
    const { locationId, data, from} = body 

    if ( !locationId || !data  || !from) {
            return NextResponse.json({error : "Brak wymaganych pól"},{status: 400})
            }

    const nowySlot = await prisma.slot.create({ 
        data: {
            data: new Date(data),
            from,
            locationId: locationId
        }
    })
    return NextResponse.json(nowySlot)
    } catch (error) { 
        return NextResponse.json({error: "Bład serwera"},{status: 500})
    }
}

export async function PATCH(req: Request) {
  try {
    const { id, field, value } = await req.json();

    if (!id || !field) {
      return NextResponse.json({ error: "Brak danych" }, { status: 400 });
    }

    const updatedSlot = await prisma.slot.update({
      where: { id },
      data: {
        [field]: value,
      },
    });

    return NextResponse.json(updatedSlot);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const {id} = body 

    if (!id) {
      return NextResponse.json({ error: "Brak ID" }, { status: 400 });
    }

    await prisma.slot.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd usuwania:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
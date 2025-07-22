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
    const { locationId, data, from} = body 

    if ( !locationId || data  || from) {
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
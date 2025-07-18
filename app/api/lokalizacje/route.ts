import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {

    const lokalizacje = await prisma.location.findMany({
        orderBy: {id: "asc"}
    })

    return NextResponse.json(lokalizacje)
      
}

export async function POST(request:NextRequest) {

    const body = await request.json()

    if (!body.name) {
        return NextResponse.json({error : "Brak nazwy lokazji"},{status: 400})
        }


    const nowaLokalizacja = await prisma.location.create({
        data: {name: body.name} 
    })

    return NextResponse.json(nowaLokalizacja, {status: 201})
    
}

export async function PATCH(request:NextRequest) {
    const body = await request.json()
    const { id, field, value } = body 

    if (!id || value === undefined || !field) { 
        return NextResponse.json({error: "Brak danych lokalizacji"}, {status: 400})
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

export async function DELETE(request:NextRequest) {
    const body = await request.json()

    const {id} = body 

    if (!id) 
        return NextResponse.json({error: "Brak ID lokalizacji"}, {status: 400})

    try { 
        const deleted = await prisma.location.delete({
            where: {id}
        })
        return NextResponse.json(deleted)
    } catch(error) { 
        return NextResponse.json({error: "Błąd serwera"}, {status: 500})
    }

    
}
        

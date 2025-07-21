import { NextResponse } from "next/server";
import { prisma } from '@/prisma/client';

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
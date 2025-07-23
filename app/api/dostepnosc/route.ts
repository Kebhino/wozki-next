import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    const body = await request.json()
    const {userId, slotId} = body 
    
    if (!userId || !slotId) { 
        return NextResponse.json({error: "Brakuje danych"
        }, {status: 400})
    }

    try { 
        const nowaDostepnosc = await prisma.user.update({
            where: {id: userId},
            data: {
                sloty: { 
                    connect: {id: slotId}
                }
            }
        })
         return NextResponse.json(nowaDostepnosc)
    } catch (error) { 
        console.error("Bład zapisy", error);
        return NextResponse.json({error: 'Nie udało się zapisać'}, {status: 500})
        
    }
   
}
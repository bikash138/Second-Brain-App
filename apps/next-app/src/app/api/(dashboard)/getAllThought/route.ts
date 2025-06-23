
import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const thought = await prisma.thought.findMany({
            
            where: {
                adminId: "90a32bab-efe8-41d8-814c-dd3bfcaee0e0"
            },
            select:{
                id: true,
                title: true,
                type: true,
                url: true,
                content: true,
                createdAt: true
            }
        })
        return NextResponse.json({
            message: "All thoughts fetched Successfully",
            thought
        })

    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: "Something went wrong while fetching all thoughts"
        })
    }
}

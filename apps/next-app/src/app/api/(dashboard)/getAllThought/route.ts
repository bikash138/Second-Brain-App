import { auth } from "@clerk/nextjs/server";
import { prisma } from "@repo/database/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const thought = await prisma.thought.findMany({
            
            where: {
                adminId: user.id
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



import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const {title, type, url} = await req.json()
        const thought = await prisma.thought.create({
            //@ts-ignore
            data:{
                adminId: "90a32bab-efe8-41d8-814c-dd3bfcaee0e0",
                title: title,
                url: url,
                type: type
            }
        })
        return NextResponse.json({
            message: "Content Added Successfull",
            thought
        })

    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: "Something went wrong while adding the thought"
        })
    }
}
import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const {email, password, name} = await req.json()
        const user = await prisma.user.create({
            //@ts-ignore
            data:{
                email: email,
                password: password,
                name: name,
            }
        })
        return NextResponse.json({
            message: "User Added Successfull",
            user
        })

    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: "Something went wrong while adding the user"
        })
    }
}
import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";
import {enqueueNote} from "@repo/queue/enqueueNote"
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const { title, type, content, url } = await req.json();

        // Build data object dynamically
        const data = {
            adminId: user.id,
            title,
            type,
            ...(content && { content }),
            ...(url && { url }),
        };

        // Only add content or url if present
        if (content) data.content = content;
        if (url) data.url = url;

        const thought = await prisma.thought.create({
            data
        });
        
        const thoughtId = String(thought.id)
            if (thoughtId){
                await enqueueNote(thoughtId)
            }else{
                throw new Error("Error while enqueueing")
        }

        return NextResponse.json({
            message: "Content Added Successfully",
            thought
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong while adding the thought"
        });
    }
}
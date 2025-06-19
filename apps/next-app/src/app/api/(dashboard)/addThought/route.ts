import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { title, type, content, url } = await req.json();

        // Build data object dynamically
        const data: any = {
            adminId: "90a32bab-efe8-41d8-814c-dd3bfcaee0e0",
            title,
            type,
        };

        // Only add content or url if present
        if (content) data.content = content;
        if (url) data.url = url;

        const thought = await prisma.thought.create({
            data
        });

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
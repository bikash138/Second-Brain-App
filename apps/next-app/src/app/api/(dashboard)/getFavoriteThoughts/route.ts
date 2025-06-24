import { prisma } from "@repo/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch the current note
    const favouriteThoughts = await prisma.thought.findMany({
      where: { favourites: true },
      select: { title: true,
        id: true,
        type: true,
        url: true,
        content: true,
        createdAt: true,
        favourites: true
      },
    });

    return NextResponse.json({
      message: `Pinned THoughts fethed successfully`,
      thought: favouriteThoughts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong while pinning/unpinning the thought" },
      { status: 500 }
    );
  }
}

import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { thoughtId } = await req.json();

    // Fetch the current note
    const currentThought = await prisma.thought.findUnique({
      where: { id: thoughtId },
      select: { favourites: true },
    });

    if (!currentThought) {
      return NextResponse.json(
        { message: "Thought not found" },
        { status: 404 }
      );
    }

    // Toggle the pinned value
    const updatedThought = await prisma.thought.update({
      where: { id: thoughtId },
      data: { favourites: !currentThought.favourites },
      select: { id: true, favourites: true },
    });

    return NextResponse.json({
      message: `Thought ${updatedThought.favourites ? "pinned" : "unpinned"} successfully`,
      thought: updatedThought,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong while pinning/unpinning the thought" },
      { status: 500 }
    );
  }
}

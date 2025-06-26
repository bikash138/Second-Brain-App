import { prisma } from "@repo/database/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Fetch the current note
    const favouriteThoughts = await prisma.thought.findMany({
      where: { favourites: true, adminId: user.id },
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

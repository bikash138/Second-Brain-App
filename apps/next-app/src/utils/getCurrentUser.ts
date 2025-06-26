import { auth } from "@clerk/nextjs/server";
import { prisma } from "@repo/database/prisma";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return user;
}
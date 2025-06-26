import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database/prisma';

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
    const { id, email_addresses, first_name, profile_image_url } = body.data;

    if (!id) {
      return NextResponse.json({ message: 'Missing Clerk user id' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses?.[0]?.email_address || null,
          name: first_name || null,
          photo: profile_image_url || null,
        },
      });
    }

    return NextResponse.json({ user });
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      message: "Something went wrong while creating user in database"
     });
  }
}

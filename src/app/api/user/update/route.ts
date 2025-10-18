// /app/api/user/update/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    const user = await prisma.user.update({
        where: { email: session.user?.email as string | undefined},
        data,
    });

    return NextResponse.json({ user });

    // return NextResponse.json(user);
}

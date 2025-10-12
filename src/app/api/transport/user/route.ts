
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const transports = await prisma.transport.findMany({
        where: { userId: session.user?.id },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(transports);
}

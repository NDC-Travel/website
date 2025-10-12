import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { packageId, rating, comment } = await req.json();
    if (!packageId || !rating || !comment) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const review = await prisma.review.create({
        data: {
            packageId,
            rating,
            comment,
            userId: session.user?.id,
        },
        include: { user: { select: { name: true, image: true } } },
    });

    return NextResponse.json(review);
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get("packageId");
    if (!packageId) return NextResponse.json([]);

    const reviews = await prisma.review.findMany({
        where: { packageId },
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
}

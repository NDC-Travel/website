import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const [transports, total] = await Promise.all([
            prisma.transport.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            image: true,
                        },
                    }
                },
            }),
            prisma.transport.count(),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({ transports, totalPages });
    } catch (err) {
        console.error("Error fetching transports:", err);
        return NextResponse.json(
            { error: "Failed to fetch transports" },
            { status: 500 }
        );
    }
}
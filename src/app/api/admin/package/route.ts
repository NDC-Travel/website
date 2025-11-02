import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const [packages, total] = await Promise.all([
            prisma.package.findMany({
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
                    },
                    carrier: { select: { id: true, name: true, email: true, image: true } }
                },
            }),
            prisma.package.count(),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({ packages, totalPages });
    } catch (err) {
        console.error("Error fetching packages:", err);
        return NextResponse.json(
            { error: "Failed to fetch packages" },
            { status: 500 }
        );
    }
}




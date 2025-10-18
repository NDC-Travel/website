import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    // const session = await getServerSession(authOptions);
    // if (!session)
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const limitParam = searchParams.get("limit");
        const limit =
            limitParam && limitParam.toLowerCase() !== "null"
                ? parseInt(limitParam, 10)
                : null;

        const nowIso = new Date().toISOString(); // convert to ISO string for string comparison

        // Fetch all active packages (deadline not passed)
        const activePackages = await prisma.package.findMany({
            where: {
                shippingDeadline: {
                    gt: nowIso, // ✅ compare ISO strings
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                carrier: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Randomize and limit results if needed
        const randomized = activePackages.sort(() => 0.5 - Math.random());
        const limited =
            limit && !isNaN(limit) ? randomized.slice(0, limit) : randomized;

        return NextResponse.json(limited);
    } catch (err) {
        console.error("Error fetching packages:", err);
        return NextResponse.json(
            { error: "Failed to fetch packages" },
            { status: 500 }
        );
    }
}

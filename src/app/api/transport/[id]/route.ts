
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
    params: { id: string };
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params; // now this works

    try {
        const body = await req.json();

        const updatedTransport = await prisma.transport.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(updatedTransport);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = params;

    try {
        // Optional: ensure user owns this transport
        const transport = await prisma.transport.findUnique({
            where: { id },
        });

        if (!transport) {
            return NextResponse.json({ error: "Transport not found" }, { status: 404 });
        }

        if (transport.userId !== session.user?.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.transport.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Transport deleted" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete transport" }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = params;

    try {
        // Optional: ensure user owns this transport
        const transport = await prisma.transport.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                    },
                },
            }
        });

        if (!transport) {
            return NextResponse.json({ error: "Transport not found" }, { status: 404 });
        }

        // if (transport.userId !== session.user?.id) {
        //     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        // }

        return NextResponse.json(transport);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete transport" }, { status: 500 });
    }
}

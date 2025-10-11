// /app/api/message/conversations/route.ts
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    // Find all conversations where user is sender or receiver
    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: session.user?.id },
                { receiverId: session.user?.id },
            ],
        },
        include: {
            sender: true,
            receiver: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Extract unique conversation partners
    const conversations = Object.values(
        messages.reduce((acc: any, m) => {
            const other =
                m.senderId === session.user?.id ? m.receiver : m.sender;
            acc[other.id] = other;
            return acc;
        }, {})
    );

    return new Response(JSON.stringify(conversations), { status: 200 });
}

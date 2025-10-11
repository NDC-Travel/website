import { NextResponse } from "next/server";
import Pusher from "pusher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: process.env.PUSHER_APP_CLUSTER!,
    useTLS: true,
});

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { receiver, content } = await req.json();
    if (!receiver || !content.trim()) {
        return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const receiverUser = await prisma.user.findFirst({
        where: {
            OR: [
                { id: receiver },
                { email: receiver },
                { phone: receiver },
            ],
        },
    });

    if (!receiverUser) {
        return NextResponse.json({ error: "Receiver not found" }, { status: 404 });
    }

    const message = await prisma.message.create({
        data: {
            senderId: session.user.id,
            receiverId: receiverUser.id,
            content,
        },
        include: {
            sender: {
                select: { id: true, name: true, email: true, image: true },
            },
            receiver: {
                select: { id: true, name: true, email: true, image: true },
            },
        },
    });

    // Trigger real-time event for both sender & receiver using their IDs
    await pusher.trigger([`chat-${session.user.id}`, `chat-${receiverUser.id}`], "new-message", message);

    const notification = await prisma.notification.create({
        data: { targetId: receiverUser.id, title: "Nouveau message", content: content },
    });
    const channel = receiverUser.id ? `notifications-${receiverUser.id}` : "notifications-all";
    await pusher.trigger(channel, "new-notification", notification);

    return NextResponse.json({ success: true, message });
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatWith } = Object.fromEntries(new URL(req.url).searchParams) as { chatWith?: string };

    let whereClause: any = {
        OR: [
            { senderId: session.user.id },
            { receiverId: session.user.id },
        ],
    };

    // Optional: Filter messages by a specific conversation
    if (chatWith) {
        const otherUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: chatWith },
                    { phone: chatWith },
                ],
            },
        });
        if (otherUser) {
            whereClause = {
                OR: [
                    { senderId: session.user.id, receiverId: otherUser.id },
                    { senderId: otherUser.id, receiverId: session.user.id },
                ],
            };
        }
    }

    const messages = await prisma.message.findMany({
        where: whereClause,
        orderBy: { createdAt: "asc" },
        include: {
            sender: {
                select: { id: true, name: true, email: true, image: true },
            },
            receiver: {
                select: { id: true, name: true, email: true, image: true },
            },
        },
    });

    return NextResponse.json({ messages });
}


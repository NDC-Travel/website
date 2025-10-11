// /app/api/message/send/route.ts
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const { emailOrPhone, content } = await req.json();
    if (!emailOrPhone || !content)
        return new Response("Missing fields", { status: 400 });

    // Find user by email or phone
    const receiver = await prisma.user.findFirst({
        where: {
            OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
        },
    });

    if (!receiver)
        return new Response("User not found", { status: 404 });

    // Save message
    const message = await prisma.message.create({
        data: {
            senderId: session.user?.id,
            receiverId: receiver.id,
            content,
        },
    });

    return new Response(JSON.stringify(message), { status: 200 });
}

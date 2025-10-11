import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const { emailOrPhone } = await req.json();

    if (!emailOrPhone) {
        return new Response("Email or phone required", { status: 400 });
    }

    // Find the contact user
    const contactUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: emailOrPhone },
                { phone: emailOrPhone },
            ],
        },
    });

    if (!contactUser) {
        return new Response("User not found", { status: 404 });
    }

    // Add to current user contacts
    const newContact = await prisma.contact.upsert({
        where: {
            userId_contactId: {
                userId: session.user?.id,
                contactId: contactUser.id,
            },
        },
        update: {},
        create: {
            userId: session.user?.id,
            contactId: contactUser.id,
        },
    });

    // Return updated contacts list
    const contacts = await prisma.contact.findMany({
        where: { userId: session.user?.id },
        include: { contact: true },
    });

    return new Response(JSON.stringify(contacts), { status: 200 });
}

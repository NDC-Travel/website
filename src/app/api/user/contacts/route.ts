// /app/api/user/contacts/route.ts
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const contacts = await prisma.contact.findMany({
        where: { userId: session.user?.id },
        include: { contact: true },
    });

    return new Response(JSON.stringify(contacts), { status: 200 });
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/hash";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, phone, image } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // check existing
        const existing = await prisma.user.findUnique({ where: { email }});
        if (existing) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        const hashed = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                name,
                phone,
                image,
            },
        });

        return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name }});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

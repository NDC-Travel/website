import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/hash";
import { isBefore } from "date-fns";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { token, newPassword } = await req.json();
        if (!token || !newPassword) return NextResponse.json({ error: "Missing data" }, { status: 400 });

        const reset = await prisma.passwordResetToken.findUnique({ where: { token }});
        if (!reset) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        if (reset.used) {
            return NextResponse.json({ error: "Token already used" }, { status: 400 });
        }

        if (isBefore(reset.expiresAt, new Date())) {
            return NextResponse.json({ error: "Token expired" }, { status: 400 });
        }

        const hashed = await hashPassword(newPassword);

        // update user's password
        await prisma.user.update({
            where: { id: reset.userId },
            data: { password: hashed },
        });

        // mark token used
        await prisma.passwordResetToken.update({
            where: { id: reset.id },
            data: { used: true },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { add } from "date-fns";
import { sendResetEmail } from "@/lib/mail";

const prisma = new PrismaClient();

function generateToken() {
    return randomBytes(32).toString("hex");
}

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

        const user = await prisma.user.findUnique({ where: { email }});
        if (!user) {
            // don't reveal that the email doesn't exist — respond success to avoid enumeration
            return NextResponse.json({ ok: true });
        }

        // create token
        const token = generateToken();
        const expiresAt = add(new Date(), { hours: 1 }); // expires in 1 hour

        await prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
            },
        });

        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset/${token}`;
        await sendResetEmail(email, resetUrl);

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

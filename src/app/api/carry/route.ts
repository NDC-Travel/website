import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const data = await req.json();

        const transport = await prisma.transport.create({
            data: {
                userId: session.user?.id,
                weightAvailable: data.weightAvailable,
                pricePerKg: data.pricePerKg,
                paymentPeriod: data.paymentPeriod,
                meansTransport: data.meansTransport,
                tripDescription: data.tripDescription,
                isRoundTrip: data.isRoundTrip,
                outboundDepartureDate: data.outboundDepartureDate,
                outboundArrivalDate: data.outboundArrivalDate,
                returnDepartureDate: data.returnDepartureDate,
                returnArrivalDate: data.returnArrivalDate,
                origin: data.origin,
                destination: data.destination,
            },
        });

        console.log({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        }, process.env.NEXT_PUBLIC_ADMIN)

        // Send emails
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });

        // Admin email
        await transporter.sendMail({
            from: `"NDC Travels" <${process.env.SMTP_USER}>`,
            to: process.env.NEXT_PUBLIC_ADMIN,
            subject: "Nouvelle annonce de transport",
            text: `Un transport a été soumis par ${session.user?.name || session.user?.email}.`,
        });

        // User email
        await transporter.sendMail({
            from: `"NDC Travels" <${process.env.SMTP_USER}>`,
            to: session.user?.email,
            subject: "Votre transport a été enregistré",
            text: `Votre annonce de transport a été enregistrée avec succès. Nous vous contacterons bientôt.`,
        });

        return NextResponse.json(transport);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Échec de l'enregistrement" }, { status: 500 });
    }
}

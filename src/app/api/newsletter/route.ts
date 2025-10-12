import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Subscribe user to newsletter
export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return NextResponse.json({ error: "Email invalide" }, { status: 400 });

        const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
        if (existing)
            return NextResponse.json({ message: "Déjà inscrit" }, { status: 200 });

        const subscriber = await prisma.newsletterSubscriber.create({
            data: { email },
        });

        // Configure SMTP transporter
        console.log({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send confirmation email
        await transporter.sendMail({
            from: `"${process.env.NEXT_PUBLIC_APP_NAME}" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "NDC Travels - Bienvenue à notre newsletter 🎉",
            html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>Merci de votre inscription !</h2>
          <p>Vous êtes maintenant abonné(e) à la newsletter de <strong>${process.env.NEXT_PUBLIC_APP_NAME}</strong>.</p>
          <p>Nous vous enverrons régulièrement nos offres, actualités et promotions exclusives.</p>
          <br/>
          <p>À bientôt,</p>
          <p><strong>L’équipe ${process.env.NEXT_PUBLIC_APP_NAME}</strong></p>
        </div>
      `,
        });

        return NextResponse.json({ message: "Inscription réussie", subscriber });
    } catch (error) {
        console.error("Newsletter error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

// (optional) GET to list all subscribers for admin dashboard
export async function GET() {
    const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ subscribers });
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { fullName, email, message } = await req.json();

        if (!fullName || !email || !message) {
            return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
        }

        // 1️⃣ Save to DB (optional)
        await prisma.contactMessage.create({
            data: { fullName, email, message },
        });

        // 2️⃣ Configure SMTP (same as newsletter)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 3️⃣ Send email to admin
        await transporter.sendMail({
            from: `"NDC Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.NEXT_PUBLIC_ADMIN || process.env.SMTP_USER, // send to yourself
            subject: `📩 Nouveau message de ${fullName}`,
            html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
          <h2>📬 Nouveau message reçu via le site</h2>
          <p><strong>Nom :</strong> ${fullName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-line;">${message}</p>
          <br/>
          <p>— NDC Travels Contact System</p>
        </div>
      `,
        });

        // 4️⃣ Optional: Auto reply to sender
        await transporter.sendMail({
            from: `"NDC Travels" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Merci de nous avoir contactés !",
            html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
          <h2>Bonjour ${fullName},</h2>
          <p>Merci de nous avoir contactés. Nous avons bien reçu votre message :</p>
          <blockquote style="border-left:4px solid #024686;padding-left:8px;color:#555;">${message}</blockquote>
          <p>Notre équipe vous répondra dans les plus brefs délais.</p>
          <br/>
          <p>Cordialement,</p>
          <p><strong>L'équipe NDC Travels</strong></p>
        </div>
      `,
        });

        return NextResponse.json({ success: true, message: "Message envoyé avec succès 🎉" });
    } catch (error) {
        console.error("Erreur d’envoi du message:", error);
        return NextResponse.json({ error: "Erreur lors de l’envoi du message" }, { status: 500 });
    }
}

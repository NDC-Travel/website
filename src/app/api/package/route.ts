import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const formData = await req.formData();

        // Extract fields
        const packageContents = formData.get("packageContents") as string;
        const width = formData.get("width") as string;
        const height = formData.get("height") as string;
        const length = formData.get("length") as string;
        const weight = formData.get("weight") as string;
        const participationAllowance = formData.get("participationAllowance") as string;
        const shippingDeadline = formData.get("shippingDeadline") as string;
        const parcelDetails = formData.get("parcelDetails") as string;
        const origin = formData.get("origin") as string;
        const destination = formData.get("destination") as string;
        const imageFile = formData.get("image") as File | null;

        let imageUrl: string | null = null;
        let imageKey: string | null = null;

        // ✅ Upload to Vercel Blob (instead of filesystem)
        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const filename = `package-${session.user?.id}-${Date.now()}-${imageFile.name}`;

            // Upload to Vercel Blob
            const blob = await put(filename, buffer, {
                access: "public",
                contentType: imageFile.type || "image/jpeg",
            });

            imageUrl = blob.url;
            imageKey = blob.pathname; // useful if you ever need to delete
        }

        // ✅ Save to database
        const packageData = await prisma.package.create({
            data: {
                userId: session.user?.id,
                packageContents,
                width,
                height,
                length,
                weight,
                participationAllowance,
                shippingDeadline,
                parcelDetails,
                origin,
                destination,
                imageUrl,
                imageKey,
                status: "active",
            },
        });

        // ✅ Send confirmation emails
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });

        console.log({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        }, process.env.NEXT_PUBLIC_ADMIN)

        // Admin
        await transporter.sendMail({
            from: `"NDC Travels" <${process.env.SMTP_USER}>`,
            to: process.env.NEXT_PUBLIC_ADMIN,
            subject: "Nouvelle annonce de colis",
            html: `
        <h2>Nouvelle annonce de colis</h2>
        <p>Soumise par <strong>${session.user?.name || session.user?.email}</strong></p>
        <ul>
          <li><b>Contenu:</b> ${packageContents}</li>
          <li><b>Dimensions:</b> ${width}×${height}×${length} cm</li>
          <li><b>Poids:</b> ${weight} kg</li>
          <li><b>De:</b> ${origin}</li>
          <li><b>À:</b> ${destination}</li>
          <li><b>Participation:</b> ${participationAllowance} €</li>
          <li><b>Date limite:</b> ${shippingDeadline}</li>
        </ul>
        ${imageUrl ? `<img src="${imageUrl}" width="200" />` : ""}
      `,
        });

        // User confirmation
        await transporter.sendMail({
            from: `"NDC Travels" <${process.env.SMTP_USER}>`,
            to: session.user?.email,
            subject: "Votre colis a été enregistré",
            html: `
        <h2>Confirmation d'enregistrement</h2>
        <p>Bonjour ${session.user?.name || ""}, votre colis a été enregistré.</p>
        <ul>
          <li><b>Contenu:</b> ${packageContents}</li>
          <li><b>Poids:</b> ${weight} kg</li>
          <li><b>De:</b> ${origin}</li>
          <li><b>À:</b> ${destination}</li>
          <li><b>Participation:</b> ${participationAllowance} €</li>
        </ul>
        ${imageUrl ? `<img src="${imageUrl}" width="200" />` : ""}
        <p>Merci d'utiliser NDC Travels 🚀</p>
      `,
        });

        return NextResponse.json(packageData);
    } catch (error) {
        console.error("❌ Error creating package:", error);
        return NextResponse.json({ error: "Échec de l'enregistrement" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const origin = url.searchParams.get("origin")?.trim();
    const destination = url.searchParams.get("destination")?.trim();
    const search = url.searchParams.get("search")?.trim();

    const transports = await prisma.package.findMany({
        where: {
            userId: session.user?.id,
            ...(origin ? { origin: { contains: origin, mode: "insensitive" } } : {}),
            ...(destination ? { destination: { contains: destination, mode: "insensitive" } } : {}),
            ...(search
                ? {
                    OR: [
                        { title: { contains: search, mode: "insensitive" } },
                        { description: { contains: search, mode: "insensitive" } },
                    ],
                }
                : {}),
        },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(transports);
}

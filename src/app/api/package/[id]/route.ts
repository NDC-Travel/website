import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
    params: { id: string };
}

// 🔹 UPDATE PACKAGE (PUT)
export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const {id} = params;

    try {
        const contentType = req.headers.get("content-type");

        // Find existing package first
        const existingPackage = await prisma.package.findUnique({where: {id}});
        if (!existingPackage) return NextResponse.json({error: "Package not found"}, {status: 404});
        if (existingPackage.userId !== session.user?.id)
            return NextResponse.json({error: "Forbidden"}, {status: 403});

        let updateData: any = {};

        // 🟣 Case 1: JSON body (no file upload)
        if (contentType && contentType.includes("application/json")) {
            updateData = await req.json();
        }

        // 🟢 Case 2: FormData with file upload
        else if (contentType && contentType.includes("multipart/form-data")) {
            const formData = await req.formData();

            updateData = {
                packageContents: formData.get("packageContents") as string,
                width: formData.get("width") as string,
                height: formData.get("height") as string,
                length: formData.get("length") as string,
                weight: formData.get("weight") as string,
                participationAllowance: formData.get("participationAllowance") as string,
                shippingDeadline: formData.get("shippingDeadline") as string,
                parcelDetails: formData.get("parcelDetails") as string,
                origin: formData.get("origin") as string,
                destination: formData.get("destination") as string,
            };

            const imageFile = formData.get("image") as File | null;
            if (imageFile && imageFile.size > 0) {
                // Upload to Vercel Blob
                const blob = await put(`packages/${Date.now()}-${imageFile.name}`, imageFile, {
                    access: "public",
                });
                updateData.imageUrl = blob.url;
            }
        } else {
            return NextResponse.json({error: "Unsupported Content-Type"}, {status: 400});
        }

        // 🧩 Update package
        const updatedPackage = await prisma.package.update({
            where: {id},
            data: updateData,
        });

        return NextResponse.json(updatedPackage);
    } catch (err) {
        console.error("Error updating package:", err);
        return NextResponse.json({error: "Update failed"}, {status: 500});
    }
}


// 🔹 DELETE PACKAGE
export async function DELETE(req: Request, {params}: Params) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const {id} = params;

    try {
        const existingPackage = await prisma.package.findUnique({where: {id}});
        if (!existingPackage) {
            return NextResponse.json({error: "Package not found"}, {status: 404});
        }
        if (existingPackage.userId !== session.user?.id) {
            return NextResponse.json({error: "Forbidden"}, {status: 403});
        }

        await prisma.package.delete({where: {id}});

        return NextResponse.json({message: "Package deleted successfully"});
    } catch (err) {
        console.error("Error deleting package:", err);
        return NextResponse.json({error: "Failed to delete package"}, {status: 500});
    }
}

// 🔹 GET PACKAGE BY ID
export async function GET(req: Request, {params}: Params) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const {id} = params;

    try {
        const packageData = await prisma.package.findUnique({
            where: {id},
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                    },
                },
            }
        });

        if (!packageData) {
            return NextResponse.json({error: "Package not found"}, {status: 404});
        }
        if (packageData.userId !== session.user?.id) {
            return NextResponse.json({error: "Forbidden"}, {status: 403});
        }

        return NextResponse.json(packageData);
    } catch (err) {
        console.error("Error fetching package:", err);
        return NextResponse.json({error: "Failed to fetch package"}, {status: 500});
    }
}


import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
        orderBy: { createdAt: "desc" },
    });

    const visibleNotifications = notifications.filter(
        (notif) => !notif.targetId || notif.targetId === session.user?.id
    );

    return NextResponse.json({ notifications: visibleNotifications });
}


// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import Pusher from "pusher";
//
// const prisma = new PrismaClient();
//
// const pusher = new Pusher({
//     appId: process.env.PUSHER_APP_ID!,
//     key: process.env.PUSHER_APP_KEY!,
//     secret: process.env.PUSHER_APP_SECRET!,
//     cluster: process.env.PUSHER_APP_CLUSTER!,
//     useTLS: true,
// });
//
// export async function POST(req: Request) {
//     const { targetId, title, content } = await req.json();
//
//     const notification = await prisma.notification.create({
//         data: { targetId, title, content },
//     });
//
//     // Trigger Pusher for real-time updates
//     const channel = targetId ? `notifications-${targetId}` : "notifications-all";
//     await pusher.trigger(channel, "new-notification", notification);
//
//     return NextResponse.json({ success: true, notification });
// }

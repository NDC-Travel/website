// export const runtime = "nodejs";
//
// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaClient } from "@prisma/client";
// import { verifyPassword } from "@/lib/hash";
//
// const prisma = new PrismaClient();
//
// const handler = NextAuth({
//     adapter: PrismaAdapter(prisma),
//
//     session: {
//         strategy: "database",
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) return null;
//
//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email },
//                 });
//                 if (!user || !user.password) return null;
//
//                 const valid = await verifyPassword(credentials.password, user.password);
//                 return valid ? user : null;
//             },
//         }),
//
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//     ],
//
//     callbacks: {
//         async session({ session, user }) {
//             if (session.user && user) {
//                 session.user = {
//                     id: user.id,
//                     name: user.name,
//                     email: user.email,
//                     image: user.image,
//                     address: user.address,
//                     phone: user.phone,
//                     createdAt: user.createdAt,
//                 };
//             }
//             return session;
//         },
//     },
//
//     cookies: {
//         sessionToken: {
//             name:
//                 process.env.NODE_ENV === "production"
//                     ? "__Secure-next-auth.session-token"
//                     : "next-auth.session-token",
//             options: {
//                 httpOnly: true,
//                 sameSite: "none", // ✅ Required for cross-site/mobile
//                 secure: true, // ✅ MUST be true if sameSite=none
//                 path: "/",
//                 domain:
//                     process.env.NODE_ENV === "production"
//                         ? ".ndc-travels.com" // ✅ Important! Set your root domain here
//                         : undefined,
//             },
//         },
//     },
//
//     pages: {
//         signIn: "/auth/signin",
//     },
//
//     secret: process.env.NEXTAUTH_SECRET,
//     debug: true,
// });
//
// export { handler as GET, handler as POST };




export const runtime = "nodejs";

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "@/lib/hash";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user.password) return null;

                const valid = await verifyPassword(credentials.password, user.password);
                return valid ? user : null;
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async session({ session, user }) {
            if (session.user && user) {
                session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    address: user.address,
                    phone: user.phone,
                    createdAt: user.createdAt,
                };
            }
            return session;
        },
    },

    cookies: {
        sessionToken: {
            name:
                process.env.NODE_ENV === "production"
                    ? "__Secure-next-auth.session-token"
                    : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "none", // ✅ Required for cross-site/mobile
                secure: true, // ✅ MUST be true if sameSite=none
                path: "/",
                domain:
                    process.env.NODE_ENV === "production"
                        ? ".ndc-travels.com" // ✅ Important! Set your root domain here
                        : undefined,
            },
        },
    },

    pages: {
        signIn: "/auth/signin",
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


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
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "john@doe.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) {
                    return null;
                }

                const isValid = await verifyPassword(credentials.password, user.password);
                if (!isValid) return null;

                return {
                    id: user.id,
                    name: user.name ?? undefined,
                    email: user.email ?? undefined,
                    image: user.image ?? undefined,
                };
            },
        }),

        // 🔹 Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV !== "production"
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import { verifyPassword } from "@/lib/hash";
//
// const prisma = new PrismaClient();
//
// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     session: {
//         strategy: "jwt", // we store sessions in the DB
//     },
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email", placeholder: "john@doe.com" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     return null;
//                 }
//
//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email },
//                 });
//
//                 if (!user || !user.password) {
//                     // user not found or no password set (e.g. OAuth-only)
//                     return null;
//                 }
//
//                 const isValid = await verifyPassword(credentials.password, user.password);
//                 if (!isValid) return null;
//
//                 return {
//                     id: user.id,
//                     name: user.name ?? undefined,
//                     email: user.email ?? undefined,
//                     image: user.image ?? undefined,
//                 };
//             },
//         }),
//         // Optionally add OAuth providers (Google) later alongside credentials
//     ],
//     pages: {
//         signIn: "/auth/signin",
//     },
//     secret: process.env.AUTH_SECRET,
// };
//
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

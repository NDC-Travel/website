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

                console.log("Session", user)

                return user;
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

    callbacks: {
        async jwt({ token, trigger, session }) {
            // When user updates their profile via `update()` client method
            if (trigger === "update" && session?.user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email },
                });

                if (dbUser) {
                    token.name = dbUser.name;
                    token.phone = dbUser.phone;
                    token.address = dbUser.address;
                    token.image = dbUser.image;
                }
            }

            // Initial sign-in
            if (!token.phone || !token.address) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email },
                });
                if (dbUser) {
                    token.name = dbUser.name;
                    token.phone = dbUser.phone;
                    token.address = dbUser.address;
                    token.image = dbUser.image;
                    token.createdAt = dbUser.createdAt;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.sub;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.phone = token.phone;
                session.user.address = token.address;
                session.user.image = token.image;
                session.user.createdAt = token.createdAt;
            }
            return session;
        },
    },

    secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
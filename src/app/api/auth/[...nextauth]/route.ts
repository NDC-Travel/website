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
        async session({ session, token, user }) {
            if (session?.user && token) {
                session.user.id = token.sub as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.picture as string;
                session.user.phone = token.phone as string
                session.user.address = token.address as string
                session.user.createdAt = token.createdAt
            }

            return session;
        },

        async jwt({ token }) {
            if(token){
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email },
                });
                token.address = dbUser.address
                token.phone = dbUser.phone
                token.createdAt = dbUser.createdAt
                token.image = token.picture as string;
            }
            return token;
        },
    },

    secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
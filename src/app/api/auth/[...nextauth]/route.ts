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
        strategy: "jwt", // ✅ use database sessions
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

                return user;
            },
        }),

        // 🔹 Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: session.user.email! },
                });

                if (dbUser) {
                    console.log("SESSION Data:", dbUser);
                    session.user = {
                        id: dbUser.id,
                        name: dbUser.name,
                        email: dbUser.email,
                        image: dbUser.image,
                        address: dbUser.address,
                        phone: dbUser.phone,
                        createdAt: dbUser.createdAt,
                    };
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                // Add user fields from database
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV !== "production"
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

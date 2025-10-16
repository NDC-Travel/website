// types/auth.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: {
            id: string;
            email?: string | null;
            name?: string | null;
            image?: string | null;
            phone?: string | null;
            address?: string | null;
        };
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        phone?: string | null;
        address?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email?: string;
        name?: string;
        phone?: string;
        address?: string;
    }
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
}

export interface SignInFormData {
    email: string;
    password: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    image: string | null;
    createdAt: string;
}
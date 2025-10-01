"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/login";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res && (res as any).error) {
            setErr((res as any).error || "Invalid credentials");
            return;
        }
        router.push("/dashboard");
    }

    return (
        <div className="container !h-[60dvh] flex items-center justify-center flex-col">
            <div className="card w-[400px] !rounded-[2rem] !py-5 flex items-center justify-center flex-col">
                <span className="h1 mt-auto">Connexion</span><br/>

                <Login />
            </div>
        </div>
    );
}

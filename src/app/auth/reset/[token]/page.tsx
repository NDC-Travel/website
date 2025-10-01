"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetConfirmPage({ params }: { params: { token: string } }) {
    const token = params.token;
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);

        const res = await fetch("/api/auth/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword: password }),
        });
        const data = await res.json();
        if (res.ok) {
            setMsg("Password has been reset. Redirecting to sign in...");
            setTimeout(() => router.push("/auth/signin"), 1500);
        } else {
            setMsg(data?.error || "Reset failed");
        }
    }

    return (
        <div className="max-w-[50%] mx-auto !h-[60dvh] flex items-center justify-center flex-col">
            <div className="card p-4 flex items-center justify-center flex-col">
                <img src={'/pass.gif'} className={'w-[75px] h-auto'} alt={""} />
                <h1 className="text-2xl font-bold my-4">Definir un Mot de Passe</h1>
                <form onSubmit={onSubmit} className="space-y-3 my-5">
                    <input value={password} onChange={e=>setPassword(e.target.value)}  placeholder="Mot de Passe" type="password" required className="w-full !px-2 !py-4 !h-[50px] border rounded" />
                    <button className="px-4 py-3 !font-bold !bg-[#D46328] text-white rounded !w-full mt-5">
                        Mettre à Jour le Mot de Passe
                    </button>
                </form>
                {msg && <p className="mt-3">{msg}</p>}
            </div>
        </div>
    );
}

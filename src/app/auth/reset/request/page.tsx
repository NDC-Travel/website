"use client";
import React, { useState } from "react";

export default function ResetRequestPage() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        const res = await fetch("/api/auth/request-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (res.ok) {
            setMsg("If that email exists, we've sent a reset link.");
        } else {
            setMsg("Something went wrong. Try again later.");
        }
    }

    return (
        <div className="max-w-[50%] mx-auto !h-[60dvh] flex items-center justify-center flex-col">
            <div className="card p-4 flex items-center justify-center flex-col">
                <img src={'https://img.icons8.com/?size=100&id=12279&format=png&color=000000'} className={'w-[75px] h-auto'} alt={""} />
                <h1 className="text-2xl font-bold my-4">Récupérer Mon Compte</h1>
                <form onSubmit={onSubmit} className="space-y-3 my-5">
                    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full !px-2 !py-4 !h-[50px] border rounded" />
                    <button className="px-4 py-3 !font-bold !bg-[#D46328] text-white rounded !w-full mt-5">
                        Envoyer le Lien de Réinitialisation
                    </button>
                </form>
                {msg && <p className="mt-3">{msg}</p>}
            </div>
        </div>
    );
}

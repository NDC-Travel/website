"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res && (res as any).error) {
            setErr((res as any).error || "Invalid credentials");
            return;
        }
        router.push("/dashboard");
    }

    return (
        <div className="w-full">
            <form onSubmit={onSubmit} className="space-y-3 px-3">
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="!h-[50px]"
                    required
                />
                <div className="my-3" />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="!h-[50px]"
                    required
                />

                {err && (
                    <p className="text-red-600 text-sm mt-4">
                        Vos Identifiants sont Incorrects
                    </p>
                )}

                <div className="mt-5 flex justify-content-between text-sm">
                    <Link
                        href="/auth/register"
                        className="!text-[#D46328] hover:underline"
                    >
                        Créer un Nouveau Compte
                    </Link>
                    <Link
                        href="/auth/reset/request"
                        className="!text-[#D46328] hover:underline"
                    >
                        Mot de passe Oublié?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`flex mt-5 items-center justify-center w-full px-2 py-3 text-lg font-medium text-white fw-bold border border-gray-300 rounded-4 outline-none transition-colors
                    ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#D46328] hover:!text-[#D46328] hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Connexion...
                        </div>
                    ) : (
                        "Se Connecter"
                    )}
                </button>
            </form>
        </div>
    );
}

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

                <button
                    type={'button'}
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="flex items-center mt-3 justify-center w-full px-2 py-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-4 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                </button>
            </form>
        </div>
    );
}

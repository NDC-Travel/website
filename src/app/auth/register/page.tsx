"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name, phone, image }),
            });
            const data = await res.json();
            if (!res.ok) {
                setErr(data?.error || "Registration failed");
                return;
            }
            router.push("/auth/signin");
        } catch (err) {
            setErr("Server error");
        }
    }

    return (
        <div className="max-w-md mx-auto py-12">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={onSubmit} className="space-y-3">
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
                <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL (optional)" className="w-full p-2 border rounded" />
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full p-2 border rounded" />
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full p-2 border rounded" />
                <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required className="w-full p-2 border rounded" />
                {err && <p className="text-red-600">{err}</p>}
                <button className="px-4 py-2 bg-green-600 text-white rounded">Create account</button>
            </form>
        </div>
    );
}

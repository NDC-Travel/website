"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import {Calendar1Icon, ChevronRightIcon, User2Icon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function ContactTab({ session }: { session: any }) {
    const [contacts, setContacts] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchContacts = async () => {
        const res = await fetch("/api/user/contacts"); // create a GET route to fetch contacts
        if (res.ok) {
            const data = await res.json();
            setContacts(data);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleAddContact = async () => {
        if (!input) return;
        setLoading(true);
        try {
            const res = await fetch("/api/user/add-contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailOrPhone: input }),
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            const updatedContacts = await res.json();
            setContacts(updatedContacts);
            setInput("");
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mes Contacts</CardTitle>
                <CardDescription>Ajoutez un contact en utilisant son email ou téléphone</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Email ou téléphone"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={handleAddContact} disabled={loading}>
                        {loading ? "Ajout..." : "Ajouter"}
                    </Button>
                </div>

                <div className="grid gap-2">
                    {contacts.map((c) => (
                        // <Card key={c.contact.id} className="p-2">
                        //     <p className="font-semibold">{c.contact.name || c.contact.email}</p>
                        //     <p className="text-sm text-muted-foreground">{c.contact.email || c.contact.phone}</p>
                        // </Card>
                        <Item key={c.contact.id} variant="outline" size="sm" asChild>
                            <div>
                                <ItemMedia>
                                    <Avatar className={'!w-[32px] !h-[32px] !bg-black !text-white'}>
                                        <AvatarImage src={c.contact.image as string} />
                                        <AvatarFallback className={'!text-decoration-none !bg-black !text-white'}>{c.contact.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>{c.contact.name} <b className={'!text-[#007bff]'}>{c.contact.email}</b></ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <ChevronRightIcon className="size-4" />
                                </ItemActions>
                            </div>
                        </Item>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

"use client";
import React, {useState, useEffect, useRef} from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter} from "@/components/ui/card";
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
import {Autocomplete, useLoadScript} from "@react-google-maps/api";
import {upload} from "@vercel/blob/client";
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {useRouter, useSearchParams} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {MailIcon} from "lucide-react";

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

interface ProfileTabProps {
    session: any;
}

export function ProfileTab({ session }: ProfileTabProps) {

    const { data, status, update } = useSession({ required: true });

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch("/api/user/me")
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    const [formData, setFormData] = useState({
        name: session.user?.name || "",
        phone: session.user?.phone || "",
        address: session.user?.address || "",
        image: session.user?.image || "",
    });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"],
    });

    const [autocomplete, setAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);

    const handlePlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            setFormData((prev) => ({
                ...prev,
                address: place.formatted_address || "",
            }));
        }
    };

    const handleInputChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {

        const updatedFormData = { ...formData };

        if (fileInputRef.current?.files?.length) {
            const file = fileInputRef.current.files[0];

            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });

            updatedFormData.image = newBlob.url; // immediately use the new URL
            setFormData(updatedFormData);
        } else {
            // Remove image field if no new image is uploaded
            delete updatedFormData.image;
        }

        try {
            const res = await fetch("/api/user/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFormData),
            });
            if (!res.ok) {
                throw new Error("Erreur lors de la mise à jour du profil");
            }
            const data = await res.json();
            setUser(data);
            await update();
            console.log("Profil mis à jour:", data);
            alert("✅ Profil mis à jour avec succès !");
        } catch (error) {
            console.error(error);
            alert("❌ Une erreur est survenue. Veuillez réessayer.");
        }

    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, image: imageUrl }));
        }
    };

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mon Profil</CardTitle>
                <CardDescription>
                    Modifiez vos informations de profil ci-dessous.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
                {/* Profile Image */}
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={formData.image} alt={formData.name} />
                        <AvatarFallback>
                            {formData.name ? formData.name.charAt(0) : "?"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <Button variant="outline" size="sm" onClick={handleImageUploadClick}>
                            Changer la photo
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="grid gap-3">
                    <Label htmlFor="profile-name">Nom complet</Label>
                    <Input
                        id="profile-name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Votre nom complet"
                    />
                </div>

                {/* Phone Number */}
                <div className="grid gap-3">
                    <Label htmlFor="profile-phone">Numéro de téléphone</Label>
                    <Input
                        id="profile-phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                </div>

                {/* Address with Google Autocomplete */}
                <div className="grid gap-3">
                    <Label htmlFor="profile-address">Adresse</Label>
                    {isLoaded ? (
                        <Autocomplete
                            onLoad={(a) => setAutocomplete(a)}
                            onPlaceChanged={handlePlaceChanged}
                        >
                            <Input
                                id="profile-address"
                                placeholder="Entrez votre adresse"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                            />
                        </Autocomplete>
                    ) : (
                        <Input
                            disabled
                            placeholder="Chargement de la carte..."
                            className="opacity-50"
                        />
                    )}
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full !h-[44px] !font-bold mt-5 !bg-[#d46328]" onClick={handleSave}>
                    Enregistrer les modifications
                </Button>
            </CardFooter>

            <Separator className={'mt-7'} />

            <CardHeader>
                <CardTitle>Mes Meta Information</CardTitle>
                <CardDescription>
                    Ces informations liées a votre compte sont non-modifiables
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">

                <div className="grid gap-3">
                    <Item variant="outline" size="sm" asChild>
                        <div>
                            <ItemMedia>
                                <MailIcon className="size-5" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>Adresse Email: <b className={'!text-[#007bff]'}>{session.user?.email}</b></ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <ChevronRightIcon className="size-4" />
                            </ItemActions>
                        </div>
                    </Item>
                </div>

                <div className="grid gap-3">
                    <Item variant="outline" size="sm" asChild>
                        <div>
                            <ItemMedia>
                                <Calendar1Icon className="size-5" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>Date de Création: <span className={'text-muted'}>{new Date(session.user?.createdAt).toDateString()}</span></ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <ChevronRightIcon className="size-4" />
                            </ItemActions>
                        </div>
                    </Item>
                </div>

            </CardContent>
        </Card>
    );
}
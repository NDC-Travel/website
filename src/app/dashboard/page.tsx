'use client'

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useEffect, useRef, useState} from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import {signIn, useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {Calendar1Icon, ChevronRightIcon, MailIcon} from "lucide-react";
import ContactTab from "@/components/my-contact";
import MessageTab from "@/components/my-message";

export default function DashboardPage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const searchParams = useSearchParams();

    // Read the active tab from the URL
    const initialTab = searchParams.get("page") || "profile";
    const [activeTab, setActiveTab] = useState(initialTab);

    // Redirect if unauthenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        router.replace(`?page=${value}`, { scroll: false });
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-[70dvh]">
                <p>Chargement...</p>
            </div>
        );
    }

    if (!session) {
        // Optional fallback before redirect triggers
        return (
            <div className="p-8 flex flex-col items-center justify-center h-full">
                <p>Connectez-vous pour accéder à cette page</p>
                <button
                    onClick={() => signIn()}
                    className="mt-3 text-blue-600 underline"
                >
                    Me connecter
                </button>
            </div>
        );
    }

    return (
        <div className="!flex !w-full !min-h-[70dvh] !py-10 !flex-col !justify-center !gap-6">
            <div className={'container flex justify-content-center'}>
                <Tabs defaultValue={initialTab} onValueChange={handleTabChange} className={'md:!w-[70%] !w-full'}>
                    <TabsList className={'!h-[50px] !w-full'}>
                        <TabsTrigger className={''} value="profile">Mon Compte</TabsTrigger>
                        <TabsTrigger value="contact">Mes Contacts</TabsTrigger>
                        <TabsTrigger value="package">Mes Colis</TabsTrigger>
                        <TabsTrigger value="trip">Mes Voyages</TabsTrigger>
                        <TabsTrigger value="message">Mes Messages</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <ProfileTab session={session} />
                    </TabsContent>
                    <TabsContent value="contact">
                        <ContactTab session={session} />
                    </TabsContent>
                    <TabsContent value="package">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you&apos;re
                                    done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-name">Name</Label>
                                    <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-username">Username</Label>
                                    <Input id="tabs-demo-username" defaultValue="@peduarte" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="trip">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you&apos;ll be logged
                                    out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-current">Current password</Label>
                                    <Input id="tabs-demo-current" type="password" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">New password</Label>
                                    <Input id="tabs-demo-new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="message">
                        <MessageTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

interface ProfileTabProps {
    session: any;
}

function ProfileTab({ session }: ProfileTabProps) {

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
                                <ItemTitle>Date de Création: <span className={'text-muted'}>{new Date(session.user?.createdAt).toDateString("fr-FR")}</span></ItemTitle>
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

'use client'

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
import {use, useEffect, useRef, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import ContactTab, {ProfileTab} from "@/components/my-contact";
import MessageTab from "@/components/my-message";
import TransportTable from "@/components/my-carry";
import PackageTable from "@/components/my-package";

export default function Dashboard({
                                      searchParams,
                                  }: {
    searchParams: Promise<{ page?: string }>
}) {
    const params = use(searchParams)

    const { data: session, status, update } = useSession();
    const router = useRouter();

    // const searchParams = useSearchParams();

    // Read the active tab from the URL
    const initialTab = params.page || "profile";
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
                        <PackageTable />
                    </TabsContent>
                    <TabsContent value="trip">
                        <TransportTable />
                    </TabsContent>
                    <TabsContent value="message">
                        <MessageTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}



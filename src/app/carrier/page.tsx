'use client'

import Breadcrumb from "@/components/nav";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import ListingCarrier from "@/components/carrier";

export default function Listing({
                                    searchParams,
                                }: {
    searchParams: Promise<{ origin?: string, search?: string, destination?: string }>
}) {

    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    return (
        <main className={'content-wrapper'}>

            <Breadcrumb
                items={[
                    { label: "Accueil", href: "/" },
                    { label: "Transporteur" },
                ]}
            />

            <ListingCarrier searchParams={searchParams} />

        </main>
    );
}

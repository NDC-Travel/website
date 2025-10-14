'use client'

import Breadcrumb from "@/components/nav";
import ListingFilter from "@/components/filter";
import {Separator} from "@/components/ui/separator";
import ListingPackage from "@/components/list";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {use, useEffect, useState} from "react";

export default function Listing({
                                    searchParams,
                                }: {
    searchParams: Promise<{ origin?: string, search?: string, destination?: string }>
}) {

    const { data: session, status } = useSession();
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
                    { label: "Colis" },
                ]}
            />

            <ListingPackage searchParams={searchParams} />

        </main>
    );
}

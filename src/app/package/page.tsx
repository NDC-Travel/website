'use client'

import Breadcrumb from "@/components/nav";
import ListingFilter from "@/components/filter";
import {Separator} from "@/components/ui/separator";
import ListingPackage from "@/components/list";

export default function Listing({
                                    searchParams,
                                }: {
    searchParams: Promise<{ origin?: string, search?: string, destination?: string }>
}) {
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

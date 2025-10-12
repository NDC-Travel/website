import {Suspense} from "react";
import ShipSendPackage from "@/components/colis";

export default function Page({
                                 searchParams,
                             }: {
    searchParams: Promise<{ origin?: string, id?: string, destination?: string }>
}) {
    return (
        <Suspense fallback={<>...</>}>
            <ShipSendPackage searchParams={searchParams} />
        </Suspense>
    )
}
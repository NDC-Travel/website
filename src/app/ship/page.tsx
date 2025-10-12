import {Suspense} from "react";
import SendPackage from "@/components/ship";

export default function Page({
                                 searchParams,
                             }: {
    searchParams: Promise<{ origin?: string, id?: string, destination?: string }>
}) {
    return (
        <Suspense fallback={<>...</>}>
            <SendPackage searchParams={searchParams} />
        </Suspense>
    )
}
import {Suspense} from "react";
import Dashboard from "@/components/account";

export default function Page({
                                 searchParams,
                             }: {
    searchParams: Promise<{ page?: string }>
}) {
    return (
        <Suspense fallback={<>...</>}>
            <Dashboard searchParams={searchParams} />
        </Suspense>
    )
}
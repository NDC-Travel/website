import {Suspense} from "react";
import Dashboard from "@/components/admin";

export default async function Admin({
                                 searchParams,
                             }: {
    searchParams: Promise<{ page?: string, id?: string }>
}) {

    return (
        <Suspense fallback={<>...</>}>
            <Dashboard searchParams={searchParams} />
        </Suspense>
    )
}
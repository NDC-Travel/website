import {Suspense} from "react";
import Dashboard from "@/components/account";
import {useSession} from "next-auth/react";

export default function Page({
                                 searchParams,
                             }: {
    searchParams: Promise<{ page?: string, id?: string }>
}) {

    const { data: session } = useSession();

    if (!session?.user) return <div>Loading...</div>;

    return (
        <Suspense fallback={<>...</>}>
            <Dashboard searchParams={searchParams} />
        </Suspense>
    )
}
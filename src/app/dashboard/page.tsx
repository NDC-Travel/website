import {Suspense} from "react";
import Dashboard from "@/components/account";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Page({
                                 searchParams,
                             }: {
    searchParams: Promise<{ page?: string, id?: string }>
}) {

    const session = await getServerSession(authOptions);

    if (!session?.user) return <div>Loading...</div>;

    return (
        <Suspense fallback={<>...</>}>
            <Dashboard searchParams={searchParams} />
        </Suspense>
    )
}
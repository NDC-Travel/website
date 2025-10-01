import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div className="p-8">
                <p>You must be signed in to view this page.</p>
                <a href="/auth/signin">Sign in</a>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1>Welcome, {session.user?.name ?? session.user?.email}</h1>
            <p>Email: {session.user?.email}</p>
        </div>
    );
}

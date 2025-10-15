import {NextRequest, NextResponse} from "next/server";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store");
    return res;
}

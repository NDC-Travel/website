import {NextRequest, NextResponse} from "next/server";

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export function middleware(req: NextRequest) {
    const basicAuth = req.headers.get('authorization');

    // Protect only /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        const USER = process.env.BASIC_AUTH_USER || 'admin';
        const PASS = process.env.BASIC_AUTH_PASS || 'ndc@admin.2025';

        if (!basicAuth) {
            return new NextResponse('Auth required', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Secure Area"',
                },
            });
        }

        const [, encoded] = basicAuth.split(' ');
        const decoded = Buffer.from(encoded, 'base64').toString();
        const [user, pass] = decoded.split(':');

        if (user !== USER || pass !== PASS) {
            return new NextResponse('Unauthorized', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Secure Area"',
                },
            });
        }
    }

    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store");
    return res;
}

// Apply middleware only to the /admin path
export const config = {
    matcher: ['/admin/:path*'],
};
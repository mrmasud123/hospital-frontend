import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    const isDashboardRoute = /^\/(patient|doctor|receptionist|admin)\//.test(req.nextUrl.pathname);
    const isLoginRoute = req.nextUrl.pathname === "/login";

    if (isDashboardRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isLoginRoute && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/patient/:path*", "/doctor/:path*", "/receptionist/:path*", "/admin/:path*", "/login"],
};


import { NextRequest, NextResponse } from "next/server";

const PUBLIC_AUTH_ROUTES = [
    "/dashboard/auth/login",
    "/dashboard/auth/register",
    "/dashboard/auth/forgot-password",
    "/dashboard/auth/otp",
    "/dashboard/auth/reset-password",
];

const PROTECTED_PREFIX = "/dashboard";

export function proxy(request: NextRequest) {
    // const { pathname } = request.nextUrl;

    // if (!pathname.startsWith(PROTECTED_PREFIX)) {
    //     return NextResponse.next();
    // }

    // const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.some((route) =>
    //     pathname.startsWith(route)
    // );

    // const isAuthenticated = request.cookies.has("auth_session");

    // if (!isPublicAuthRoute && !isAuthenticated) {
    //     const loginUrl = new URL("/dashboard/auth/login", request.url);
    //     loginUrl.searchParams.set("callbackUrl", pathname);
    //     return NextResponse.redirect(loginUrl);
    // }
    // if (isPublicAuthRoute && isAuthenticated) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
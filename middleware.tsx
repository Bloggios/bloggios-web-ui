import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/otp') {
        return NextResponse.redirect(new URL('/signup', request.url))
    }
}
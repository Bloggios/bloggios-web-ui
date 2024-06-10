import {NextRequest, NextResponse} from "next/server";
import {BLOG_PAGE, SIGNUP_PAGE} from "@/constants/UiPathConstants";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/otp') {
        return NextResponse.redirect(new URL(SIGNUP_PAGE, request.url));
    }
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL(BLOG_PAGE, request.url));
    }
}
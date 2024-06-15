import {ApplicationProvider} from "@/providers/ApplicationProvider";
import {RefreshTokenProvider} from "@/providers/RefreshTokenProvider";
import React from "react";
import {Poppins} from "next/font/google";
import {NextUIProvider} from "@nextui-org/system";
import "../globals.css";
import {ThemeProvider} from "next-themes";
import BloggiosToast from "@/components/custom/BloggiosToast";
import "react-quill/dist/quill.snow.css";
import {GoogleOAuthProvider} from "@react-oauth/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "900"],
    variable: "--font-poppins"
})

export const metadata = {
    title: 'Bloggios',
    keywords: "Bloggios, blog, tech blog, Q&A, posts, messaging, community, insights, questions, engagement, rohit parihar, rohit",
    description: "Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
}

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html suppressHydrationWarning lang="en">
        <body className={`${poppins.variable} min-h-screen`}>
        <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange
        >
            <NextUIProvider>
                <ApplicationProvider>
                    <GoogleOAuthProvider clientId={"50987300482-vlm1c14cr19nush8ib2hhv5deoi4ge08.apps.googleusercontent.com"}>
                        <RefreshTokenProvider>
                            <BloggiosToast/>
                            {children}
                        </RefreshTokenProvider>
                    </GoogleOAuthProvider>
                </ApplicationProvider>
            </NextUIProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}

import {ApplicationProvider} from "@/providers/ApplicationProvider";
import {RefreshTokenProvider} from "@/providers/RefreshTokenProvider";
import React from "react";
import {Poppins} from "next/font/google";
import {NextUIProvider} from "@nextui-org/system";
import "../globals.css";
import {ThemeProvider} from "next-themes";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "900"],
    variable: "--font-poppins"
})

export const metadata = {
    title: 'Bloggios',
    keywords: "Bloggios, blogs, tech blogs, Q&A, posts, messaging, community, insights, questions, engagement, rohit parihar, rohit",
    description: "Bloggios, your all-in-one platform for blogs, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
}

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html suppressHydrationWarning lang="en">
        <body className={`${poppins.variable} relative flex flex-col min-h-screen bg-background`}>
        <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange
        >
            <NextUIProvider>
                <ApplicationProvider>
                    <RefreshTokenProvider>
                        {children}
                    </RefreshTokenProvider>
                </ApplicationProvider>
            </NextUIProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}

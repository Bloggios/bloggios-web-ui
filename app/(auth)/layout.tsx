import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "@/providers/ThemeProvider";
import Head from "next/head";
import RootNavbar from "@/components/custom/RootNavbar";
import {NextUIProvider} from "@nextui-org/system";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "900"],
    variable: "--font-poppins"
})

export const metadata: Metadata = {
    title: {
        default: "Bloggios",
        template: "%s - Bloggios"
    },
    keywords: "Bloggios, blogs, tech blogs, Q&A, posts, messaging, community, insights, questions, engagement, rohit parihar, rohit",
    description: "Bloggios, your all-in-one platform for blogs, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Head>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        {/*relative flex min-h-screen flex-col bg-background*/}
        <body className={`${poppins.variable} relative flex flex-col min-h-screen bg-background`}>
        <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange
        >
            <NextUIProvider>
                <RootNavbar/>
                {children}
            </NextUIProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}

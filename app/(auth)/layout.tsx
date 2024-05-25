import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../globals.css";
import Head from "next/head";
import {NextUIProvider} from "@nextui-org/system";
import AuthPageCard from "@/components/custom/sections/AuthPageCard";
import Link from "next/link";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ApplicationProvider} from "@/providers/ApplicationProvider";
import {Toaster} from "sonner";
import BloggiosToast from "@/components/custom/BloggiosToast";

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
        <body
            className={`${poppins.variable} relative flex flex-col min-h-screen bg-auth-bg bg-cover bg-no-repeat bg-fixed`}>
        <ApplicationProvider>
            <BloggiosToast />
            <NextUIProvider className={"flex flex-col min-h-screen justify-between relative"}>
                <main className={"flex flex-row w-full mt-10 md:mt-20 lg:space-x-20"}>

                    <div className={"flex-1 hidden lg:flex justify-end"}>
                        <AuthPageCard/>
                    </div>

                    <div className={"flex-1 flex lg:justify-start justify-center"}>
                        {children}
                    </div>
                </main>

                <footer
                    className={"flex self-center items-center justify-between w-[95%] md:w-[650px] gap-4 my-4 text-white text-muted-foreground text-xs font-extralight"}>
                    <Link href={"/"} className={"hover:underline"}>© Bloggios 2024</Link>

                    <div className={"flex gap-4"}>
                        <Link href={"/"} className={"hover:underline"}>
                            Privacy
                        </Link>

                        <Link className={"hover:underline"} href={"/"}>Terms and Conditions</Link>
                    </div>
                </footer>
            </NextUIProvider>
        </ApplicationProvider>
        </body>
        </html>
    );
}

import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../globals.css";
import Head from "next/head";
import {NextUIProvider} from "@nextui-org/system";
import AuthPageCard from "@/components/custom/sections/AuthPageCard";
import Link from "next/link";
import {ApplicationProvider} from "@/providers/ApplicationProvider";
import BloggiosToast from "@/components/custom/BloggiosToast";
import {RefreshTokenProvider} from "@/providers/RefreshTokenProvider";
import IsAuthenticated from "@/components/functional/IsAuthenticated";
import {GoogleOAuthProvider} from "@react-oauth/google";

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
    keywords: "Bloggios, blog, tech blog, Q&A, posts, messaging, community, insights, questions, engagement, rohit parihar, rohit",
    description: "Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
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
            <BloggiosToast/>
                <NextUIProvider className={"flex flex-col min-h-screen justify-between relative"}>
            <GoogleOAuthProvider clientId={"50987300482-vlm1c14cr19nush8ib2hhv5deoi4ge08.apps.googleusercontent.com"}>
                <RefreshTokenProvider>
                    <main className={"flex flex-row w-full mt-10 md:mt-20 lg:space-x-20"}>
                        <IsAuthenticated/>
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
                </RefreshTokenProvider>
            </GoogleOAuthProvider>
            </NextUIProvider>
        </ApplicationProvider>
        </body>
        </html>
    );
}

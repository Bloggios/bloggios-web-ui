import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../globals.css";
import Head from "next/head";
import {NextUIProvider} from "@nextui-org/system";
import AuthPageCard from "@/components/custom/sections/AuthPageCard";

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
        <body className={`${poppins.variable} relative flex flex-col min-h-screen bg-auth-bg bg-cover bg-no-repeat bg-fixed`}>
            <NextUIProvider>
                <main className={"flex flex-row w-full mt-10 md:mt-20 lg:space-x-20"}>
                    <div className={"flex-1 hidden lg:flex justify-end"}>
                        <AuthPageCard />
                    </div>

                    <div className={"flex-1 flex lg:justify-start justify-center"}>
                        {children}
                    </div>
                </main>
            </NextUIProvider>
        </body>
        </html>
    );
}

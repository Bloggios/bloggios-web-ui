import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../../globals.css";
import {ThemeProvider} from "@/providers/ThemeProvider";
import Head from "next/head";
import RootNavbar from "@/components/custom/navbars/RootNavbar";
import {ApplicationProvider} from "@/providers/ApplicationProvider";
import BloggiosToast from "@/components/custom/BloggiosToast";
import {NextUIProvider} from "@nextui-org/system";
import {RefreshTokenProvider} from "@/providers/RefreshTokenProvider";
import RedirectProfileNotAdded from "@/components/functional/RedirectProfileNotAdded";
import DynamicNavbarProvider from "@/components/custom/navbars/DynamicNavbarProvider";
import {Separator} from "@/components/ui/separator";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "900"],
    variable: "--font-poppins"
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <RedirectProfileNotAdded/>
            <DynamicNavbarProvider/>

            <div className={"flex-1"}>
                <main className={"max-w-screen-xl container flex h-auto flex-row gap-2 w-full mt-4 md:mt-10"}>

                    <main className={"w-full md:w-[70%]"}>
                        Main Section
                    </main>
                    <Separator orientation={"vertical"} className={"h-auto"} />
                    <aside className={"hidden md:flex md:w-[30%]"}>
                        Aside Section
                    </aside>
                </main>
            </div>
        </>
    );
}

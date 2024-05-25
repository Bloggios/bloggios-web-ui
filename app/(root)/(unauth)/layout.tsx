import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../../globals.css";
import {ThemeProvider} from "@/providers/ThemeProvider";
import Head from "next/head";
import RootNavbar from "@/components/custom/RootNavbar";
import {ApplicationProvider} from "@/providers/ApplicationProvider";
import BloggiosToast from "@/components/custom/BloggiosToast";
import {NextUIProvider} from "@nextui-org/system";
import {RefreshTokenProvider} from "@/providers/RefreshTokenProvider";

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
            <RootNavbar />
            {children}
        </>
    );
}

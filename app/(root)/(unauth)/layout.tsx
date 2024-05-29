import {Poppins} from "next/font/google";
import "../../globals.css";
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

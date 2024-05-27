import Link from "next/link";
import BloggiosLogo from "@/components/custom/BloggiosLogo";
import AuthNavbarLinks from "@/components/custom/buttons/AuthNavbarLinks";

export default function AuthenticatedNavbar() {



    return (
        <nav
            className={"sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"}>
            <div className={"container flex h-14 max-w-screen-xl items-center"}>
                <div className={"flex flex-row items-center gap-8"}>
                    <Link href={"/dashboard"} >
                        <BloggiosLogo />
                    </Link>

                    <AuthNavbarLinks />
                </div>
            </div>
        </nav>
    )
}
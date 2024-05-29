import Link from "next/link";
import BloggiosLogo from "@/components/custom/BloggiosLogo";
import AuthNavbarLinks from "@/components/custom/buttons/AuthNavbarLinks";
import AuthNavbarDrawer from "@/components/custom/drawers/AuthNavbarDrawer";
import ThemeToggleDropdown from "@/components/custom/ThemeToggleDropdown";
import UserNavbarDropdown from "@/components/custom/dropdowns/UserNavbarDropdown";
import DynamicNavbarButton from "@/components/custom/buttons/DynamicNavbarButton";

export default function AuthenticatedNavbar() {



    return (
        <nav
            className={"sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"}>
            <div className={"container flex h-14 max-w-screen-xl items-center"}>
                <div className={"flex flex-row items-center gap-2 md:gap-8"}>
                    <AuthNavbarDrawer />
                    <Link href={"/"} className={"shrink-0"} >
                        <BloggiosLogo />
                    </Link>
                    <AuthNavbarLinks />
                </div>

                <div className={"flex flex-1 items-center justify-end space-x-6 h-full"}>
                    <DynamicNavbarButton />
                    <UserNavbarDropdown />
                    <ThemeToggleDropdown />
                </div>
            </div>
        </nav>
    )
}
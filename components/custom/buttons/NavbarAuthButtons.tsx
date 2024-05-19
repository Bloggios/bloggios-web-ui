"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function NavbarAuthButtons() {

    const router = useRouter();

    return (
        <div className={"flex items-center space-x-2"}>
            <Button onClick={() => router.push("/login")} variant={"link"} size={"sm"}>
                Login
            </Button>

            <Button onClick={() => router.push("/signup")} size={"sm"}>
                Signup
            </Button>
        </div>
    )
}
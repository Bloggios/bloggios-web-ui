"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import LogoutButton from "@/components/custom/buttons/LogoutButton";

export default function NavbarAuthButtons() {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);

    const router = useRouter();

    return (
        <div className={"flex items-center space-x-2"}>
            {isAuthenticated ? (
                <LogoutButton />
            ) : (
                <>
                    <Button onClick={() => router.push("/login")} variant={"link"} size={"sm"}>
                        Login
                    </Button>

                    <Button onClick={() => router.push("/signup")} size={"sm"}>
                        Signup
                    </Button>
                </>
            )}
        </div>
    )
}
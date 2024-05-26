"use client";

import {useLayoutEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {redirect, usePathname, useRouter} from "next/navigation";

export default function MandateAuthenticate() {

    const {isAuthenticated, authorities} = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useLayoutEffect(() => {
        if (!isAuthenticated) {
            router.push(`/login?redirect=${pathname}`)
        } else if (isAuthenticated && authorities?.includes('ROLE_DUMMY')) {
            redirect("/profile-addition-initial");
        }
    }, [isAuthenticated, pathname, router]);

    return <></>
}
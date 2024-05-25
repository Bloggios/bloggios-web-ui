"use client";

import {useLayoutEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {usePathname, useRouter} from "next/navigation";

export default function MandateAuthenticate() {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useLayoutEffect(() => {
        if (!isAuthenticated) {
            router.push(`/login?redirect=${pathname}`)
        }
    }, [isAuthenticated, pathname, router]);

    return <></>
}
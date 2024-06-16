"use client";

import Image from "next/image";
import {useTheme} from "next-themes";
import {useMemo} from "react";
import bloggios_black from "@/public/assets/bg_logo_rounded_black.svg";

export default function BloggiosLogo() {

    const {resolvedTheme} = useTheme();

    return useMemo(() => {
        if (resolvedTheme === "dark") {
            return <Image
                src={bloggios_black}
                alt={"Bloggios"}
                height={34}
                width={34}
            />
        } else {
            return <Image
                src={"/assets/bg_accent_outer_rounded.svg"}
                alt={"Bloggios"}
                height={34}
                width={34}
            />
        }
    }, [resolvedTheme]);
}
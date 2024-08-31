"use client";

import Image from "next/image";
import {useTheme} from "next-themes";
import {useMemo} from "react";

export default function BloggiosLogo({size = 34}) {

    const {resolvedTheme} = useTheme();

    return useMemo(() => {
        if (resolvedTheme === "dark") {
            return <Image
                src={"/assets/bg_logo_rounded_black.svg"}
                alt={"Bloggios"}
                height={size}
                width={size}
            />
        } else {
            return <Image
                src={"/assets/bg_accent_outer_rounded.svg"}
                alt={"Bloggios"}
                height={size}
                width={size}
            />
        }
    }, [resolvedTheme]);
}
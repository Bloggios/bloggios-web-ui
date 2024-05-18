"use client";

import Image from "next/image";
import {useTheme} from "next-themes";

export default function BloggiosLogo() {

    const {theme} = useTheme();
    return (
        <Image
            src={theme==="dark" ? "/assets/bg_logo_rounded_black.svg" : "/assets/bg_accent_outer_rounded.svg"}
            alt={"Bloggios"}
            height={34}
            width={34}
        />
    )
}
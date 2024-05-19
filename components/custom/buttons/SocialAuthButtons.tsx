"use client";

import {Button} from "@/components/ui/button";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import google_logo from "@/public/assets/google.svg";
import Image from "next/image";
import {router} from "next/client";

export default function SocialAuthButtons() {
    return (
        <div className={"flex items-center justify-between space-x-2 my-4"}>
            <Button variant={"outline"} className={"flex-1 flex items-center gap-2"}>
                <GitHubLogoIcon /> Github
            </Button>

            <Button variant={"outline"} className={"flex-1 flex items-center gap-2"}>
                <Image src={google_logo} alt={"google"} width={18} height={18} /> Google
            </Button>
        </div>
    )
}
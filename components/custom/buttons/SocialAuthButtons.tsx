"use client";

import {Button} from "@/components/ui/button";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import google_logo from "@/public/assets/google.svg";
import Image from "next/image";
import Link from "next/link";

export default function SocialAuthButtons({
                                              classname = "my-4"
                                          }) {

    const OAUTH2_REDIRECT_URI = `${window.location.origin}/oauth2/redirect`
    const GOOGLE_AUTH_URL = "http://localhost:7001" + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

    return (
        <div className={`flex items-center justify-between space-x-2 ${classname}`}>
            <Button variant={"outline"} className={"flex-1 flex items-center gap-2"}>
                <GitHubLogoIcon/> Github
            </Button>

            <Link href={GOOGLE_AUTH_URL}>
                <Button variant={"outline"} className={"flex-1 flex items-center gap-2"}>
                    <Image src={google_logo} alt={"google"} width={18} height={18}/> Google
                </Button>
            </Link>
        </div>
    )
}
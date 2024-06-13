"use client";

import {Button} from "@/components/ui/button";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import google_logo from "@/public/assets/google.svg";
import Image from "next/image";
import {useGoogleLogin} from "@react-oauth/google";
import {loginGoogle} from "@/rest/AuthProviderApplication";
import {useRouter, useSearchParams} from "next/navigation";
import {BLOG_PAGE} from "@/constants/UiPathConstants";

export default function SocialAuthButtons({
                                              classname = "my-4"
                                          }) {

    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect');
    const router = useRouter();

    const authenticateGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            setTimeout(()=> {
                loginGoogle(tokenResponse?.access_token, "9571406506-bloggios_856854.dev.google.auth.bloggios.com")
                    .then((response) => {
                        if (redirect) {
                            router.push(redirect);
                        } else {
                            router.push(BLOG_PAGE);
                        }
                    }).catch(error => {
                    console.log(error)
                });
            }, 2000)
        },
    });

    return (
        <div className={`flex items-center justify-between space-x-2 ${classname}`}>
            <Button variant={"outline"} className={"flex-1 flex items-center gap-2"}>
                <GitHubLogoIcon/> Github
            </Button>
            <Button variant={"outline"} className={"flex-1 flex items-center gap-2"} onClick={()=> authenticateGoogle()}>
                <Image src={google_logo} alt={"google"} width={18} height={18}/> Google
            </Button>
        </div>
    )
}
"use client";

import {Button} from "@/components/ui/button";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import google_logo from "@/public/assets/google.svg";
import Image from "next/image";
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import {loginGoogle} from "@/rest/AuthProviderApplication";
import {useRouter, useSearchParams} from "next/navigation";
import {BLOG_PAGE} from "@/constants/UiPathConstants";
import {dispatchError} from "@/utils/DispatchFunctions";
import {useDispatch} from "react-redux";

export default function SocialAuthButtons({
                                              classname = "my-4"
                                          }) {

    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleGoogleLoginBackend = async (token: string) => {
        const payload = {
            token: token,
            secret: "9571406506-bloggios_856854.dev.google.auth.bloggios.com"
        };
        const axiosResponse = await loginGoogle(payload);
        return axiosResponse.data;
    }

    const authenticateGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            let counter = 0;
            const token = tokenResponse.access_token;
            try {
                const newVar = await handleGoogleLoginBackend(token);
                if (newVar) {
                    if (redirect) {
                        router.push(redirect);
                    } else {
                        router.push(BLOG_PAGE);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

    });

    return (
        <div className={`flex items-center justify-between space-x-2 ${classname}`}>
            <Button variant={"outline"} className={"flex-1 flex items-center gap-2"}>
                <GitHubLogoIcon/> Github
            </Button>
            <Button variant={"outline"} className={"flex-1 flex items-center gap-2"}
                    onClick={() => authenticateGoogle()}>
                <Image src={google_logo} alt={"google"} width={18} height={18}/> Google
            </Button>
        </div>
    )
}
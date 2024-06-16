import {Divider} from "@nextui-org/react";
import {cache} from 'react';
import Image from "next/image";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {AiOutlineUserAdd} from "react-icons/ai";
import {BsFillChatSquareDotsFill} from "react-icons/bs";
import {FaRegUser, FaShare} from "react-icons/fa";
import {IoIdCardOutline} from "react-icons/io5";
import {formatDate} from "@/utils/DateUtil";
import {MdMailOutline} from "react-icons/md";
import ImageUploadingAvatar from "@/components/custom/ImageUploadingAvatar";
import {EMAIL_REGEX} from "@/constants/ServiceConstants";
import {notFound} from "next/navigation";
import {getUserProfile} from "@/rest/UserAuthProviderApplication";
import UserProfileCard from "@/components/route_components/profile/UserProfileCard";

// const getProfileAuth = cache(async () => {
//     let cookies1 = cookies();
//     const profileResponse = await authenticatedAxios.get("/user-provider/profile-auth", {
//         withCredentials: true,
//         headers: {
//             'Cookie': `bloggios-cookie-mgmt-token=${cookies1.get("bloggios-cookie-mgmt-token")?.value}`
//         }
//     });
//     return profileResponse.data;
// })

const getProfileAuth = cache(async (email: string) => {
    try {
        const profile = await getUserProfile(email);
        return profile.data;
    } catch (error) {
        return notFound();
    }
});

export async function generateMetadata({ params }: { params: { email: string } }) {
    const finalMail = params.email.replace("%40", "@");
    if (!EMAIL_REGEX.test(finalMail)) {
        notFound();
    }
    const profileAuth = await getProfileAuth(finalMail);
    return {
        title: `${profileAuth.name} - Bloggios user Profile`,
        description: profileAuth.bio
    }
}

export default async function ProfilePage({ params }: { params: { email: string } }) {

    const finalMail = params.email.replace("%40", "@");
    if (!EMAIL_REGEX.test(finalMail)) {
        notFound();
    }

    const profileAuth = await getProfileAuth(finalMail);

    return (
        <main className={"max-w-screen-xl container flex mt-6 md:10 flex-col lg:flex-row md:justify-center"}>
            <div className={"w-full lg:w-[30%] md:w-[50%] self-center animate-slideup opacity-0"}>
                <UserProfileCard profileAuth={profileAuth} />
            </div>

            <div className={"w-full lg:w-[70%]"}>
                Details

            </div>
        </main>
    )
}
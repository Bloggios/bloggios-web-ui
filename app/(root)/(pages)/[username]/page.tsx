import {cache} from 'react';
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

const getProfileAuth = cache(async (username: string) => {
    try {
        const profile = await getUserProfile(username);
        return profile.data;
    } catch (error) {
        return notFound();
    }
});

export async function generateMetadata({ params }: { params: { username: string } }) {
    const finalMail = params.username.replace("%40", "@");
    const profileAuth = await getProfileAuth(finalMail);
    return {
        title: `${profileAuth.name} - Bloggios user Profile`,
        description: profileAuth.bio
    }
}

export default async function ProfilePage({ params }: { params: { username: string } }) {

    const finalMail = params.username.replace("%40", "@");

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
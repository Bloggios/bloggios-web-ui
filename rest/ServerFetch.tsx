import {cache} from "react";
import {getUserProfile} from "@/rest/UserAuthProviderApplication";
import {notFound} from "next/navigation";

export const getProfileAuth = cache(async (username: string) => {
    try {
        const profile = await getUserProfile(username);
        return profile.data;
    } catch (error) {
        return notFound();
    }
});

// export const getLoggedInProfileAuth = cache(async () => {
//     let cookies1 = cookies();
//     const profileResponse = await authenticatedAxios.get("/user-provider/profile-auth", {
//         withCredentials: true,
//         headers: {
//             'Cookie': `bloggios-cookie-mgmt-token=${cookies1.get("bloggios-cookie-mgmt-token")?.value}`
//         }
//     });
//     return profileResponse.data;
// })

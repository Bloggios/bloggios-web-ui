import {cookies} from "next/headers";
import {authenticatedAxios} from "@/rest/BaseAxios";

export async function generateMetadata() {
    let cookies1 = cookies();
    const profileResponse = await authenticatedAxios.get("/user-provider/profile-auth", {
        withCredentials: true,
        headers: {
            'Cookie': `bloggios-cookie-mgmt-token=${cookies1.get("bloggios-cookie-mgmt-token")?.value}`
        }
    });
    const response = profileResponse.data;
    console.log(response)
    return {
        title: response.name
    }
}

export default function ProfilePage() {

    return (
        <main className={"max-w-screen-xl container flex mt-6 md:10 flex-col lg:flex-row md:justify-center"}>
            <div className={"w-full lg:w-[30%] md:w-[50%] bg-red-200 self-center"}>
                Profile Card
            </div>

            <div className={"w-full lg:w-[70%] bg-amber-700"}>
                Details

            </div>
        </main>
    )
}

// Server Side Component (HTML to be prepared on Server and not Browser)
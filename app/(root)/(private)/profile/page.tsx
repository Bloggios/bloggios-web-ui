import {cookies} from "next/headers";
import {authenticatedAxios} from "@/rest/BaseAxios";
import {Avatar, Divider} from "@nextui-org/react";
import {cache} from 'react';
import {RiVerifiedBadgeFill} from "react-icons/ri";
import Image from "next/image";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {AiOutlineUserAdd} from "react-icons/ai";
import {BsChatRightText, BsFillChatSquareDotsFill, BsQuestionCircle} from "react-icons/bs";
import {FaShare} from "react-icons/fa";
import {MdQuestionMark} from "react-icons/md";
import {SlLike} from "react-icons/sl";
import {IoIdCardOutline} from "react-icons/io5";

const getProfileAuth = cache(async () => {
    let cookies1 = cookies();
    const profileResponse = await authenticatedAxios.get("/user-provider/profile-auth", {
        withCredentials: true,
        headers: {
            'Cookie': `bloggios-cookie-mgmt-token=${cookies1.get("bloggios-cookie-mgmt-token")?.value}`
        }
    });
    return profileResponse.data;
})

export async function generateMetadata() {
    const profileAuth = await getProfileAuth();
    return {
        title: profileAuth.name
    }
}

export default async function ProfilePage() {

    const profileAuth = await getProfileAuth();

    return (
        <main className={"max-w-screen-xl container flex mt-6 md:10 flex-col lg:flex-row md:justify-center"}>
            <div className={"w-full lg:w-[30%] md:w-[50%] self-center"}>
                <Card className={"border-none shadow-none"}>
                    <CardHeader className={"flex flex-col gap-4 items-center"}>
                        <Avatar
                            src={profileAuth.profileImage}
                            showFallback
                            className="w-24 h-24 text-large"
                        />

                        <div className={"flex flex-col gap-1 items-center"}>
                            <div className={"flex items-center"}>
                                <h2 className={"scroll-m-20 text-2xl font-bold tracking-wide lg:text-5x"}>{profileAuth.name}</h2>
                                <Image
                                    src={"/assets/blue_badge.svg"}
                                    alt={"Badge"}
                                    width={28}
                                    height={28}
                                    className={""}
                                />
                            </div>
                            <small className={"text-muted-foreground text-sm"}>{profileAuth.profileTag}</small>
                        </div>
                    </CardHeader>

                    <CardContent className={"flex flex-col gap-4 items-center"}>
                        <div className={"flex gap-6"}>

                            <div className={"flex flex-col gap-1 items-center"}>
                                <h4>4</h4>
                                <small className={"text-muted-foreground"}>Blogs</small>
                            </div>

                            <Divider orientation={"vertical"} className={"h-auto"} />

                            <div className={"flex flex-col gap-1 items-center"}>
                                <h4>1K</h4>
                                <small className={"text-muted-foreground"}>Followers</small>
                            </div>

                            <Divider orientation={"vertical"} className={"h-auto"} />

                            <div className={"flex flex-col gap-1 items-center"}>
                                <h4>0</h4>
                                <small className={"text-muted-foreground"}>Posts</small>
                            </div>
                        </div>

                        <small className={"text-sm tracking-wide"}>
                            {profileAuth.bio}
                        </small>

                        <div className={"flex gap-2 w-full"}>
                            <Button size={"sm"} variant={"outline"}
                                    className={"w-full flex items-center justify-center gap-1"}>
                                <AiOutlineUserAdd/> Follow
                            </Button>
                            <Button size={"sm"} variant={"outline"}
                                    className={"w-full flex items-center justify-center gap-1"}>
                                <BsFillChatSquareDotsFill/> Chat
                            </Button>
                            <Button size={"sm"} variant={"outline"}
                                    className={"w-full flex items-center justify-center gap-1"}>
                                <FaShare/> Share
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className={"flex flex-col gap-4 items-center"}>
                        <div className={"flex items-center justify-between w-full"}>
                            <div className={"flex gap-1 items-center text-muted-foreground"}>
                                <BsQuestionCircle/>
                                <small className={"text-sm"}>Discussions</small>
                            </div>

                            <small className={"text-sm font-bold"}>16</small>
                        </div>

                        <div className={"flex items-center justify-between w-full"}>
                            <div className={"flex gap-1 items-center text-muted-foreground"}>
                                <SlLike/>
                                <small className={"text-sm"}>Likes</small>
                            </div>

                            <small className={"text-sm font-bold"}>70</small>
                        </div>

                        <div className={"flex items-center justify-between w-full"}>
                            <div className={"flex gap-1 items-center text-muted-foreground"}>
                                <SlLike/>
                                <small className={"text-sm"}>Followings</small>
                            </div>

                            <small className={"text-sm font-bold"}>2</small>
                        </div>

                        <Divider />

                        <div className={"flex items-center justify-between w-full"}>
                            <div className={"flex gap-1 items-center text-muted-foreground"}>
                                <IoIdCardOutline />
                                <small className={"text-sm"}>Joined</small>
                            </div>

                            <small className={"text-sm font-bold"}>June 1, 2024</small>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            <div className={"w-full lg:w-[70%]"}>
                Details

            </div>
        </main>
    )
}

// Server Side Component (HTML to be prepared on Server and not Browser)
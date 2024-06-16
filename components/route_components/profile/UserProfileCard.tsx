import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import ImageUploadingAvatar from "@/components/custom/ImageUploadingAvatar";
import Image from "next/image";
import {Divider} from "@nextui-org/react";
import {FaRegUser} from "react-icons/fa";
import {MdMailOutline} from "react-icons/md";
import {IoIdCardOutline} from "react-icons/io5";
import {formatDate} from "@/utils/DateUtil";
import ProfileCardActionButtons from "@/components/route_components/profile/ProfileCardActionButtons";

export default async function UserProfileCard({profileAuth} : {profileAuth: any}) {
    return (
        <Card className={"border-none shadow-none"}>
            <CardHeader className={"flex flex-col gap-4 items-center"}>
                <ImageUploadingAvatar
                    image={profileAuth.profileImage}
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
                        <h4>{profileAuth.blogs}</h4>
                        <small className={"text-muted-foreground"}>Blogs</small>
                    </div>

                    <Divider orientation={"vertical"} className={"h-auto"} />

                    <div className={"flex flex-col gap-1 items-center"}>
                        <h4>{profileAuth.followCount}</h4>
                        <small className={"text-muted-foreground"}>Followers</small>
                    </div>

                    <Divider orientation={"vertical"} className={"h-auto"} />

                    <div className={"flex flex-col gap-1 items-center"}>
                        <h4>0</h4>
                        <small className={"text-muted-foreground"}>Posts</small>
                    </div>
                </div>

                <small className={"text-sm tracking-wide whitespace-pre-line text-center"}>
                    {profileAuth.bio}
                </small>

                <ProfileCardActionButtons profileAuth={profileAuth} />
            </CardContent>

            <CardFooter className={"flex flex-col gap-4 items-center"}>
                <div className={"flex items-center justify-between w-full"}>
                    <div className={"flex gap-1 items-center text-muted-foreground"}>
                        <MdMailOutline />
                        <small className={"text-sm"}>Mail</small>
                    </div>

                    <small className={"text-xs font-normal max-w-[170px] overflow-hidden overflow-ellipsis"}>{profileAuth.email}</small>
                </div>

                <div className={"flex items-center justify-between w-full"}>
                    <div className={"flex gap-1 items-center text-muted-foreground"}>
                        <FaRegUser/>
                        <small className={"text-sm"}>Username</small>
                    </div>

                    <small className={"text-xs font-normal max-w-[160px] overflow-hidden overflow-ellipsis"}>{profileAuth.username ? profileAuth.username : 'NA'}</small>
                </div>

                <Divider />

                <div className={"flex items-center justify-between w-full"}>
                    <div className={"flex gap-1 items-center text-muted-foreground"}>
                        <IoIdCardOutline />
                        <small className={"text-sm"}>Joined</small>
                    </div>

                    <small className={"text-xs font-normal max-w-[160px] overflow-hidden overflow-ellipsis"}>{profileAuth.createdOn ? formatDate(profileAuth.createdOn) : "Login to View"}</small>
                </div>
            </CardFooter>
        </Card>
    )
}
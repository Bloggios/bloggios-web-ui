"use client";

import React, {useCallback} from 'react';
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import LoggedInUserAvatar from "@/components/custom/user/LoggedInUserAvatar";
import Image from "next/image";
import {Button, Divider} from "@nextui-org/react";
import BorderedLogoutButton from "@/components/custom/buttons/BorderedLogoutButton";
import {useQuery} from "@tanstack/react-query";
import {loggedInUserProfile} from "@/rest/UserAuthProviderApplication";
import {Skeleton} from "@/components/ui/skeleton";
import {BiRefresh} from "react-icons/bi";

const HomeProfileCard = () => {

    const {
        isLoading: isProfileLoading,
        error: isProfileError,
        data: profileData,
        isSuccess: isProfileSuccess,
        isError: profileError,
        refetch: profileRefetch
    } = useQuery({
        queryKey: ['user-profile'],
        queryFn: loggedInUserProfile,
        staleTime: 520000
    });

    const getProfileCardData = useCallback(()=> {
        if (isProfileLoading && !isProfileError && !profileData) {
            return <ProfileCardSkeleton />
        } else if (profileData && !isProfileLoading && !isProfileError) {
            return <ProfileCard profileData={profileData} />
        } else if (profileError && !isProfileLoading) {
            return <ProfileCardError />
        } else {
            return <ProfileCardError />
        }
    }, [isProfileError, isProfileLoading, profileData, profileError])

    return (
        <Card className={"w-full h-fit border-none"}>
            {getProfileCardData()}
        </Card>
    );
};

const ProfileCardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 p-3 items-center justify-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex flex-col items-center">
                <Skeleton className="h-4 w-[100px]"/>
                <Skeleton className="h-4 w-[200px]"/>
            </div>
            <Skeleton className="h-[105px] w-full rounded-xl" />
            <Divider />
            <Skeleton className="h-[28px] w-full rounded-l" />
        </div>
    )
};

const ProfileCard = ({profileData} : {profileData: any}) => {
    return (
        <>
            <CardHeader className={"flex flex-col items-center justify-center"}>
                <LoggedInUserAvatar
                    classname={"w-14 h-14"}
                    isBordered={true}
                    image={profileData.profileImage}
                />

                <div className={"flex flex-col gap-0 items-center"}>
                    <div className={"flex items-center mt-4"}>
                        <h2 className={"scroll-m-20 text-lg font-bold tracking-wide lg:text-5x"}>{profileData.name}</h2>
                        <Image
                            src={"/assets/blue_badge.svg"}
                            alt={"Badge"}
                            width={28}
                            height={28}
                            className={""}
                        />
                    </div>
                    <small className={"text-muted-foreground text-sm font-extralight"}>{profileData.profileTag}</small>
                </div>

                {profileData.bio &&
                    <small className={"text-sm text-muted-foreground font-thin text-center mt-4"}>{profileData.bio}</small>}
            </CardHeader>

            <CardBody className={"flex flex-col"}>
                <div className={"flex items-center justify-center"}>
                    <div className={"flex gap-5"}>

                        <div className={"flex flex-col items-center"}>
                            <h4>{profileData.followCount}</h4>
                            <small className={"text-muted-foreground"}>Followers</small>
                        </div>

                        <Divider orientation={"vertical"} className={"h-auto"}/>

                        <div className={"flex flex-col items-center"}>
                            <h4>{profileData.blogs}</h4>
                            <small className={"text-muted-foreground"}>Blogs</small>
                        </div>

                        <Divider orientation={"vertical"} className={"h-auto"}/>

                        <div className={"flex flex-col items-center"}>
                            <h4>{profileData.followingCount}</h4>
                            <small className={"text-muted-foreground"}>Following</small>
                        </div>
                    </div>
                </div>

                <Divider className={"mt-5"}/>

                <div className={"flex flex-col gap-2 my-4 px-2"}>
                    <div className={"flex flex-row justify-between"}>
                        <small className={"font-extralight tracking-wider"}>Profile Views</small>
                        <small className={"text-indigo-400 font-bold"}>NA</small>
                    </div>

                    <div className={"flex flex-row justify-between"}>
                        <small className={"font-extralight tracking-wider"}>Content Impressions</small>
                        <small className={"text-indigo-400 font-bold"}>NA</small>
                    </div>
                </div>

                <Divider/>
            </CardBody>

            <CardFooter>
                <BorderedLogoutButton/>
            </CardFooter>
        </>
    )
}

const ProfileCardError = () => {
    return (
        <div className="flex flex-col gap-2 p-3 items-center justify-center">
            <div className={"flex flex-col gap-1 items-center"}>
                <h4 className={"scroll-m-20 text-xl font-semibold tracking-tight"}>Something went Wrong</h4>
                <small className="text-sm text-muted-foreground">Refresh Page</small>
            </div>
            <Button onClick={()=> window.location.reload()} size={"sm"} isIconOnly={true}>
                <BiRefresh className={"text-lg"}/>
            </Button>
        </div>
    )
}

export default HomeProfileCard;
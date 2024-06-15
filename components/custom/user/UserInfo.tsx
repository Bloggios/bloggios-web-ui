import React from 'react';
import {Avatar} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {getPostedAgoString} from "@/utils/DateUtil";

const UserInfo = ({
                      name,
                      profileImage,
                      date,
                      email,
                      isBadge
                  }: {
    name: string,
    profileImage: any,
    date: Date | string,
    email: string,
    isBadge?: boolean | null
}) => {

    const router = useRouter();

    return (
        <div className={"flex flex-row items-center space-x-3 md:space-x-4 min-w-[280px]"}>
            <Avatar
                src={profileImage}
                showFallback
                isBordered
                className={`cursor-pointer ${isBadge ? "outline-[#4258ff]" : ''}`}
                size={"sm"}
                onClick={() => router.push(`/profile/${email}`)}
            />

            <div className={"flex flex-col gap-0"}>
                <small onClick={() => router.push(`/profile/${email}`)}
                       className={"text-small cursor-pointer"}>{name}</small>
                <small className={"text-muted-foreground"}>{getPostedAgoString(date)}</small>
            </div>
        </div>
    );
};

export default UserInfo;
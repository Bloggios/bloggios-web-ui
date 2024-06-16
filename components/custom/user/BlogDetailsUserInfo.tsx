"use client";

import React from 'react';
import {getPostedAgoString} from "@/utils/DateUtil";
import {Avatar} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useRouter} from "next/navigation";

const BlogDetailsUserInfo = ({data} : {data: any}) => {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    return (
        <div className={"flex flex-row items-center space-x-3 md:space-x-4 min-w-[280px]"}>
            <Avatar
                src={data.profileImage}
                showFallback
                isBordered
                className={"w-10 h-10 md:w-12 md:h-12 cursor-pointer"}
                onClick={()=> router.push(`/${data.email}`)}
            />

            <div className={"flex flex-col gap-0"}>
                <div className={"flex gap-2 items-center"}>
                    <small onClick={()=> router.push(`/${data.email}`)} className={"text-medium md:text-large cursor-pointer"}>{data.name}</small>
                    {isAuthenticated && (
                        <>
                            <small className={"text-medium md:text-large"}>•</small>
                            <small className={"text-sm md:text-medium cursor-pointer text-blue-700 dark:text-blue-500 hover:underline"}>
                                Follow
                            </small>
                        </>
                    )}
                </div>
                <small className={"text-muted-foreground"}>{getPostedAgoString(data.dateCreated)}</small>
            </div>
        </div>
    );
};

export default BlogDetailsUserInfo;
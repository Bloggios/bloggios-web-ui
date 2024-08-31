"use client";

import React from 'react';
import {Avatar} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useRouter} from "next/navigation";

const LoggedInUserAvatar = ({classname, isBordered = false, image} : {classname: string, isBordered: boolean, image: any}) => {

    const {name, username, profileImage} = useSelector((state: RootState) => state.profile);
    const router = useRouter();

    return (
        <Avatar
            src={image ? image : profileImage || ""}
            showFallback
            className={classname}
            isBordered={isBordered}
            onClick={()=> router.push(`/${username}`)}
        />
    );
};

export default LoggedInUserAvatar;
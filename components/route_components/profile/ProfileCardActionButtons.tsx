"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {AiOutlineUserAdd} from "react-icons/ai";
import {BsFillChatSquareDotsFill} from "react-icons/bs";
import {FaShare} from "react-icons/fa";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";

const ProfileCardActionButtons = ({profileAuth}: {profileAuth: any}) => {

    const {isAuthenticated, email} = useSelector((state: RootState)=> state.auth);

    return (
        isAuthenticated && email && email === profileAuth.email ? (
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
        ) : (
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
        )
    );
};

export default ProfileCardActionButtons;
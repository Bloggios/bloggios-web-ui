"use client"

import React from 'react';
import {Button} from "@nextui-org/react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {logoutUser} from "@/rest/AuthProviderApplication";
import {AxiosError} from "axios";
import {dispatchError} from "@/utils/DispatchFunctions";
import {LOGIN_PAGE} from "@/constants/UiPathConstants";
import {deleteCookie} from "cookies-next";

const BorderedLogoutButton = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const logoutUserMutation = useMutation({
        mutationFn: ()=> logoutUser(),
        onSuccess: () => {
            deleteCookie('bloggios-cookie-mgmt-token');
            router.push(LOGIN_PAGE)
        },
        onError: (error: AxiosError) => {
            dispatchError(dispatch, error);
        }
    });

    return (
        <Button onClick={()=> logoutUserMutation.mutate()} className={"w-full"} size={"sm"} variant={"bordered"} color={"danger"}>
            <span>Logout</span>
        </Button>
    );
};

export default BorderedLogoutButton;
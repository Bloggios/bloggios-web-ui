"use client";

import {Button, CircularProgress} from "@nextui-org/react";
import {useMutation} from "@tanstack/react-query";
import {logoutUser} from "@/rest/AuthProviderApplication";
import {dispatchError} from "@/utils/DispatchFunctions";
import {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

export default function LogoutButton() {

    const dispatch = useDispatch();
    const router = useRouter();

    const logoutUserMutation = useMutation({
        mutationFn: ()=> logoutUser(),
        onSuccess: () => {
            router.push("/login")
        },
        onError: (error: AxiosError) => {
            dispatchError(dispatch, error);
        }
    });

    return (
        <Button onClick={()=> logoutUserMutation.mutate()} size={"sm"} color={"primary"}>
            {logoutUserMutation.isPending ? (
                <CircularProgress
                    classNames={{
                        svg: "w-7 h-7",
                        indicator: "stroke-white"
                    }}
                />
            ) : "Logout"}
        </Button>
    )
}
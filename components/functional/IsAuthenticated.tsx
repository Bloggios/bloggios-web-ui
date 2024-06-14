"use client";

import {useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {redirect} from "next/navigation";

export default function IsAuthenticated() {

    const {isAuthenticated, authorities} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if (isAuthenticated && !authorities?.includes('ROLE_DUMMY')) {
            redirect("/");
        } else if (isAuthenticated && authorities?.includes('ROLE_DUMMY')) {
            redirect("/profile-addition-initial");
        }
    }, [dispatch]);

    return (
        <>
        </>
    )
}
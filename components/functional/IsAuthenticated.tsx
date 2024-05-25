"use client";

import {useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {redirect} from "next/navigation";
import {dispatchWarningMessage} from "@/utils/DispatchFunctions";

export default function IsAuthenticated() {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if (isAuthenticated) {
            dispatchWarningMessage(dispatch, "You are already logged in.");
            redirect("/dashboard");
        }
    }, [dispatch]);

    return (
        <>
        </>
    )
}
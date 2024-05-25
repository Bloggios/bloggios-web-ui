"use client";

import * as React from "react";
import {useLayoutEffect, useState} from "react";
import LoaderPage from "@/components/custom/loaders/LoaderPage";
import {refreshToken} from "@/rest/AuthProviderApplication";
import {useDispatch} from "react-redux";
import {clearCredentials, setCredentials} from "@/state/authSlice";

export function RefreshTokenProvider({children}: Readonly<{ children: React.ReactNode }>) {

    const [isChecking, setIsChecking] = useState<boolean>(true);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        let isMounted = true;
        const timeoutId = setTimeout(() => {
            if (isMounted) {
                window.location.reload();
            }
        }, 4000);

        refreshToken()
            .then(async (response) => {
                if (isMounted) {
                    clearTimeout(timeoutId);
                    const authData = {...response, isAuthenticated: true};
                    dispatch(setCredentials(authData));
                    // Check profile added or not
                    setIsChecking(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    clearTimeout(timeoutId);
                    dispatch(clearCredentials());
                    setIsChecking(false);
                }
            });

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, []);

    return isChecking ? <LoaderPage /> : children
}
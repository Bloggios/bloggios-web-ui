"use client";

import * as React from "react";
import {useLayoutEffect, useState} from "react";
import LoaderPage from "@/components/custom/loaders/LoaderPage";
import {refreshToken} from "@/rest/AuthProviderApplication";
import {useDispatch, useSelector} from "react-redux";
import {clearCredentials, setCredentials} from "@/state/authSlice";
// @ts-ignore
import Cookies from 'js-cookie';
import {addUserProfile} from "@/service/UserProviderApplication";
import {RootState} from "@/state/store";
import {redirect, useRouter} from "next/navigation";

export function RefreshTokenProvider({children}: Readonly<{ children: React.ReactNode }>) {

    const [isChecking, setIsChecking] = useState<boolean>(true);
    const {authorities} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

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
                    const authData = {...response.data, isAuthenticated: true};
                    dispatch(setCredentials(authData));
                    Cookies.set(process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME, response.headers[`${process.env.NEXT_PUBLIC_COOKIE_HEADER_NAME}`], {
                        expires: 1,
                    });
                    addUserProfile(dispatch, router, response.data.authorities);
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

    return isChecking ? <LoaderPage/> : children
}
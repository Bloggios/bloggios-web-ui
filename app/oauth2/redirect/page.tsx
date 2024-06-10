"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import axios from "axios";
import {refreshTokenSocial} from "@/rest/AuthProviderApplication";

const OAuthRedirectHandler = () => {

    const ACCESS_TOKEN = 'accessToken';
    const REFRESH_TOKEN = 'refreshToken';

    const router = useRouter();
    const searchParams = useSearchParams()

    const getUrlParameter = (name: string) => {
        return searchParams.get(name);
    };

    const token = getUrlParameter(ACCESS_TOKEN);
    const refreshToken = getUrlParameter(REFRESH_TOKEN);
    const error = getUrlParameter('error');

    useEffect(() => {
        if (token && refreshToken) {
            refreshTokenSocial(token)
                .then(response => {
                    window.location.reload();
                })
        } else {
            router.push('/login');
        }
    }, [token, refreshToken, error, router]);

    return null;
};

export default OAuthRedirectHandler;

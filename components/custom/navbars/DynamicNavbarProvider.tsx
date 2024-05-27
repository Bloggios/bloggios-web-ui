"use client";

import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import AuthenticatedNavbar from "@/components/custom/navbars/AuthenticatedNavbar";
import RootNavbar from "@/components/custom/navbars/RootNavbar";

export default function DynamicNavbarProvider() {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);

    return (
        isAuthenticated ? <AuthenticatedNavbar /> : <RootNavbar />
    )
}
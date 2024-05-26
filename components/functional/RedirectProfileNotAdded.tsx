"use client";

import React, {useLayoutEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {redirect} from "next/navigation";

const RedirectProfileNotAdded: React.FC = () => {

    const {isAuthenticated, authorities} = useSelector((state: RootState) => state.auth);

    useLayoutEffect(()=> {
        if (isAuthenticated && authorities?.includes('ROLE_DUMMY')) {
            redirect("/profile-addition-initial");
        }
    }, [authorities, isAuthenticated])

    return (
        <></>
    );
};

export default RedirectProfileNotAdded;
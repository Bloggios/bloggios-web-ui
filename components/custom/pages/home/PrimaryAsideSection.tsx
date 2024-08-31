"use client";

import React from 'react';
import HomeProfileCard from "@/components/custom/cards/HomeProfileCard";
import HomeUnauthPrimaryCard from "@/components/custom/cards/HomeUnauthPrimaryCard";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";

const PrimaryAsideSection = () => {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);

    return isAuthenticated ? <HomeProfileCard /> : <HomeUnauthPrimaryCard />
};

export default PrimaryAsideSection;
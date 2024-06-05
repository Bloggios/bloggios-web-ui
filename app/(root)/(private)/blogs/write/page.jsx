"use client";

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import LoaderPage from "../../../../../components/custom/loaders/LoaderPage";

const BlogWrite = dynamic(() => import('../../../../../components/custom/forms/BlogWrite'), { ssr: false });

export default function WriteBlogs() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        setIsLoading(false);
    }, [window]);

    if (typeof window !== "undefined") {
        return isLoading ? <LoaderPage /> : <BlogWrite />
    }
}
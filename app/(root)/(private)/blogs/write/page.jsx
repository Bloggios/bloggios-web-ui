"use client";

import dynamic from "next/dynamic";

const BlogWrite = dynamic(() => import('../../../../../components/custom/forms/BlogWrite'), { ssr: false });

export default function WriteBlogs() {

    if (typeof window !== "undefined") {
        return <BlogWrite />
    }
}
"use client";

import React, {useCallback, useState} from "react";
import useBlogsList from "@/hooks/list/useBlogsList";
import useLastIntersectionRef from "@/hooks/useLastIntersectionRef";
import BlogCard from "@/components/custom/cards/BlogCard";
import BlogSkeleton from "@/components/custom/skeletons/BlogSkeleton";
import {MdErrorOutline} from "react-icons/md";
import {Button as ShadButton} from "@/components/ui/button";
import {BiRefresh} from "react-icons/bi";
import {useRouter} from "next/navigation";

export default function BlogsList() {

    const [pageNum, setPageNum] = useState(0);
    const {
        isLoading,
        isError,
        error,
        data,
        hasNextPage
    } = useBlogsList(pageNum, null, null);
    const lastBlogRef = useLastIntersectionRef({isLoading, hasNextPage, setPageNum});
    const router = useRouter();

    const postData = data.map((post: any, i: number) => {
        if (data.length === i + 1) {
            return (
                <BlogCard data={post} key={post.blogId} className={`animate-slidein opacity-0`} ref={lastBlogRef}/>
            )
        }
        return (
            <BlogCard data={post} className={`animate-slidein opacity-0`} key={post.blogId}/>
        )
    })

    const getPostListData = useCallback(() => {
        if (isLoading && (!data || data?.length === 0)) {
            return (
                <div className={"flex flex-col space-y-6"}>
                    {[...Array(6)].map((_, index) => (
                    <BlogSkeleton key={index}/>
                    ))}
                </div>
            )
        } else if (isError && !isLoading && (!data || data?.length === 0)) {
            return (
                <div className={"flex flex-col space-y-4 items-center justify-center py-10"}>
                    <MdErrorOutline className={"text-6xl"}/>
                    <h1 className={"text-2xl md:text-3xl tracking-wide"}>Something went wrong</h1>
                    <p className={"font-light tracking-wider"}>
                        Please try again after some time
                    </p>
                    <ShadButton size={"icon"} variant={"outline"} onClick={() => window.location.reload()}>
                        <BiRefresh className={"text-xl"}/>
                    </ShadButton>
                </div>
            )
        } else if (data && data.length > 0) {
            return (
                <>
                    {postData}
                    {isLoading && data.length > 0 && <BlogSkeleton />}
                </>
            )
        }
    }, [data, isError, isLoading, postData])

    return (
        <div className={"flex flex-col gap-4 mb-10"}>
            {getPostListData()}
        </div>
    )
}
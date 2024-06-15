import React from 'react';
import {Avatar, Button} from "@nextui-org/react";
import BlogDetailsUserInfo from "@/components/custom/user/BlogDetailsUserInfo";
import BlogActionButton from "@/components/custom/blog/BlogActionButton";
import BlogTopics from "@/components/custom/blog/BlogTopics";
import FollowButton from "@/components/custom/buttons/FollowButton";
import {AiOutlineMessage} from "react-icons/ai";
import Image from "next/image";

const BlogDetails = ({data}: { data: any }) => {

    return (
        <div className={"relative mt-2 md:mt-6 flex flex-col gap-10"}>

            {data.coverImage && (
                <div className={"w-full"}>
                    <Image
                        src={data.coverImage}
                        alt={data.title}
                        className={"h-auto w-full object-cover rounded-xl"}
                        width={0}
                        height={0}
                        sizes={"100vw"}
                    />
                </div>
            )}

            <div className={"flex flex-col space-y-2"}>
                <h1 className={"scroll-m-20 text-4xl font-medium tracking-wide lg:text-5xl"}>
                    {data.title}
                </h1>
                <p className={"text-xl text-muted-foreground"}>
                    {data.chapterName}
                </p>
            </div>

            <BlogDetailsUserInfo data={data}/>

            <BlogActionButton data={data} />

            <div dangerouslySetInnerHTML={{__html: data.detailsHtml}}/>

            <BlogTopics className={"pt-10"} topics={data.topics}/>

            <BlogActionButton data={data} isDividerShown={false}/>

            <div className={"flex flex-col mt-10 md:mt-20 gap-4"}>
                <div className={"flex items-center justify-between"}>
                    <Avatar
                        src={data.profileImage}
                        showFallback={true}
                        className={"w-14 h-14"}
                    />
                    <div className={"flex md:hidden items-center gap-2"}>
                        <FollowButton size={"sm"} variant={"fade"}/>
                        <Button
                            isIconOnly={true}
                            size={"sm"}
                            className={"flex items-center justify-center text-xl"}
                            variant={"faded"}
                        >
                            <AiOutlineMessage/>
                        </Button>
                    </div>
                </div>
                <div className={"flex items-center justify-between"}>
                    <h4 className={"text-xl md:text-2xl tracking-wide max-w-[400px] overflow-hidden overflow-ellipsis text-nowrap"}>Authored
                        By {data.name}</h4>
                    <div className={"hidden md:flex items-center gap-2"}>
                        <FollowButton size={"sm"} variant={"fade"}/>
                        <Button
                            isIconOnly={true}
                            size={"sm"}
                            className={"flex items-center justify-center text-xl"}
                            variant={"faded"}
                        >
                            <AiOutlineMessage/>
                        </Button>
                    </div>
                </div>
                <small className={"text-large text-muted-foreground"}>
                    {data.profileTag}
                </small>
            </div>
        </div>
    );
};

export default BlogDetails;
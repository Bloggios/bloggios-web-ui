import React from 'react';
import {Button, Divider} from "@nextui-org/react";
import {SlOptions} from "react-icons/sl";
import {AiOutlineLike} from "react-icons/ai";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import {GoBookmark} from "react-icons/go";
import {IoShareOutline} from "react-icons/io5";

const BlogActionButton = ({isDividerShown = true}: { isDividerShown?: boolean }) => {
    return (
        <div className={"flex flex-col space-y-2"}>
            {isDividerShown && <Divider className={"w-[90%] self-center"}/>}
            <div className={"flex items-center justify-between md:px-6"}>
                <div className={"flex items-center gap-2"}>
                    <div className={"flex items-center"}>
                        <small className={"text-sm"}>
                            10
                        </small>
                        <Button
                            isIconOnly={true}
                            variant={"light"}
                            size={"sm"}
                            className={"text-xl"}
                        >
                            <AiOutlineLike/>
                        </Button>
                    </div>

                    <Divider orientation={"vertical"} className={"h-6"}/>

                    <div className={"flex items-center"}>
                        <small className={"text-sm"}>
                            10
                        </small>
                        <Button
                            isIconOnly={true}
                            variant={"light"}
                            size={"sm"}
                            className={"text-xl"}
                        >
                            <HiOutlineChatBubbleOvalLeftEllipsis/>
                        </Button>
                    </div>
                </div>

                <div className={"flex items-center gap-2"}>
                    <Button
                        isIconOnly={true}
                        variant={"light"}
                        size={"sm"}
                        className={"text-xl"}
                    >
                        <GoBookmark/>
                    </Button>
                    <Button
                        isIconOnly={true}
                        variant={"light"}
                        size={"sm"}
                        className={"text-xl"}
                    >
                        <IoShareOutline/>
                    </Button>

                    <Button
                        isIconOnly={true}
                        variant={"light"}
                        size={"sm"}
                        className={"text-xl"}
                    >
                        <SlOptions/>
                    </Button>

                </div>
            </div>
            {isDividerShown && <Divider className={"w-[90%] self-center"}/>}
        </div>
    );
};

export default BlogActionButton;
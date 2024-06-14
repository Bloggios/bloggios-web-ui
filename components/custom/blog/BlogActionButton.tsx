"use client";

import React from 'react';
import {
    Button,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from "@nextui-org/react";
import {SlOptions} from "react-icons/sl";
import {AiOutlineLike} from "react-icons/ai";
import {GoBookmark} from "react-icons/go";
import {IoShareOutline} from "react-icons/io5";
import {IoIosLink} from "react-icons/io";
import {FaXTwitter} from "react-icons/fa6";
import {FaInstagram, FaLinkedin} from "react-icons/fa";
import BlogCommentDrawer from "@/components/custom/drawers/BlogCommentDrawer";
import BlogCommentMobileDrawer from "@/components/custom/drawers/BlogCommentMobileDrawer";
import useMediaQuery from "@/hooks/useMediaQuery";

const BlogActionButton = ({data, isDividerShown = true}: { data: any, isDividerShown?: boolean }) => {

    const breakPoint = useMediaQuery(640);

    return (
        <div className={"flex flex-col space-y-2"}>
            {isDividerShown && <Divider className={"w-[90%] self-center"}/>}
            <div className={"flex items-center justify-between md:px-6"}>
                <div className={"flex items-center gap-2"}>
                    <div className={"flex items-center gap-1"}>
                        <small className={"text-sm"}>
                            10
                        </small>
                        <AiOutlineLike className={"text-xl"}/>
                    </div>

                    <Divider orientation={"vertical"} className={"h-6"}/>

                    <div className={"flex items-center gap-1"}>
                        <small className={"text-sm"}>
                            10
                        </small>
                        {breakPoint ? <BlogCommentMobileDrawer/> : <BlogCommentDrawer data={data}/>}
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

                    <Dropdown
                        showArrow
                        radius="sm"
                        backdrop={"opaque"}
                        placement={"left"}
                        classNames={{
                            base: "before:bg-default-200", // change arrow background
                            content: "p-0 border-small border-divider bg-background",
                        }}
                    >
                        <DropdownTrigger>
                            <Button
                                isIconOnly={true}
                                variant={"light"}
                                size={"sm"}
                                className={"text-xl"}
                            >
                                <IoShareOutline/>
                            </Button>
                        </DropdownTrigger>

                        <DropdownMenu
                            aria-label={"user-actions"}
                            variant={"flat"}
                            className={"max-w-[260px] h-auto w-full pt-2"}
                            itemClasses={{
                                base: [
                                    "rounded-md",
                                    "text-default-500",
                                    "transition-opacity",
                                    "data-[hover=true]:text-foreground",
                                    "data-[hover=true]:bg-default-100",
                                    "dark:data-[hover=true]:bg-default-50",
                                    "data-[selectable=true]:focus:bg-default-50",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[focus-visible=true]:ring-default-500",
                                ],
                            }}
                        >

                            <DropdownSection showDivider>
                                <DropdownItem>
                                    <div className={"flex items-center gap-2"}>
                                        <IoIosLink/>
                                        <span>Copy Link</span>
                                    </div>
                                </DropdownItem>
                            </DropdownSection>

                            <DropdownSection className={"w-full"}>
                                <DropdownItem>
                                    <div className={"flex items-center gap-2"}>
                                        <FaLinkedin/>
                                        <span>Share on LinkedIn</span>
                                    </div>
                                </DropdownItem>

                                <DropdownItem>
                                    <div className={"flex items-center gap-2"}>
                                        <FaXTwitter/>
                                        <span>Share on X</span>
                                    </div>
                                </DropdownItem>

                                <DropdownItem>
                                    <div className={"flex items-center gap-2"}>
                                        <FaInstagram/>
                                        <span>Share on Instagram</span>
                                    </div>
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>

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
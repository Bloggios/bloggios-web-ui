import React from 'react';
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import { FaEdit } from 'react-icons/fa'; 
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import BlogCommentField from "@/components/custom/blog/BlogCommentField";
import { AiOutlineLike } from 'react-icons/ai';

const BlogCommentDrawer = ({data}: { data: any }) => {

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["relevant"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <Sheet>
            <SheetTrigger asChild>
                <HiOutlineChatBubbleOvalLeftEllipsis className={"text-xl"}/>
            </SheetTrigger>
            <SheetContent side={"right"} className={"min-w-[440px] p-2"}>
                <SheetHeader className={"p-4"}>
                    <SheetTitle className={"text-2xl"}>Discussions</SheetTitle>
                </SheetHeader>
                <BlogCommentField />
                <SheetFooter>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize"
                            >
                                {selectedValue}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="comment-type"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={(e) => console.log(e)}
                        >
                            <DropdownItem key="relevant">Relevant</DropdownItem>
                            <DropdownItem key="recent">Recent</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </SheetFooter>
                <Card>
                <CardHeader className={"p-3"}>
                                <div className={"flex items-center gap-2 "}>
                                    <Avatar
                                        src={profileImage ? profileImage : ""}
                                        showFallback={true}
                                        size={"md"}
                                    />

                                <div className={"flex flex-col"}>
                                    <span>Atharva</span>
                                    <small className='text-xs text-muted-foreground'>2 months ago</small>
                                </div>
                                </div>
                                
                                <div className='flex flex-col mt-2 gap-2 custom-align'>
                                <span>yes you are right!!!!
                                commit can  also be done from terminal and from diffrent IDE.</span>
                                <div className='flex gap-2 items-center'>
                                    <Button isIconOnly size='sm' variant='light'>
                                        <AiOutlineLike className='text-xl'/>
                                    </Button>
                                    <Button isIconOnly size='sm' variant='light'>
                                        <HiOutlineChatBubbleOvalLeftEllipsis className='text-xl'/>
                                        <span className='text-sm'>52</span>
                                    </Button>

                                    <Button size='lg'variant='light' className='pt-0.5 pb-2 px-4 mt-1'>Reply</Button>
                                </div>
                                

                                </div>
                        <Button
                            isIconOnly={true}
                            variant={"light"}
                            size={"sm"}
                            className={"text-xl"}
                        >
                        </Button>
                            </CardHeader>
                </Card>
            </SheetContent>
        </Sheet>
    );
};

export default BlogCommentDrawer;
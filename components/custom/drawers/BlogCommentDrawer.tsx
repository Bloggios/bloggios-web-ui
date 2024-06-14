import React from 'react';
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import BlogCommentField from "@/components/custom/blog/BlogCommentField";

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
            </SheetContent>
        </Sheet>
    );
};

export default BlogCommentDrawer;
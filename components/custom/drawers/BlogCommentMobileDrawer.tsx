import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import {Button} from "@/components/ui/button";
import BlogCommentField from "@/components/custom/blog/BlogCommentField";

const BlogCommentMobileDrawer = () => {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <HiOutlineChatBubbleOvalLeftEllipsis className={"text-xl"}/>
            </DrawerTrigger>
            <DrawerContent className={"outline-none w-full"}>
                <div className="mx-auto w-full">
                    <DrawerHeader>
                        <DrawerTitle className={"text-xl"}>
                            Discussions
                        </DrawerTitle>

                        <DrawerDescription>
                            <BlogCommentField />
                        </DrawerDescription>
                    </DrawerHeader>
                    <div>
                        Drawer
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default BlogCommentMobileDrawer;
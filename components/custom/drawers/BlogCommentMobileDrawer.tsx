import React from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import BlogCommentField from "@/components/custom/blog/BlogCommentField";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import BlogCommentsList from "@/components/custom/blog/BlogCommentsList";

const BlogCommentMobileDrawer = ({data}: {data: any}) => {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <HiOutlineChatBubbleOvalLeftEllipsis className={"text-xl"}/>
            </DrawerTrigger>
            <DrawerContent className={"outline-none w-full max-h-full"} >
                <div className="mx-auto w-full" style={{
                    overflowY: "auto"
                }}>
                    <DrawerHeader>
                        <DrawerTitle className={"text-xl"}>
                            Discussions
                        </DrawerTitle>

                        <DrawerDescription>
                            {isAuthenticated && <BlogCommentField />}
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <BlogCommentsList />
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default BlogCommentMobileDrawer;
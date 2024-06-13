import React from 'react';
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";

const BlogCommentDrawer = ({data}: { data: any }) => {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const {name, profileImage} = useSelector((state: RootState) => state.profile);
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["relevant"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    isIconOnly={true}
                    variant={"light"}
                    size={"sm"}
                    className={"text-xl"}
                >
                    <HiOutlineChatBubbleOvalLeftEllipsis/>
                </Button>
            </SheetTrigger>
            <SheetContent side={"right"} className={"w-[500px] p-2"}>
                <SheetHeader className={"p-4"}>
                    <SheetTitle className={"text-2xl"}>Discussions</SheetTitle>
                </SheetHeader>
                <div className={"flex flex-col my-6"}>
                    {isAuthenticated && (
                        <Card>
                            <CardHeader className={"p-3"}>
                                <div className={"flex items-center gap-2"}>
                                    <Avatar
                                        src={profileImage ? profileImage : ""}
                                        showFallback={true}
                                        size={"md"}
                                    />
                                    <span>{name}</span>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <textarea
                                    className={"border-none outline-none bg-transparent w-full resize-none"}
                                    rows={4}
                                    placeholder={"Any thoughts ?"}
                                />
                            </CardContent>

                            <CardFooter className={"flex justify-end py-3"}>
                                <Button color={"primary"} size={"sm"}>
                                    Send
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
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
                            onSelectionChange={(e)=> console.log(e)}
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
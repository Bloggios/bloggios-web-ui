import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Avatar, Button} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";

const BlogCommentField = () => {

    const {isAuthenticated} = useSelector((state: RootState) => state.auth);
    const {name, profileImage} = useSelector((state: RootState) => state.profile);

    return (
        <div className={"flex flex-col my-6"}>
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
        </div>
    );
};

export default BlogCommentField;
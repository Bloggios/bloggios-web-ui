import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import UserInfo from "@/components/custom/user/UserInfo";
import {AiOutlineLike} from "react-icons/ai";
import {Divider} from "@nextui-org/react";
import React from "react";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import {Button as ShadButton} from "@/components/ui/button";

const CommentCard = () => {
    return (
        <Card classNames={{
            base: "w-full"
        }}>
            <CardHeader>
                <UserInfo
                    name={"Rohit Parihar"}
                    profileImage={""}
                    date={"2024-06-10T18:02:22.791+00:00"}
                    email={"rohit@bloggios.com"}
                />
            </CardHeader>

            <CardBody>
                <p className={"font-light text-sm leading-6 tracking-wide text-justify"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae inventore minus odio quia quo repellat repudiandae suscipit. Beatae, doloribus iste perferendis quia similique voluptas! Accusamus ad amet architecto asperiores, autem cum dicta distinctio eos fugit impedit itaque libero minima mollitia nobis nostrum nulla omnis optio quia recusandae sint totam ullam!
                </p>
            </CardBody>

            <CardFooter className={"flex flex-row items-center justify-between pt-0"}>
                <div className={"flex items-center gap-2"}>
                    <div className={"flex items-center gap-1"}>
                        <small className={"text-sm"}>
                            10
                        </small>
                        <AiOutlineLike className={"text-xl cursor-pointer"}/>
                    </div>

                    <Divider orientation={"vertical"} className={"h-6"}/>

                    <div className={"flex items-center gap-1"}>
                        <small className={"text-sm"}>
                            10
                        </small>
                        <HiOutlineChatBubbleOvalLeftEllipsis className={"text-xl cursor-pointer"}/>
                    </div>
                </div>

                <div>
                    <ShadButton variant={"link"} size={"default"} className={"px-2"}>
                        Reply
                    </ShadButton>
                </div>
            </CardFooter>
        </Card>
    );
};

export default CommentCard;
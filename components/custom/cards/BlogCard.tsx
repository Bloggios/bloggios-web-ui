import React from 'react';
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {User} from "@nextui-org/user";
import {Chip} from "@nextui-org/chip";
import {Button, Divider} from "@nextui-org/react";
import {chipColors} from "@/constants/ServiceConstants";
import {getPostedAgoString} from "@/utils/DateUtil";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {handlePropagationClick} from "@/utils/PropagationFunctions";
import {AiOutlineLike} from "react-icons/ai";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import {GoBookmark} from "react-icons/go";
import {IoShareOutline} from "react-icons/io5";
import {SlOptions} from "react-icons/sl";

const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>((props: BlogCardProps, ref) => {

    const router = useRouter();

    const blogCard = () => {
        return (
            <Card className={"w-full"}>

                {props.data.coverImage && (
                    <CardHeader className={"p-0 w-full relative"}>
                        <Image
                            src={props.data.coverImage}
                            alt={"Bloggios"}
                            className={"h-auto w-full object-cover"}
                            width={0}
                            height={0}
                            sizes={"100vw"}
                        />
                    </CardHeader>
                )}
                <CardBody className={"flex flex-col justify-start items-start md:px-7 md:py-4 cursor-pointer"}
                          onClick={() => router.push(`/blog/${props.data.blogId}`)}>
                    <User
                        name={props.data.name}
                        description={getPostedAgoString(props.data.dateCreated)}
                        avatarProps={{
                            src: props.data.profileImage,
                            showFallback: true,
                            name: "",
                            isBordered: true
                        }}
                        onClick={(event) => handlePropagationClick(event, () => router.push(`/${props.data.email}`))}
                        classNames={{
                            name: "hover:underline cursor-pointer"
                        }}
                    />

                    <div className={"flex flex-col gap-2 lg:pl-12 mt-4 w-full"}>
                        <h1 className={"text-xl md:text-2xl lg:text-4xl tracking-wide"}>
                            {props.data.title}
                        </h1>

                        <div className={"flex gap-2 flex-wrap"}>
                            {props.data.topics && props.data.topics.map((tag: any, index: number) => {
                                const colorIndex = index % 4;
                                const color = chipColors[colorIndex];

                                return (
                                    <Chip
                                        key={index}
                                        onClick={(event) => handlePropagationClick(event, () => router.push(`/blog/topic/${tag.topic}`))}
                                        variant="flat"
                                        style={{backgroundColor: color}} // Apply the color to the chip
                                        classNames={{
                                            base: `${color} cursor-pointer`,
                                            content: "drop-shadow text-white"
                                        }}
                                    >
                                        {tag.topic}
                                    </Chip>
                                );
                            })}
                        </div>
                    </div>

                </CardBody>

                <CardFooter className={"w-full flex flex-row items-center justify-between px-4 md:px-20"}>
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
                </CardFooter>
            </Card>
        )
    }

    return ref ? (
        <div className={props.className} ref={ref}>{blogCard()}</div>
    ) : (
        <div className={props.className}>{blogCard()}</div>
    )
});

BlogCard.displayName = "BlogCard";

export default BlogCard;
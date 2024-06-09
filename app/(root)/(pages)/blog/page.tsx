import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {User} from "@nextui-org/user";
import {Chip} from "@nextui-org/chip";
import {FaRegCommentDots, FaRegHeart} from "react-icons/fa";
import {Button} from "@nextui-org/react";

export default function DashboardPage() {

    const selectedTags = ["Java", "Spring Boot", "Microservices", "JWT"];
    const chipColors = ['bg-purple-700', 'bg-red-700', 'bg-amber-700', 'bg-blue-700'];

    return (
        <main className={"max-w-screen-xl container flex h-auto flex-row gap-2 w-full mt-4 md:mt-10"}>
            <main className={"w-full md:w-[70%]"}>
                <Card className={"w-full animate-slidein opacity-0"}>
                    <CardHeader className={"p-0"}>
                        <img
                            src={"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt={"Bloggios"}
                            className={"w-full h-[250px] object-cover"}
                        />
                    </CardHeader>
                    <CardBody className={"flex flex-col justify-start items-start md:px-7 md:py-4"}>
                        <User
                            name="Rohit Parihar"
                            description="Just Now"
                            avatarProps={{
                                src: "",
                                showFallback: true,
                                name: ""
                            }}
                        />

                        <div className={"flex flex-col gap-2 lg:pl-12 mt-4 w-full"}>
                            <h1 className={"text-xl md:text-2xl lg:text-4xl tracking-wide"}>Introduction to Spring Boot 3.4</h1>

                            <div className={"flex gap-2 flex-wrap"}>
                                {selectedTags.map((tag, index) => {
                                    // Determine the color based on the index
                                    const colorIndex = index % 4;
                                    const color = chipColors[colorIndex];

                                    return (
                                        <Chip
                                            key={index}
                                            variant="flat"
                                            style={{backgroundColor: color}} // Apply the color to the chip
                                            classNames={{
                                                base: `${color}`,
                                                content: "drop-shadow text-white"
                                            }}
                                        >
                                            {tag}
                                        </Chip>
                                    );
                                })}
                            </div>

                            <div className={"flex items-center justify-between w-full"}>
                                <div className={"flex gap-4"}>
                                    <Button
                                        isIconOnly
                                        variant={"light"}
                                        className={"text-xl"}
                                    >
                                        <FaRegHeart />
                                    </Button>

                                    <Button
                                        variant={"light"}
                                    >
                                        <FaRegCommentDots className={"text-2xl"} /> <span className={"pl-2 text-sm"}>14</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </main>
            <aside className={"hidden md:flex md:w-[30%]"}>
                Aside Section
            </aside>
        </main>
    )
}
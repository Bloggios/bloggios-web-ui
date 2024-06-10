"use client";

import React from 'react';
import {chipColors} from "@/constants/ServiceConstants";
import {Chip} from "@nextui-org/chip";
import {handlePropagationClick} from "@/utils/PropagationFunctions";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

const BlogTopics = ({topics, className}: {topics: any, className?: string | undefined}) => {

    const router = useRouter();

    return (
        <div className={cn("flex gap-2 flex-wrap", className)}>
            {topics && topics.map((tag: any, index: number) => {
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
    );
};

export default BlogTopics;
import React from 'react';
import {Card} from "@nextui-org/card";
import {Skeleton} from "@/components/ui/skeleton";

const BlogSkeleton = () => {
    return (
        <Card className={"w-full flex flex-col space-y-4 p-4"} radius="lg">
            <Skeleton className="h-[160px] rounded-xl"/>
            <div className="flex space-x-2 items-center">
                <Skeleton className={"rounded-full h-16 w-16"} />
                <div className={"space-y-2 flex flex-col"}>
                    <Skeleton className="h-4 w-[250px]"/>
                    <Skeleton className="h-4 w-[200px]"/>
                </div>
            </div>

            <div className={"flex flex-col space-y-2"}>
                <Skeleton className="h-[25px] w-[80%] rounded-xl"/>
                <Skeleton className="h-[20px] w-[60%] rounded-xl"/>
            </div>
        </Card>
    );
};

export default BlogSkeleton;
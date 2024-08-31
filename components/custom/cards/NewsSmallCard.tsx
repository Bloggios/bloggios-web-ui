import React from 'react';
import {Tooltip} from "@nextui-org/react";

const NewsSmallCard = ({
                           id,
                           title,
                           posted
                       }: {
    id: string | number,
    title: string,
    posted: string
}) => {
    return (
        <Tooltip
            placement={"left"}
            delay={500}
            closeDelay={0}
            color={"foreground"}
            showArrow={true}
            content={
                <div className="px-1 py-2 w-[250px] flex flex-col gap-1">
                    <small className={"text-sm overflow-hidden text-ellipsis"}>{title}</small>
                    <small className={"text-muted-foreground"}>Posted : {posted}</small>
                </div>
            }
        >
            <div className={"flex flex-col gap-1 w-full cursor-pointer p-1 hover:bg-foreground-100 rounded-md"}>
                <small className={"text-sm text-nowrap overflow-hidden text-ellipsis"}>{title}</small>
                <small className={"text-muted-foreground"}>Posted : {posted}</small>
            </div>
        </Tooltip>
    );
};

export default NewsSmallCard;
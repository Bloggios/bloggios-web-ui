import React, {useCallback} from 'react';
import {useQuery} from "@tanstack/react-query";
import {loggedInUserProfile} from "@/rest/UserAuthProviderApplication";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Button, Divider} from "@nextui-org/react";
import LoggedInUserAvatar from "@/components/custom/user/LoggedInUserAvatar";
import Image from "next/image";
import BorderedLogoutButton from "@/components/custom/buttons/BorderedLogoutButton";
import {BiRefresh} from "react-icons/bi";
import NewsSmallCard from "@/components/custom/cards/NewsSmallCard";

const newsList = [
    {
        "id": 1,
        "title": "Tech Giants Embrace AI: Companies Ramp Up Investments in Artificial Intelligence to Revolutionize Industries",
        "posted": "10h ago"
    },
    {
        "id": 2,
        "title": "Climate Crisis Intensifies: Record-Breaking Heatwaves and Floods Displace Millions Globally, Urging Immediate Action",
        "posted": "5h ago"
    },
    {
        "id": 3,
        "title": "Economic Uncertainty: Global Markets Tumble Amid Rising Inflation and Interest Rate Hikes",
        "posted": "8h ago"
    },
    {
        "id": 4,
        "title": "Groundbreaking Medical Discovery: New Cancer Treatment Shows Promising Results in Early Trials",
        "posted": "1d ago"
    },
    {
        "id": 5,
        "title": "Innovations in Renewable Energy: Solar and Wind Power Set to Surpass Fossil Fuels by 2030",
        "posted": "2h ago"
    },
    {
        "id": 6,
        "title": "Data Privacy Concerns Rise: Governments and Tech Companies Clash Over Encryption and User Data Access",
        "posted": "3h ago"
    },
    {
        "id": 7,
        "title": "Space Exploration Milestone: Private Company Successfully Launches First Commercial Space Station",
        "posted": "12h ago"
    },
    {
        "id": 8,
        "title": "Digital Nomad Trend Grows: Remote Work Revolution Drives Demand for Flexible Living and Co-Working Spaces Worldwide",
        "posted": "7h ago"
    },
    {
        "id": 9,
        "title": "Global Chip Shortage Persists: Automakers and Tech Firms Struggle to Meet Demand as Supply Chain Issues Continue",
        "posted": "15m ago"
    },
    {
        "id": 10,
        "title": "Breakthrough in Quantum Computing: Scientists Achieve New Levels of Speed and Accuracy, Opening Doors to Unprecedented Capabilities",
        "posted": "4h ago"
    }
];

const NewsAsideSection = () => {

    return (
        <Card className={"w-full h-fit border-none"}>
            <NewsCard />
        </Card>
    );
};

const NewsAsideSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 p-3 items-center justify-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex flex-col items-center">
                <Skeleton className="h-4 w-[100px]"/>
                <Skeleton className="h-4 w-[200px]"/>
            </div>
            <Skeleton className="h-[105px] w-full rounded-xl" />
            <Divider />
            <Skeleton className="h-[28px] w-full rounded-l" />
        </div>
    )
};

const NewsCard = () => {
    return (
        <>
            <CardHeader>
                <h4 className={"scroll-m-20 text-xl font-semibold tracking-wide"}>
                    Bloggios Stories
                </h4>
            </CardHeader>

            <CardBody className={"flex flex-col gap-2"}>
                {newsList.map((item) => (
                    <>
                        <NewsSmallCard
                            id={item.id}
                            title={item.title}
                            posted={item.posted}
                        />
                    </>
                ))}
            </CardBody>
        </>
    )
}

const NewAsideError = () => {
    return (
        <div className="flex flex-col gap-2 p-3 items-center justify-center">
            <div className={"flex flex-col gap-1 items-center"}>
                <h4 className={"scroll-m-20 text-xl font-semibold tracking-tight"}>Something went Wrong</h4>
                <small className="text-sm text-muted-foreground">Refresh Page</small>
            </div>
            <Button onClick={()=> window.location.reload()} size={"sm"} isIconOnly={true}>
                <BiRefresh className={"text-lg"}/>
            </Button>
        </div>
    )
}

export default NewsAsideSection;
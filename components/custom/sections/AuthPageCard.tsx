import {ReactNode} from "react";
import BloggiosLogo from "@/components/custom/BloggiosLogo";
import Image from "next/image";
import Link from "next/link";

const detailsList = [
    {
        id: 1,
        label: "Effortless Knowledge Exchange",
        description: "Enable seamless knowledge sharing through intuitive Q&A forums and interactive blogs."
    },
    {
        id: 2,
        label: "Create and Share Content",
        description: "Effortlessly write and publish blogs to share your knowledge and insights with the world."
    },
    {
        id: 3,
        label: "Get Answers Fast",
        description: "Engage in dynamic Q&A sessions, find answers to your questions, and contribute your expertise to help others."
    },
    {
        id: 4,
        label: "Initiate and Participate in Events",
        description: "Organize and join events to foster collaboration and community engagement"
    }
]

export default function AuthPageCard() {
    return (
        <div className={"auth-w-clamp flex flex-col gap-10"}>
            <div className={"flex gap-2 items-center"}>
                <Link href={"/"} >
                    <Image
                        src={"/assets/bg-accent_rounded.svg"}
                        alt={"Bloggios"}
                        width={60}
                        height={60}
                    />
                </Link>

                <h2 className={"scroll-m-20 text-4xl font-semibold lg:text-5xl text-blue-50 tracking-wide"}>
                    Bloggios
                </h2>
            </div>

            <div className={"flex flex-col gap-7"}>
                {detailsList.map((item) => (
                    <div key={item.id} className={"w-[95%] flex flex-row gap-4 text-white"}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="w-6 shrink-0 mt-1">
                            <rect width="24" height="24" rx="12" fill="white"></rect>
                            <path d="M17.3346 8.66797L10.0013 16.0013L6.66797 12.668" stroke="#6c47ff" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>

                        <div>
                            <h2 className={"scroll-m-20 text-xl mb-1 font-medium tracking-wide"}>{item.label}</h2>
                            <span
                                className={"text-sm leading-7 [&:not(:first-child)]:mt-6 font-extralight text-muted"}>
                        {item.description}
                    </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
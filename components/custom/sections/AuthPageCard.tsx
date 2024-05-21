import {ReactNode} from "react";
import BloggiosLogo from "@/components/custom/BloggiosLogo";
import Image from "next/image";

export default function AuthPageCard() {
    return (
        <div className={"auth-w-clamp flex flex-col gap-10"}>
            <div className={"flex gap-2 items-center"}>
                <Image
                    src={"/assets/bg-accent_rounded.svg"}
                    alt={"Bloggios"}
                    width={60}
                    height={60}
                />

                <h2 className={"scroll-m-20 text-4xl font-semibold lg:text-5xl text-blue-50 tracking-wide"}>
                    Bloggios
                </h2>
            </div>

            <div className={"mb-7 w-[95%] flex flex-row gap-4 text-white"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     className="w-6 shrink-0 mt-1">
                    <rect width="24" height="24" rx="12" fill="white"></rect>
                    <path d="M17.3346 8.66797L10.0013 16.0013L6.66797 12.668" stroke="#6c47ff" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>

                <div>
                    <h2 className={"scroll-m-20 text-xl mb-2 font-medium tracking-wide"}>Effortless Knowledge Exchange</h2>
                    <span className={"text-base leading-7 [&:not(:first-child)]:mt-6 font-extralight text-muted"}>
                        Enable seamless knowledge sharing through intuitive Q&A forums and interactive blogs.
                    </span>
                </div>
            </div>
        </div>
    )
}
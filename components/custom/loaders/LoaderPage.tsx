import Image from "next/image";

export default function LoaderPage() {
    return (
        <div className={"min-w-full min-h-screen flex items-center justify-center"}>
            <Image
                className={"animate-pulse duration-two-seconds"}
                src={"/assets/bg_accent_outer_rounded.svg"}
                alt={"Bloggios"}
                width={70}
                height={70}
            />
        </div>
    )
}
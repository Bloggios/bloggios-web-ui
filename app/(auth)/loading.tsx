import {Spinner} from "@nextui-org/react";

export default function Loading() {
    return (
        <div className={"flex auth-w-clamp md:w-[400px] h-full items-center justify-center"}>
            <Spinner />
        </div>
    )
}
"use client";

import {FaPlus} from "react-icons/fa";
import {Button} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {useCallback} from "react";

export default function DynamicNavbarButton() {

    const pathname = usePathname();
    const router = useRouter();

    const getButton = useCallback(()=> {
        if (pathname === '/blog') {
            return (
                <Button
                    variant={"light"}
                    size={"sm"}
                    className={"flex items-center justify-center gap-1 text-sm"}
                    onClick={()=> router.push("/blog/write")}
                >
                    Write <FaPlus className={"text-small"} />
                </Button>
            )
        } else {
            return <></>
        }
    }, [pathname])

    return getButton();
}
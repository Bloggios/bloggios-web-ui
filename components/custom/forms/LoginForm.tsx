"use client";

import {Button, Input} from "@nextui-org/react";
import Link from "next/link";

export default function LoginForm() {
    return (
        <form className={"flex flex-col gap-6"}>
            <Input
                isClearable
                type="email"
                variant={"bordered"}
                label="Email"
                maxLength={40}
                required
            />

            <div className={"flex flex-col gap-2"}>
                <Input
                    isClearable
                    type="password"
                    variant={"bordered"}
                    label="Password"
                    maxLength={40}
                    required
                />
                <Link href={"/"} className={"text-xs hover:underline self-end pr-2"}>
                    Forget Password
                </Link>
            </div>

            <Button color={"primary"}>
                Login
            </Button>
        </form>
    )
}
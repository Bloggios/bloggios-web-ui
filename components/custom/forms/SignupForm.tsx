import {Button, Input} from "@nextui-org/react";
import Link from "next/link";

export default function SignupForm() {
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

            <Input
                isClearable
                type="password"
                variant={"bordered"}
                label="Password"
                maxLength={40}
                required
            />

            <Button color={"primary"}>
                Signup
            </Button>
        </form>
    )
}
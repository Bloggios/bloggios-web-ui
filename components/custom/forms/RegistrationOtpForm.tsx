"use client";

import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Button as NextButton} from "@nextui-org/react";
import Link from "next/link";

interface RegistrationOtpFormProps {
    userId: string;
}

const RegistrationOtpForm: React.FC<RegistrationOtpFormProps> = ({userId}) => {

    const handleEnterPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

        }
    }

    const [value, setValue] = useState<string>("");

    return (
        <div className={"flex flex-col gap-2"}>
            <InputOTP
                maxLength={6}
                value={value}
                autoFocus={true}
                onChange={(value) => setValue(value)}
            >
                <InputOTPGroup >
                    {[...Array(6)].map((_, index) => (
                        <InputOTPSlot className={"text-medium p-4"} key={index} index={index} onKeyDown={handleEnterPress} />
                    ))}
                </InputOTPGroup>
            </InputOTP>

            <div className={"text-xs text-muted-foreground"}>
                Please enter the one-time password sent to your email.
            </div>

            <Link href={"#"} className={"w-fit p-0 text-xs mt-4 underline"}>
                Resend OTP
            </Link>

            <NextButton isDisabled={true} color={"primary"} className={"mt-4"}>
                Submit
            </NextButton>
        </div>
    );
};

export default RegistrationOtpForm;
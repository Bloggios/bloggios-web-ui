"use client";

import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Button as NextButton, CircularProgress} from "@nextui-org/react";
import Link from "next/link";
import {SignupData} from "@/interfaces/SignupData";
import {log} from "node:util";
import {useMutation} from "@tanstack/react-query";
import {resendOtp, verifyOtp} from "@/rest/AuthProviderApplication";
import {useRouter} from "next/navigation";
import {dispatchError, dispatchSuccessMessage, getApiErrorMessage} from "@/utils/DispatchFunctions";
import {useDispatch} from "react-redux";

interface RegistrationOtpFormProps {
    userId: string;
}

const RegistrationOtpForm: React.FC<RegistrationOtpFormProps> = ({userId}) => {

    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch();
    const [countdown, setCountdown] = useState<number>(25);

    const otpSubmitMutation = useMutation({
        mutationFn: ()=> verifyOtp(value, userId),
        onSuccess: ()=> {
            dispatchSuccessMessage(dispatch, "Email verified successfully. Please login to continue");
            router.push("/login");
        },
        onError: (error: any) => {
            setError(getApiErrorMessage(error))
        }
    })

    const handleEnterPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (value.length < 6) {
                setError("Please enter 6 digit OTP");
            } else {
                handleSubmit();
            }
        }
    }

    const handleChange = (value: string) => {
        error.length > 0 && setError("");
        setValue(value);
    }

    const handleSubmit = () => {
        if (value.length < 6) {
            setError("Please enter 6 digit OTP");
            return;
        }
        otpSubmitMutation.mutate();
    }

    useEffect(() => {
        let intervalId: any;
        if (countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [countdown]);

    const resendOtpMutation = useMutation({
        mutationFn: ()=> resendOtp(userId),
        onSuccess: ()=> {
            setCountdown(25);
            dispatchSuccessMessage(dispatch, "OTP sent successfully to your Email")
        },
        onError: (error: any) => {
            dispatchError(dispatch, error);
        }
    });

    return (
        <div className={"flex flex-col gap-2"}>
            <InputOTP
                maxLength={6}
                value={value}
                autoFocus={true}
                onKeyDown={handleEnterPress}
                onChange={(value) => handleChange(value)}
            >
                <InputOTPGroup >
                    {[...Array(6)].map((_, index) => (
                        <InputOTPSlot className={"text-medium p-4"} key={index} index={index} />
                    ))}
                </InputOTPGroup>
            </InputOTP>

            <div className={"text-xs text-muted-foreground"}>
                Please enter the one-time password sent to your email.
            </div>

            <div className={"text-xs text-red-500"}>
                {error}
            </div>

            <Button
                variant={"link"}
                size={"sm"}
                className={`w-fit p-0 text-xs ${countdown > 0 ? '' : 'underline'}`}
                onClick={()=> resendOtpMutation.mutate()}
                disabled={countdown > 0}
            >
                {countdown > 0 ? `Resend OTP in ${countdown}` : "Resend OTP"}
            </Button>

            <NextButton onClick={handleSubmit} isDisabled={value.length < 6} color={"primary"} className={"mt-4"}>
                {otpSubmitMutation.isPending ? (
                    <CircularProgress
                        classNames={{
                            svg: "w-7 h-7",
                            indicator: "stroke-white"
                        }}
                    />
                ) : "Submit"}
            </NextButton>
        </div>
    );
};

export default RegistrationOtpForm;
"use client";

import {Button, CircularProgress, Input} from "@nextui-org/react";
import Link from "next/link";
import {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {useRouter, useSearchParams} from "next/navigation";
import {ACCOUNT_INACTIVE_ERROR_CODE, PASSWORD_REGEX} from "@/constants/ServiceConstants";
import {LoginData} from "@/interfaces/LoginData";
import {useMutation} from "@tanstack/react-query";
import {loginUser, otpAuthUserIdRedirect, resendOtp} from "@/rest/AuthProviderApplication";
import {dispatchError, dispatchWarningMessage} from "@/utils/DispatchFunctions";
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import {AxiosError} from "axios";
import {BLOG_PAGE} from "@/constants/UiPathConstants";

export default function LoginForm() {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [data, setData] = useState<LoginData>({
        entrypoint: "",
        password: ""
    });
    const [errorData, setErrorData] = useState<LoginData>({
        entrypoint: "",
        password: ""
    });
    const dispatch = useDispatch();
    const router  = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        property: keyof LoginData
    ) => {
        setErrorData(prevState => ({
            ...prevState,
            [property]: ''
        }));
        setData(prevState => ({
            ...prevState,
            [property]: event.target.value
        }))
    }

    const resendOtpMutation = useMutation({
        mutationFn: (userId: string)=> resendOtp(userId),
        onError: (error: any) => {
            dispatchError(dispatch, error);
        }
    });

    const otpAuthUserId = useMutation({
        mutationFn: ()=> otpAuthUserIdRedirect(data),
        onSuccess: (response)=> {
            dispatchWarningMessage(dispatch, "Please enter OTP send on your email to Verify your email");
            resendOtpMutation.mutateAsync(response.userId)
                .then(()=> {
                    router.push(`/otp/${response?.userId}`);
                })
        },
        onError: (error: any) => {
            dispatchError(dispatch, error);
        }
    })

    const loginMutation = useMutation({
        mutationFn: () => loginUser(data),
        onSuccess: async (response) => {
            if (redirect) {
                router.push(redirect);
            } else {
                router.push(BLOG_PAGE);
            }
        },
        onError: (error: AxiosError) => {
            // @ts-ignore
            if (error?.response?.data?.code === ACCOUNT_INACTIVE_ERROR_CODE) {
                otpAuthUserId.mutate();
            } else {
                dispatchError(dispatch, error);
            }
        }
    });

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }
        loginMutation.mutate();
    }

    const validatePassword = (value: String) => value.match(PASSWORD_REGEX);

    const handleValidate = () => {
        if (data.entrypoint.length === 0) {
            setErrorData(prevState => ({
                ...prevState,
                entrypoint: 'Please enter a Email or Username'
            }));
            return false;
        } else if (data.password.length === 0) {
            setErrorData(prevState => ({
                ...prevState,
                password: 'Please enter a Password'
            }));
            return false;
        }
        else if (!validatePassword(data.password)) {
            setErrorData(prevState => ({
                ...prevState,
                password: 'Password must be 8 Characters long with at least 1 Uppercase, 1 Number and 1 Special Character'
            }));
            return false;
        } else {
            return true;
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-6"}>
            <Input
                type="text"
                variant={"bordered"}
                label="Email or Username"
                maxLength={40}
                required
                value={data.entrypoint}
                isInvalid={errorData.entrypoint.length > 0}
                errorMessage={errorData.entrypoint}
                onChange={(event)=> handleInputChange(event, "entrypoint")}
            />

            <div className={"flex flex-col gap-2"}>
                <Input
                    isClearable
                    type={isPasswordVisible ? "text" : "password"}
                    variant={"bordered"}
                    label="Password"
                    maxLength={40}
                    required
                    value={data.password}
                    isInvalid={errorData.password.length > 0}
                    errorMessage={errorData.password}
                    onChange={(event)=> handleInputChange(event, "password")}
                    endContent={
                        <Button
                            onClick={()=> setIsPasswordVisible(!isPasswordVisible)}
                            isIconOnly={true}
                            variant={"faded"}
                            size={"sm"}
                            className={"bg-transparent rounded-full border-none outline-none focus:outline-none"}
                        >
                            {isPasswordVisible ? (
                                <EyeClosedIcon />
                            ) : <EyeOpenIcon />}
                        </Button>
                    }
                />
                <Link href={"/"} className={"text-xs hover:underline self-end pr-2"}>
                    Forget Password
                </Link>
            </div>

            <Button type={"submit"} color={"primary"}>
                {loginMutation.isPending|| otpAuthUserId.isPending || resendOtpMutation.isPending ? (
                    <CircularProgress
                        classNames={{
                            svg: "w-7 h-7",
                            indicator: "stroke-white"
                        }}
                    />
                ) : "Login"}
            </Button>
        </form>
    )
}
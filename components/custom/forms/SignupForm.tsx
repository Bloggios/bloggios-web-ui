"use client";

import {Button, CircularProgress, Input} from "@nextui-org/react";
import {ChangeEvent, FormEvent, useState} from "react";
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import {EMAIL_REGEX, PASSWORD_REGEX} from "@/constants/ServiceConstants";
import {useMutation} from "@tanstack/react-query";
import {SignupData} from "@/interfaces/SignupData";
import {signupUser} from "@/rest/AuthProviderApplication";
import {dispatchError, dispatchSuccessMessage} from "@/utils/DispatchFunctions";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

export default function SignupForm() {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [data, setData] = useState<SignupData>({
        email: "",
        password: ""
    });
    const [errorData, setErrorData] = useState<SignupData>({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const router  = useRouter();

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        property: keyof SignupData
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

    const validatePassword = (value: String) => value.match(PASSWORD_REGEX);
    const validateEmail = (value: String) => value.match(EMAIL_REGEX);

    const handleValidate = () => {
        if (data.email.length === 0) {
            setErrorData(prevState => ({
                ...prevState,
                email: 'Please enter a Email'
            }));
            return false;
        } else if (!validateEmail(data.email)) {
            setErrorData(prevState => ({
                ...prevState,
                email: 'Email is not valid. Please enter valid email'
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

    const handleInputClear = (property: keyof SignupData) => {
        setErrorData(prevState => ({
            ...prevState,
            [property]: ''
        }));
        setData(prevState => ({
            ...prevState,
            [property]: ''
        }));
    }

    const signupMutation = useMutation({
        mutationFn: () => signupUser(data),
        onSuccess: async (response) => {
            dispatchSuccessMessage(dispatch, response.message);
            router.push(`/otp/${response?.userId}`);
        },
        onError: (error) => {
            dispatchError(dispatch, error);
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
        signupMutation.mutate();
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-6"}>
            <Input
                isClearable
                onClear={()=> handleInputClear("email")}
                type="email"
                variant={"bordered"}
                label="Email"
                maxLength={40}
                value={data.email}
                isInvalid={errorData.email.length > 0}
                errorMessage={errorData.email}
                onChange={(event)=> handleInputChange(event, "email")}
            />

            <Input
                isClearable
                type={isPasswordVisible ? "text" : "password"}
                variant={"bordered"}
                label="Password"
                maxLength={28}
                required
                isInvalid={errorData.password.length > 0}
                errorMessage={errorData.password}
                onChange={(event)=> handleInputChange(event, "password")}
                endContent={
                    <Button
                        onClick={()=> setIsPasswordVisible(!isPasswordVisible)}
                        isIconOnly={true}
                        variant={"faded"}
                        size={"sm"}
                        className={"bg-transparent rounded-full border-none"}
                    >
                        {isPasswordVisible ? (
                            <EyeClosedIcon />
                        ) : <EyeOpenIcon />}
                    </Button>
                }
            />

            <Button type={"submit"} color={"primary"}>
                {signupMutation.isPending ? (
                    <CircularProgress
                        classNames={{
                            svg: "w-7 h-7",
                            indicator: "stroke-white"
                        }}
                    />
                ) : "Signup"}
            </Button>
        </form>
    )
}
"use client";

import {Button, Input} from "@nextui-org/react";
import {ChangeEvent, FormEvent, useState} from "react";
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import {PASSWORD_REGEX} from "@/constants/ServiceConstants";

interface SignupData {
    email: String,
    password: String,
}

export default function SignupForm() {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [data, setData] = useState<SignupData>({
        email: "",
        password: ""
    });
    const [errorData, setErrorData] = useState<SignupData>({
        email: "",
        password: ""
    })

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

    const handleValidate = () => {
        if (data.password.length === 0) {
            setErrorData(prevState => ({
                ...prevState,
                password: 'Please enter a Password'
            }));
            return;
        }
        else if (!validatePassword(data.password)) {
            setErrorData(prevState => ({
                ...prevState,
                password: 'Password must be 8 Characters long with at least 1 Uppercase, 1 Number and 1 Special Character'
            }));
            return;
        }
    }

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        handleValidate();
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-6"}>
            <Input
                isClearable
                type="email"
                variant={"bordered"}
                label="Email"
                maxLength={40}
                required
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
                Signup
            </Button>
        </form>
    )
}
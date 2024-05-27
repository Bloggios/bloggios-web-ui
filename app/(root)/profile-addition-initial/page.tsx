import MandateAuthenticate from "@/components/functional/MandateAuthenticate";
import AuthPageCard from "@/components/custom/sections/AuthPageCard";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import RootNavbar from "@/components/custom/navbars/RootNavbar";
import SocialAuthButtons from "@/components/custom/buttons/SocialAuthButtons";
import TextDivider from "@/components/custom/TextDivider";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import ProfileInitialForm from "@/components/custom/forms/ProfileInitialForm";

export default function ProfileAdditionInitialPage() {
    return (
        <>
            <RootNavbar />
            <Card className={"auth-w-clamp md:w-[400px] h-fit py-2 px-0 mx-auto mt-10 md:mt-28"}>
                <CardHeader>
                    <CardTitle className={"text-center text-xl"}>User Profile</CardTitle>
                    <CardDescription className={"text-center"}>Welcome! Please add your details</CardDescription>
                </CardHeader>
                <CardContent className={"w-full"}>
                    <ProfileInitialForm />
                </CardContent>
            </Card>
        </>
    )
}
import {Metadata} from "next";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import SocialAuthButtons from "@/components/custom/buttons/SocialAuthButtons";
import TextDivider from "@/components/custom/TextDivider";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import dynamic from "next/dynamic";

const LoginForm = dynamic(()=> import("@/components/custom/forms/LoginForm"));

export const metadata : Metadata = {
    title: "Login",
    description: "Login to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
    keywords: "Bloggios, Bloggios Login, Bloggios Account, Login, blog, tech blog, Q&A, posts, messaging, community, insights, questions, engagement, rohit parihar, rohit",
    robots: "index, follow",
    openGraph: {
        title: "Bloggios Login",
        description: "Login to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
        type: "website",
        url: "https://dev.bloggios.in/login",
        images: "/assets/bg_accent_outer_rounded.svg",
    },
    twitter: {
        title: "Bloggios Login",
        description: "Login to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
        images: "/assets/bg_accent_outer_rounded.svg",
        card: "summary_large_image"
    }
}

export default function LoginPage() {
    return (
        <Card className={"auth-w-clamp md:w-[400px] h-fit py-2 px-0 animate-slidein opacity-0"}>
            <CardHeader>
                <CardTitle className={"text-center text-xl"}>Sign in to Bloggios</CardTitle>
                <CardDescription className={"text-center"}>Welcome back! Please sign in to continue</CardDescription>
            </CardHeader>
            <CardContent className={"w-full"}>
                <SocialAuthButtons/>
                <TextDivider text={"or"} />
                <LoginForm />
            </CardContent>
            <CardFooter className={"flex flex-col gap-4 mt-2"}>
                <Separator />
                <span className={"text-sm text-muted-foreground"}>
                    Don&apos;t have an account? <Link href={"/signup"} className={"hover:underline text-black"}>Sign up</Link>
                </span>
            </CardFooter>
        </Card>
    )
}
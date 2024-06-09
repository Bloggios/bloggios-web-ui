import {Metadata} from "next";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import SocialAuthButtons from "@/components/custom/buttons/SocialAuthButtons";
import TextDivider from "@/components/custom/TextDivider";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import SignupForm from "@/components/custom/forms/SignupForm";

export const metadata : Metadata = {
    title: "Signup",
    description: "Signup to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
    keywords: "Bloggios, Bloggios Signup, Bloggios Account, Login, blog, tech blog, Q&A, posts, messaging, community, insights, questions, engagement, rohit parihar, rohit",
    robots: "index, follow",
    openGraph: {
        title: "Bloggios Signup",
        description: "Signup to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
        type: "website",
        url: "https://bloggios.com/signup",
        images: "/assets/bg_accent_outer_rounded.svg",
    },
    twitter: {
        title: "Bloggios Signup",
        description: "Signup to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
        images: "/assets/bg_accent_outer_rounded.svg",
        card: "summary_large_image"
    }
}

export default function SignupPage() {
    return (
        <Card className={"auth-w-clamp md:w-[400px] h-fit py-2 animate-slidein opacity-0"}>
            <CardHeader>
                <CardTitle className={"text-center text-xl"}>Sign in to Bloggios</CardTitle>
                <CardDescription className={"text-center"}>Welcome back! Please sign in to continue</CardDescription>
            </CardHeader>
            <CardContent className={"w-full"}>
                <SocialAuthButtons classname={"my-1"}/>
                <TextDivider text={"or"} />

                <SignupForm />

                <p className={"text-xs text-muted-foreground text-black text-center mt-4"}>
                    By clicking on signup button you agree to our terms and privacy policy
                </p>
            </CardContent>
            <CardFooter className={"flex flex-col gap-4"}>
                <Separator />
                <span className={"text-sm text-muted-foreground"}>
                   Already have an account? <Link href={"/login"} className={"hover:underline text-black"}>Login</Link>
                </span>
            </CardFooter>
        </Card>
    )
}
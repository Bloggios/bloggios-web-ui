import {Metadata} from "next";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import SocialAuthButtons from "@/components/custom/buttons/SocialAuthButtons";
import TextDivider from "@/components/custom/TextDivider";
import {Button, Input} from "@nextui-org/react";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

export const metadata : Metadata = {
    title: "Login",
    description: "Login to Bloggios, your all-in-one platform for blogs, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
    keywords: "Bloggios, Bloggios Login, Bloggios Account, Login, blogs, tech blogs, Q&A, posts, messaging, community, insights, questions, engagement, rohit parihar, rohit",
    robots: "index, follow",
    openGraph: {
        title: "Bloggios Login",
        description: "Login to Bloggios, your all-in-one platform for blogs, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
        type: "website",
        url: "https://bloggios.com/login",
        images: "/assets/bg_accent_outer_rounded.svg",
    },
    twitter: {
        title: "Bloggios Login",
        description: "Login to Bloggios, your all-in-one platform for blogs, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
        images: "/assets/bg_accent_outer_rounded.svg",
        card: "summary_large_image"
    }
}

export default function LoginPage() {
    return (
        <Card className={"w-[300px] md:w-[400px] py-2"}>
            <CardHeader>
                <CardTitle className={"text-center text-xl"}>Sign in to Bloggios</CardTitle>
                <CardDescription className={"text-center"}>Welcome back! Please sign in to continue</CardDescription>
            </CardHeader>
            <CardContent className={"w-full"}>
                <SocialAuthButtons/>
                <TextDivider text={"or"} />

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
                        <Link href={"/"} className={"text-xs hover:underline self-end pr-2"} >
                            Forget Password
                        </Link>
                    </div>

                    <Button color={"primary"}>
                        Login
                    </Button>
                </form>
            </CardContent>
            <CardFooter className={"flex flex-col gap-4 mt-2"}>
                <Separator />
                <span className={"text-sm text-muted-foreground"}>
                    Don&apos;t have an account? <Link href={"/signup"} className={"hover:underline"}>Sign up</Link>
                </span>
            </CardFooter>
        </Card>
    )
}
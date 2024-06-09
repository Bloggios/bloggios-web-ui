import {Metadata} from "next";
import bgAccentOuterRounded from "@/public/assets/bg_accent_outer_rounded.svg";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {uuidValidator} from "@/utils/Validators";
import {redirect} from "next/navigation";
import RegistrationOtpForm from "@/components/custom/forms/RegistrationOtpForm";

export const metadata : Metadata = {
    title: "OTP Verification",
    description: "OTP Verification to continue to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
    keywords: "Bloggios, Bloggios Verification, Bloggios OTP, OTP Page, Bloggios Account, Login, blog, tech blog, Q&A, posts, messaging, community, insights, questions, engagement, rohit parihar, rohit",
    robots: "index, follow",
    openGraph: {
        title: "Bloggios OTP Verification",
        description: "OTP Verification to continue to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
        type: "website",
        url: "https://dev.bloggios.in/otp/",
        images: bgAccentOuterRounded,
    },
    twitter: {
        title: "Bloggios OTP Verification",
        description: "OTP Verification to continue to Bloggios, your all-in-one platform for blog, Q&A, posts, messaging, and more. Connect with a vibrant community, share your insights, ask questions, and stay informed. Join Bloggios today!",
        images: "/assets/bg_accent_outer_rounded.svg",
        card: "summary_large_image"
    }
}


export default function OtpPage({
                                    params
                                }: {
    params: { userId: string }
}) {

    if (!uuidValidator(params.userId)) {
        redirect("/signup");
    }

    return (
        <div className={"flex items-center justify-center animate-slidein opacity-0"}>
            <Card className={"auth-w-clamp md:w-[400px] h-fit py-2 px-0"}>
                <CardHeader>
                    <CardTitle className={"text-center text-xl"}>Email Verification</CardTitle>
                </CardHeader>
                <CardContent className={"w-full flex flex-col gap-7"}>
                    <p className={"text-sm font-normal leading-2"}>
                        To ensure the security of your account, please enter the One-Time Password (OTP) sent to your registered email. This step helps us confirm your identity and protect your information.
                    </p>

                    <div className={"flex flex-col gap-4"}>
                    <span className={"text-lg font-semibold"}>
                        One Time Password (OTP)
                    </span>

                        <RegistrationOtpForm userId={params.userId} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
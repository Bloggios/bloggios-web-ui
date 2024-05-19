import {Metadata} from "next";

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
        <div>
            Login
        </div>
    )
}
import React from 'react';
import BlogsList from "@/components/lists/BlogsList";
import PrimaryAsideSection from "@/components/custom/pages/home/PrimaryAsideSection";
import InformationFooter from "@/components/InformationFooter";

export const metadata = {
    title: "Home - Bloggios",
    description: "Discover Bloggios, the ultimate platform for writers and creators. Write blogs, engage in Q&A, chat in real-time, publish events, and explore many more features. Connect with a dynamic community and share your voice on Bloggios!"
}

export default function DashboardPage() {

    return (
        <main className={"max-w-screen-xl container flex h-auto flex-row gap-2 w-full mt-4 md:mt-10 justify-between"}>
            <aside className={"hidden md:flex lg:w-[22%] md:w-[30%] md:flex-col"}>
                <PrimaryAsideSection />
                <InformationFooter />
            </aside>
            <main className={"w-full lg:w-[50%] md:w-[70%]"}>
                <BlogsList/>
            </main>
            <aside className={"hidden lg:flex md:w-[23%]"}>
                Aside Section
            </aside>
        </main>
    )
}
import React from 'react';
import BlogsList from "@/components/lists/BlogsList";

export default function DashboardPage() {


    return (
        <main className={"max-w-screen-xl container flex h-auto flex-row gap-2 w-full mt-4 md:mt-10"}>
            <main className={"w-full md:w-[70%]"}>
                <BlogsList />
            </main>
            <aside className={"hidden md:flex md:w-[30%]"}>
                Aside Section
            </aside>
        </main>
    )
}
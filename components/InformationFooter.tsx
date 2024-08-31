import React from 'react';
import Link from "next/link";
import BloggiosLogo from "@/components/custom/BloggiosLogo";

const InformationFooter = () => {

    const linkClasses = "text-xs text-muted-foreground font-thin tracking-wide underline";

    return (
        <div className={"flex flex-col items-center gap-4"}>
            <div className={"flex flex-row gap-4 px-4 items-center justify-center mt-4 flex-wrap"}>
                <Link className={linkClasses} href={"/"}>About</Link>
                <Link className={linkClasses} href={"/"}>Settings</Link>
                <Link className={linkClasses} href={"/"}>Help</Link>
                <Link className={linkClasses} href={"/"}>Report Bug</Link>
                <Link className={linkClasses} href={"/"}>Contact</Link>
                <Link className={linkClasses} href={"/"}>Privacy Policy</Link>
            </div>

            <div className={"flex"}>
                <BloggiosLogo size={16} />
                <small>loggios © 2024</small>
            </div>
        </div>
    );
};

export default InformationFooter;
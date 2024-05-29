"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function AuthNavbarLinks() {

    const pathname = usePathname();

    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/blogs', label: 'Blogs' },
        { href: '/messaging', label: 'Messaging' },
        { href: '/events', label: 'Events' },
        { href: '/discussion', label: 'Discussions' },
    ];

    return (
        <div className="hidden md:flex items-center gap-4 text-sm lg:gap-6 font-light dark:font-extralight tracking-wide">
            {links.map(link => {
                const isActive = pathname.includes(link.href);
                return (
                    <Link
                        key={link.href}
                        className={`transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </div>
    );
}

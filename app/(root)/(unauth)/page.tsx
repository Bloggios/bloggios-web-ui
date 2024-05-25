"use client";

import {useSelector} from "react-redux";

export default function LandingPage() {

    // @ts-ignore
    const auth = useSelector(state => state.auth);

    return (
        <main>
            Home Page
        </main>
    )
}
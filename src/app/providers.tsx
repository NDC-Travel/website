"use client";

import {SessionProvider, useSession} from "next-auth/react";
import {ReactNode, useEffect} from "react";

export default function Providers({ children }: { children: ReactNode }) {

    // const { update } = useSession()
    //
    // // Polling the session every 1 hour
    // useEffect(() => {
    //     // TIP: You can also use `navigator.onLine` and some extra event handlers
    //     // to check if the user is online and only update the session if they are.
    //     // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    //     const interval = setInterval(() => update(), 1000 * 60 * 1)
    //     return () => clearInterval(interval)
    // }, [update])
    //
    // // Listen for when the page is visible, if the user switches tabs
    // // and makes our tab visible again, re-fetch the session
    // useEffect(() => {
    //     const visibilityHandler = () =>
    //         document.visibilityState === "visible" && update()
    //     window.addEventListener("visibilitychange", visibilityHandler, false)
    //     return () =>
    //         window.removeEventListener("visibilitychange", visibilityHandler, false)
    // }, [update])

    return <SessionProvider>{children}</SessionProvider>;
}

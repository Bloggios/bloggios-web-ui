"use client"

import * as React from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider, useDispatch} from "react-redux";
import store from "@/state/store";

export const queryClient: QueryClient = new QueryClient();

export function ApplicationProvider({children}: Readonly<{ children: React.ReactNode }>) {

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    );
}
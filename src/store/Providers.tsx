// Providers.js
'use client';
import { Provider } from "react-redux";
import { globalStore } from "@/store/store";

export function Providers({ children } : { children: React.ReactNode }) {
    return <Provider store={globalStore}>{children}</Provider>;
}
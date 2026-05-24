import { AppConfig } from "@/config/app.config";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../../../globals.css";
import QueryProviders from "@/providers/QueryProviders"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
    title: AppConfig().app.name,
    description: AppConfig().app.slogan,
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}

import { AppConfig } from "@/config/app.config";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import QueryProviders from "@/providers/QueryProviders"

import { AuthInitializer } from "@/providers/AuthInitializer";
import { Toaster } from 'sonner';
import { Suspense } from "react";
import AdminMenu from "@/components/reusable/AdminMenu";
import { Loader } from "lucide-react";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
    title: AppConfig().app.name,
    description: AppConfig().app.slogan,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <AuthInitializer>
                    <QueryProviders>
                        <Suspense fallback={<Loader />}>
                            <AdminMenu>
                                {children}
                            </AdminMenu>
                        </Suspense>
                        <Toaster position="top-right" />
                    </QueryProviders>
                </AuthInitializer>
            </body>
        </html>
    );
}

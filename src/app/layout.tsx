import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "~/components/themeProvider";
import { Header } from "../components/header";

import "./globals.css";

export const metadata: Metadata = {
    title: "gradient-noise-generator",
    description: "もやもやジェネレーター",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html
            lang="ja"
            suppressHydrationWarning // ThemeProvider使用によるエラーの抑制
        >
            <body>
                <ThemeProvider>
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;

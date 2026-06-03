import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Next.js Streaming Demo",
    description: "A simple Next.js streaming demonstration",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}

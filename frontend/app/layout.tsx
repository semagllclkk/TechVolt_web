import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "TechVolt Solutions - Yenilenebilir Enerji Çözümleri",
    description: "Güneş enerjisi ve elektrik çözümleriyle sürdürülebilir bir gelecek için yanınızdayız.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body>{children}</body>
        </html>
    );
}

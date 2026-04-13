import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReachFare · 機票比價",
  description: "比較多平台報價，點擊前往訂票（示範用，不交易）",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

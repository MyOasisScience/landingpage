'use client'

// import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#F0F5FF]">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/images/favicons/site.webmanifest" />
      </head>
      <body
        className={cn(
          inter.variable,
          lora.variable,
          "flex min-h-screen flex-col font-sans antialiased bg-[#F3F2ED]"
        )}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {/* <IntercomApp /> */}
        <Analytics />
      </body>
    </html>
  );
}

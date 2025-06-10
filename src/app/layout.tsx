'use client'

// import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import UnicornScript from "@/components/unicornscript";
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

// export const metadata: Metadata = {
//   title: "Lagels",
//   description: "Lagels AI legal tech for client experience landing page",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#FBF8F4]">
      <head>
      <UnicornScript />
      </head>
      <body
        className={cn(
          inter.variable,
          lora.variable,
          "flex min-h-screen flex-col font-sans antialiased bg-gradient-to-b from-[#FBF8F4] to-[#EFE0CE]"
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

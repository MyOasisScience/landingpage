'use client'

// import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#C6FF00" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/images/favicons/site.webmanifest" />
      </head>
      <body
        className={cn(
          spaceMono.variable,
          "flex min-h-screen flex-col font-sans antialiased"
        )}
      >
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import Script from "next/script";
import WaitlistForm from "./waitlist-form";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => Promise<any>;
      destroy: () => void;
      addScene: (opts: any) => Promise<any>;
    };
  }
}

export default function Hero() {
  const [studioLoaded, setStudioLoaded] = useState(false);

  const handleScriptLoad = async () => {
    if (typeof window === "undefined" || !window.UnicornStudio) return;

    try {
      await window.UnicornStudio.addScene({
        elementId: "hero-unicorn",
        filePath: "/unicorn/scene.json",
        scale: 1,
        dpi: 1.5,
        lazyLoad: true,
        production: false,
        interactivity: {
          mouse: { disableMobile: true },
        },
      });
      setStudioLoaded(true);
    } catch (error) {
      console.error("Unicorn Studio scene init failed:", error);
    }
  };

  return (
    <div className="rounded-b-[5rem] relative w-full mx-auto lg:min-h-[80vh] flex flex-col items-start lg:flex-row lg:items-stretch gap-12 overflow-hidden pt-24 md:pt-32 lg:pt-40 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#F3F2ED]">
      {/* Unicorn Studio Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div id="hero-unicorn" className="w-full h-full" />
        <Script
          id="unicorn-studio"
          strategy="afterInteractive"
          src="https://cdn.unicorn.studio/v1.4.1/unicornStudio.umd.js"
          onLoad={handleScriptLoad}
        />
      </div>

      {/* Content */}
      <div className="flex-1 text-left max-w-xl relative z-10 mt-4 md:mt-0 lg:ml-[10%]">
        <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl font-medium text-[#2B3D3B]">
          Turn Cutting-Edge Science Into{" "}
          <strong className="font-semibold">Clear, Actionable Strategy</strong>
        </h1>
        <p className="text-lg text-[#444444] mb-8">
          <br />
          <br />
          Get bespoke scientific, industry, and policy briefings, tailored to your goals, delivered directly to your inbox.
        </p>
        <div className="max-w-md">
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}

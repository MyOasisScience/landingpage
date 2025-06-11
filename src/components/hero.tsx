"use client";

import { useState } from "react";
import Script from "next/script";
import WaitlistForm from "./waitlist-form";
import { DotPattern } from "./ui/DotPattern";
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
    <div className="rounded-b-[5rem] relative w-full justify-center mx-auto lg:min-h-[80vh] flex flex-col items-center lg:flex-row lg:items-stretch gap-12 overflow-hidden pt-16 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#F3F2ED]">
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

      {/* Background Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Content */}
      <div className="flex-1 text-center lg:text-left lg:self-center max-w-xl relative z-10 mt-4 md:mt-0">
        <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl font-medium text-[#2B3D3B]">
          Turn Cutting-Edge Science Into{" "}
          <strong className="font-semibold">Clear, Actionable Strategy</strong>
        </h1>
        <p className="text-lg text-[#444444] mb-8">
          <br />
          <br />
          For policy teams, startups, and comms professionals who need fast, reliable research they can actually use - without wading through PDFs.
        </p>
        <div className="max-w-md mx-auto lg:mx-0">
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}

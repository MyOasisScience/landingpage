"use client";

import Image from "next/image";
import WaitlistForm from "./waitlist-form";
import { DotPattern } from "./ui/DotPattern";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="rounded-b-[5rem] relative w-full justify-center mx-auto lg:min-h-[80vh] flex flex-col items-center lg:flex-row lg:items-stretch gap-12 overflow-hidden pt-16 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Unicorn Studio Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div
          className="unicorn-embed w-full h-full"
          data-us-project="Lc1vntWoZEyvpGS2N7W0"
          data-us-scale="1"
          data-us-dpi="1.5"
          data-us-lazyload="true"
          data-us-disablemobile="true"
          data-us-alttext="Hero Background"
          data-us-arialabel="Decorative background pattern"
        ></div>
      </div>

      {/* Blurred boxes - Repositioned to align with image */}
      <div
        className="absolute bottom-[-5%] right-[5%] w-[25%] h-2/5 bg-[#2f2514] filter blur-[8rem] rotate-100 z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[15%] right-[15%] w-[15%] h-1/6 bg-[#2f2514] filter blur-[5rem] rotate-[deg] z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[5%] right-[30%] w-[18%] h-1/5 bg-[#2f2514] filter blur-[7rem] z-10"
        aria-hidden="true"
      />

      {/* Background Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Left content */}
      <div className="flex-1 text-center lg:text-left lg:self-center max-w-xl relative z-10 mt-4 md:mt-0">
        <h1 className="font-logo text-4xl sm:text-5xl lg:text-6xl font-medium text-brand-800">
          Turn Cutting-Edge Science Into{" "}
          <strong className="font-semibold">Clear, Actionable Strategy</strong>
        </h1>
        <p className="text-lg text-brand-800 mb-8">
          <br />
          <br />
          For policy teams, startups, and comms professionals who need fast, reliable research they can actually use - without wading through PDFs.
        </p>
        <div className="max-w-md mx-auto lg:mx-0">
          <WaitlistForm />
        </div>
      </div>

      {/* Right image */}
      <div className="flex-1 w-full max-w-[85%] sm:max-w-sm md:max-w-md lg:max-w-xl relative z-10 flex items-end">
        {/* Hero UI Image - Complex version for larger screens */}
        <div className="absolute -top-15 -right-[15%] md:-right-[15%] w-[75%] sm:w-[80%] md:w-[85%] z-20 pointer-events-none hidden lg:block">
          <Image
            src="/images/heroui.png"
            alt="Lagels interface"
            width={500}
            height={300}
            priority
            className="object-contain"
          />
        </div>
        
        {/* Hero UI Image - Simple version for smaller screens */}
        <div className="absolute -top-15 -right-[25%] w-[75%] z-20 pointer-events-none block lg:hidden">
          <Image
            src="/images/herouisimple.png"
            alt="Lagels interface simple"
            width={400}
            height={250}
            priority
            className="object-contain"
          />
        </div>
        
        <div className="relative w-full aspect-square">
          <Image
            src="/images/herowoman.png"
            alt="Hero illustration"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
}

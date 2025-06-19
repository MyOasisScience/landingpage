"use client";

import Script from "next/script";

interface UnicornStudioOptions {
  elementId: string;
  filePath: string;
  scale: number;
  dpi: number;
  lazyLoad: boolean;
  production: boolean;
  interactivity: {
    mouse: { disableMobile: boolean };
  };
}

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => Promise<void>;
      destroy: () => void;
      addScene: (opts: UnicornStudioOptions) => Promise<void>;
    };
  }
}

export default function Hero() {
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
      <div className="flex-1 text-center lg:text-left max-w-xl relative z-10 mt-4 md:mt-0 lg:ml-[10%] p-6 rounded-lg mx-auto lg:mx-0 w-[90%] lg:w-auto">
        <h1 className="font-logo text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2B3D3B]">
          Stay 3 Steps Ahead of the Next Industry Shift.
        </h1>
        <p className="text-sm text-[#444444] mb-8">
          <br />
          Weekly custom briefs of frontier research, social chatter, and insider reports - tailored to your focus. Delivered every Friday.
        </p>
        <div className="w-full flex justify-center lg:justify-start">
          <a 
            href="https://buy.stripe.com/6oUbJ06TTbyf52BcRU1ck00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group relative px-8 py-3 rounded-full text-[#2B3D3B] font-medium
                     bg-[#C6FF00] hover:bg-[#B2E600]
                     active:bg-[#9ECC00]
                     border border-[#C6FF00]/50
                     shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                     hover:shadow-[0_6px_15px_rgba(0,0,0,0.25)] 
                     active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
                     transition-all duration-200
                     active:translate-y-0.5"
          >
            <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] text-center block">
              Become a Founding Member
            </span>
            <span
              className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5 opacity-50 
                      group-hover:opacity-80 group-active:opacity-30 rounded-full"
            ></span>
            <span
              className="absolute inset-0 border-t border-white/20 rounded-full group-active:opacity-0"
            ></span>
            <span
              className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-[#C6FF00]/50 to-[#B2E600]/50 opacity-0 
                       group-hover:opacity-100 -z-10 group-active:opacity-0 transition-opacity"
            ></span>
          </a>
        </div>
      </div>

      {/* Oasis Query Text */}
      <div className="absolute right-8 text-xs text-[#444444] font-mono text-right
        bottom-4
        [@media(max-width:1021px)]:top-[calc(100%+1rem)]">
        oasis.query --region &quot;EU&quot; --topic &quot;AI in genomics&quot;
        <br />
        ✔︎ Summary generated. Check your inbox
      </div>
    </div>
  );
}

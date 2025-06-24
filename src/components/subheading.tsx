"use client";

import { memo } from "react";
import Image from "next/image";

// Precompute content to avoid recreating it on every render
const textContent = "For startup decision-makers, policy leads, and comms professionals who can't afford to fall behind.";

// Memoize the entire component to prevent unnecessary re-renders
const Subheading = memo(function Subheading() {
  return (
    <div className="w-full">
      {/* Centered layout with chip above content */}
      <div className="flex flex-col items-center gap-6">
        {/* Content */}
        <div className="w-full">
          <div className="font-sans text-base sm:text-lg md:text-2xl justify-center font-medium tracking-tight text-gray-900 max-w-2xl md:max-w-3xl leading-tight mx-auto text-center">
            {textContent}
          </div>
        </div>
        
        {/* Meme Image */}
        <div className="flex justify-center mt-6">
          <Image 
            src="/images/meme.png" 
            alt="Meme" 
            width={500}
            height={300}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
});

// Set display name for better debugging
Subheading.displayName = 'Subheading';

export default Subheading; 
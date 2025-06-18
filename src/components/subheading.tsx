"use client";

import { memo } from "react";
import { TextReveal } from "./animations/TextReveal";

// Precompute content to avoid recreating it on every render
const textContent = [
  "For startup decision-makers, policy leads, and comms professionals who can’t afford to fall behind."
];

// Memoize the entire component to prevent unnecessary re-renders
const Subheading = memo(function Subheading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Centered layout with chip above content */}
      <div className="flex flex-col items-center gap-8">
        {/* Content */}
        <div className="w-full">
          <TextReveal 
            className="font-sans text-xl md:text-3xl justify-center font-medium tracking-tight text-neutral-900 max-w-2xl md:max-w-3xl leading-tight mx-auto text-center"
          >
            {textContent}
          </TextReveal>
        </div>
      </div>
    </div>
  );
});

// Set display name for better debugging
Subheading.displayName = 'Subheading';

export default Subheading; 
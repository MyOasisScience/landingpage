"use client";

import { memo } from "react";
import { TextReveal } from "./TextReveal";
import { PulseChip } from "./ui/PulseChip";

// Precompute content to avoid recreating it on every render
const textContent = [
  "Most science is locked away.",
  <br key="br1" />,
  "In PDFs, behind jargon, or buried in platforms built for researchers — not decision-makers.",
  <br key="br2" />,
  "Meanwhile, you're left with...",
  <br key="br3" />,
  "• Hours lost searching or emailing experts",
  <br key="br4" />,
  "• Outdated info guiding big decisions",
  <br key="br5" />,
  "• Research you can't actually act on",
];

// Memoize the entire component to prevent unnecessary re-renders
const ExplanationQuestions = memo(function ExplanationQuestions() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-20">
      {/* Centered layout with chip above content */}
      <div className="flex flex-col items-center gap-8">
        {/* Centered Chip */}
        <div className="flex justify-center mb-6">
          <PulseChip text="The problem" color="blue" />
        </div>

        {/* Content */}
        <div className="w-full">
          <TextReveal 
            className="font-serif text-3xl md:text-5xl justify-center font-medium tracking-tight text-neutral-900 max-w-2xl md:max-w-3xl leading-tight mx-auto text-center"
          >
            {textContent}
          </TextReveal>
        </div>
      </div>
    </div>
  );
});

// Set display name for better debugging
ExplanationQuestions.displayName = 'ExplanationQuestions';

export default ExplanationQuestions;

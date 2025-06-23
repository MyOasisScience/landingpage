"use client";

export default function Hero() {
  return (
    <div className="relative w-full flex flex-col lg:flex-row gap-8 items-center">
      {/* Content */}
      <div className="flex-1 text-center lg:text-left max-w-xl relative z-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Stop falling behind on the science that matters to you
        </h1>
        <h2 className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed">
          Get a personalised weekly roundup of the latest breakthroughs in research, industry, and policy — delivered every Wednesday, with zero fluff.
        </h2>
      </div>
    </div>
  );
}

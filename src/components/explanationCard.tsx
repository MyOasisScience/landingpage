"use client";

import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "./animated-text";

const questions = [
  {
    text: "What's the latest research on climate adaptation?",
    color: "bg-blue-400",
  },
  { 
    text: "How do I validate this health claim?", 
    color: "bg-yellow-400" 
  },
  {
    text: "What's the science behind this behavior?",
    color: "bg-green-500",
  },
  { 
    text: "Is this technology ready for market?", 
    color: "bg-pink-400" 
  },
  { 
    text: "What do experts say about this policy?", 
    color: "bg-purple-500" 
  },
  { 
    text: "How do I find relevant research?", 
    color: "bg-orange-400" 
  },
  { 
    text: "Can you summarize this paper?", 
    color: "bg-gray-500" 
  },
];

// Separate component for each question bubble to fix hooks rule violation
interface QuestionBubbleProps {
  question: {
    text: string;
    color: string;
  };
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}

const QuestionBubble: React.FC<QuestionBubbleProps> = ({ 
  question, scrollYProgress, start, end 
}) => {
  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0.01, 1]
  );
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);

  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl bg-brand-50 border border-neutral-100 text-base md:text-lg text-neutral-800 shadow-sm whitespace-nowrap"
      style={{
        opacity,
        y,
      }}
    >
      <span
        className={`inline-block h-2 w-2 md:h-2.5 md:w-2.5 rounded-full ${question.color} flex-shrink-0`}
      ></span>
      {question.text}
    </motion.div>
  );
};

export default function ExplanationCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.8"], // Animate as the container scrolls through the middle 80% of viewport
  });

  return (
    <section className="relative w-full mt-8 py-12 px-2 md:py-16">
      {/* Unicorn Studio Border Background - Full Width Backdrop */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div
          className="unicorn-embed w-full h-full"
          data-us-project="Lc1vntWoZEyvpGS2N7W0"
          data-us-scale="1"
          data-us-dpi="1.5"
          data-us-lazyload="true"
          data-us-disablemobile="true"
          data-us-alttext="Explanation Card Border"
          data-us-arialabel="Decorative border background"
        ></div>
      </div>

      {/* Centered Content Card */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto bg-gray-100 opacity-80 border border-neutral-200 rounded-3xl shadow-sm overflow-visible"
      >
        {/* Title */}
        <AnimatedText>
          <h2 className="text-center font-logo text-3xl md:text-4xl font-medium text-brand-900 mt-12 max-w-4xl mx-auto">
            Helping you ask the <i>right questions</i> at the <i>right time</i>
          </h2>
        </AnimatedText>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 p-6 md:p-10 min-h-[40vh]">
          {questions.map((question, index) => {
            const totalQuestions = questions.length;
            const start = index / totalQuestions;
            const end = (index + 0.8) / totalQuestions;

            return (
              <QuestionBubble
                key={question.text}
                question={question}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

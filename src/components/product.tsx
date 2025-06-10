"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PulseChip } from "./ui/PulseChip";

const features = [
  {
    title: "Bespoke Scientific Reports",
    desc: "Tailored to your question, goal, or campaign. Get research that's specifically designed for your needs.",
  },
  {
    title: "Research Summaries You Can Search",
    desc: "Curated insights from papers, preprints, even Reddit. All searchable and organized for easy access.",
  },
  {
    title: "Ask Us Anything",
    desc: "Get direct support or request custom briefs. Our team is here to help you get the answers you need.",
  },
  {
    title: "Connect to Experts",
    desc: "Behind-the-scenes access to the scientists behind the work. Build relationships with the experts who matter.",
  },
];

// Find the description with the most text to determine maximum height
const longestDesc = features.reduce(
  (longest, current) =>
    current.desc.length > longest.length ? current.desc : longest,
  features[0].desc
);

export default function Product() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(Array(features.length).fill(null));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  // Calculate active section directly from scroll position
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      
      // Get all section elements
      const sections = sectionRefs.current.filter(Boolean);
      
      // Find the one most in view
      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      
      let newActiveIndex = 0;
      
      // Determine the active section based on scroll position
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section) continue;
        
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const nextSection = i < sections.length - 1 ? sections[i + 1] : null;
        const nextSectionTop = nextSection 
          ? nextSection.getBoundingClientRect().top + window.scrollY 
          : Infinity;
        
        if (viewportMiddle >= sectionTop && viewportMiddle < nextSectionTop) {
          newActiveIndex = i;
          break;
        }
      }
      
      setActiveIndex(newActiveIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="w-full justify-center px-4 mt-16">
      <div className="w-full flex flex-col items-center mx-auto gap-8 max-w-6xl">
        {/* Centered header chip */}
        <div className="flex flex-col items-center text-center">
          <PulseChip text="Our product" color="green" />
        </div>

        {/* Content container */}
        <div ref={containerRef}>
          {features.map((feature, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={index}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className="mb-16 last:mb-12"
              >
                <div className="md:flex md:gap-12">
                  {/* Feature title - right aligned */}
                  <div className={`md:w-1/2 py-6 transition-colors duration-300 md:text-right ${isActive ? 'text-neutral-900' : 'text-neutral-300'}`}>
                    <h3 className="font-logo text-3xl md:text-4xl transition-colors duration-500">
                      {feature.title}
                    </h3>
                  </div>
                  
                  {/* Feature description - desktop and mobile versions */}
                  <div className="md:w-1/2 py-6">
                    {/* Desktop version - fixed height container with animation */}
                    <div className="hidden md:block md:h-32">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            <p className="text-neutral-800 pr-4">{feature.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Mobile version - All descriptions are rendered and positioned absolutely */}
                    <div className="block md:hidden relative">
                      {/* Hidden spacer element to maintain consistent height */}
                      <div className="opacity-0 invisible" aria-hidden="true">
                        <p>{longestDesc}</p>
                      </div>
                      
                      {/* Overlay the active description */}
                      <div className="absolute top-0 left-0 right-0">
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="text-neutral-800">{feature.desc}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

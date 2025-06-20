"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import RedditCard from "./reddit-card";

export default function ExpandableCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSecondStep, setShowSecondStep] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for the expansion animation - much slower
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1.2, 1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [1, 0.8, 0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [8, 16, 24, 8]);
  const zIndex = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 10, 10, 1]);

  // Full screen overlay opacity - much longer duration
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.85, 0.9], [0, 1, 1, 0]);
  
  // Content scale for full screen - much longer duration
  const contentScale = useTransform(scrollYProgress, [0.1, 0.15, 0.85, 0.9], [1, 1.5, 1.5, 1]);

  // Second step animation triggers - spread across much more scroll distance
  const secondStepOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.7, 0.75], [0, 1, 1, 0]);
  const emailAnimation = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const reportAnimation = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsExpanded(latest > 0.1 && latest < 0.9);
      setShowSecondStep(latest > 0.25 && latest < 0.75);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative">
      {/* Reddit Card Container */}
      <motion.div
        style={{
          scale,
          opacity,
          borderRadius,
          zIndex
        }}
        className="origin-center"
      >
        <RedditCard 
          title=""
          subreddit="r/HowItWorks"
          author="MyOasis.science"
          timestamp="15 minutes ago"
          upvotes={756}
          comments={34}
        >
          <div className="text-gray-900">
            <h3 className="font-medium text-lg md:text-xl mb-3">
              1. <strong>Tell us what you're working on</strong>
            </h3>
            <p className="text-sm text-gray-800">
              We'll reach out to understand your focus, goals, and what insights matter most to you.
            </p>
          </div>
        </RedditCard>
      </motion.div>

      {/* Full Screen Overlay */}
      <motion.div
        style={{
          opacity: overlayOpacity,
          zIndex: 20
        }}
        className="fixed inset-0 bg-white pointer-events-none"
      >
        <div className="flex items-center justify-center h-full w-full p-4">
          <motion.div
            style={{
              scale: contentScale
            }}
            className="w-full max-w-5xl mx-auto"
          >
            {/* First Step Content */}
            <AnimatePresence>
              {!showSecondStep && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6"
                >
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight px-4">
                    1. <strong>Tell us what you're working on</strong>
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4">
                    We'll reach out to understand your focus, goals, and what insights matter most to you.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Second Step Content */}
            <AnimatePresence>
              {showSecondStep && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {/* Mobile Layout - Stacked */}
                  <div className="block md:hidden space-y-4 text-center px-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
                        <span className="block">2.</span>
                        <span className="block"><strong>We build your</strong></span>
                        <span className="block"><strong>weekly brief</strong></span>
                      </h1>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Email Animation */}
                      <motion.div
                        style={{
                          opacity: emailAnimation
                        }}
                        className="flex justify-center"
                      >
                        <div className="relative">
                          {/* Email Icon */}
                          <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="w-16 h-12 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center"
                          >
                            <svg className="w-8 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </motion.div>
                          
                          {/* Email Opening Animation */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                            className="absolute -top-2 -right-2 w-20 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
                          >
                            <div className="p-2">
                              <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                              <div className="w-3/4 h-2 bg-gray-200 rounded mb-1"></div>
                              <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Report Animation */}
                      <motion.div
                        style={{
                          opacity: reportAnimation
                        }}
                        className="flex justify-center"
                      >
                        <motion.div
                          initial={{ y: 100, opacity: 0, rotateX: 90 }}
                          animate={{ y: 0, opacity: 1, rotateX: 0 }}
                          transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
                          className="w-64 h-72 bg-white border-2 border-gray-300 rounded-lg shadow-xl transform perspective-1000"
                        >
                          <div className="p-4 h-full flex flex-col">
                            {/* Report Header */}
                            <div className="border-b border-gray-200 pb-3 mb-3">
                              <h3 className="text-sm font-bold text-gray-900 text-center">
                                Jack Dunning's Weekly Oasis
                              </h3>
                              <p className="text-xs text-gray-600 text-center">
                                w/c 23/07/2025
                              </p>
                            </div>
                            
                            {/* Report Content Placeholder */}
                            <div className="flex-1 space-y-2">
                              <div className="w-full h-2 bg-gray-200 rounded"></div>
                              <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                              <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                              <div className="w-full h-2 bg-gray-200 rounded"></div>
                              <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                              <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                              <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                              <div className="w-full h-2 bg-gray-200 rounded"></div>
                              <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                              <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Desktop Layout - Side by side */}
                  <div className="hidden md:flex items-center justify-between space-x-8 px-4">
                    <div className="flex-1 max-w-md">
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                        <span className="block">2.</span>
                        <span className="block"><strong>We build your</strong></span>
                        <span className="block"><strong>weekly brief</strong></span>
                      </h1>
                    </div>

                    <div className="flex-1 space-y-6">
                      {/* Email Animation */}
                      <motion.div
                        style={{
                          opacity: emailAnimation
                        }}
                        className="flex justify-center"
                      >
                        <div className="relative">
                          {/* Email Icon */}
                          <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="w-16 h-12 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center"
                          >
                            <svg className="w-8 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </motion.div>
                          
                          {/* Email Opening Animation */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.3, duration: 0.6 }}
                            className="absolute -top-2 -right-2 w-20 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
                          >
                            <div className="p-2">
                              <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                              <div className="w-3/4 h-2 bg-gray-200 rounded mb-1"></div>
                              <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Report Animation */}
                      <motion.div
                        style={{
                          opacity: reportAnimation
                        }}
                        className="flex justify-center"
                      >
                        <motion.div
                          initial={{ y: 100, opacity: 0, rotateX: 90 }}
                          animate={{ y: 0, opacity: 1, rotateX: 0 }}
                          transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
                          className="w-72 h-80 bg-white border-2 border-gray-300 rounded-lg shadow-xl transform perspective-1000"
                        >
                          <div className="p-4 h-full flex flex-col">
                            {/* Report Header */}
                            <div className="border-b border-gray-200 pb-3 mb-3">
                              <h3 className="text-base font-bold text-gray-900 text-center">
                                Jack Dunning's Weekly Oasis
                              </h3>
                              <p className="text-xs text-gray-600 text-center">
                                w/c 23/07/2025
                              </p>
                            </div>
                            
                            {/* Report Content Placeholder */}
                            <div className="flex-1 space-y-2">
                              <div className="w-full h-2 bg-gray-200 rounded"></div>
                              <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                              <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                              <div className="w-full h-2 bg-gray-200 rounded"></div>
                              <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                              <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                              <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                              <div className="w-full h-2 bg-gray-200 rounded"></div>
                              <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                              <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValueEvent } from "framer-motion";
import { Scene1, Scene2, Scene3 } from "./scenes";
import { useScrollProgress } from "../hooks/useScrollProgress";

// Animation Variants
const cardVariants = {
  initial: { 
    scale: 1,
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  expanded: { 
    scale: 1,
    borderRadius: "0px",
    boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)"
  }
};

const contentVariants = {
  initial: { 
    height: "auto",
    padding: "1.5rem"
  },
  expanded: { 
    height: "100vh",
    padding: "2rem"
  }
};

const redditCardVariants = {
  initial: { 
    opacity: 1,
    scale: 1,
    y: 0
  },
  expanded: { 
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const fullScreenVariants = {
  initial: { 
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  expanded: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.5 }
  }
};

const scrollIndicatorVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { delay: 1, duration: 0.5 }
  },
  exit: { opacity: 0, y: -10 }
};

export default function ExpandableCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.3,
    margin: "-100px 0px -100px 0px"
  });

  const { sceneVisibility, emailAnimation, reportAnimation, isComponentActive, currentScene } = useScrollProgress({
    containerRef,
    sceneCount: 3
  });

  // Convert MotionValue<boolean> to actual boolean states
  const [scene1Visible, setScene1Visible] = useState(false);
  const [scene2Visible, setScene2Visible] = useState(false);
  const [scene3Visible, setScene3Visible] = useState(false);

  // Listen to scene visibility changes
  useMotionValueEvent(sceneVisibility[0], "change", (latest) => {
    setScene1Visible(latest);
  });

  useMotionValueEvent(sceneVisibility[1], "change", (latest) => {
    setScene2Visible(latest);
  });

  useMotionValueEvent(sceneVisibility[2], "change", (latest) => {
    setScene3Visible(latest);
  });

  // Store scroll position when component becomes active
  useEffect(() => {
    if (isComponentActive) {
      const scrollY = window.scrollY;
      sessionStorage.setItem('expandableCardScrollY', scrollY.toString());
    }
  }, [isComponentActive]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <motion.div
        layoutId="expandable-card"
        variants={cardVariants}
        initial="initial"
        animate={isInView ? "expanded" : "initial"}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut",
          layout: { duration: 0.6, ease: "easeInOut" }
        }}
        className="w-full bg-white overflow-hidden"
        role="main"
        aria-label="How it works process"
        style={{
          // Ensure the component takes full viewport when expanded
          minHeight: isInView ? "100vh" : "auto"
        }}
      >
        <motion.div
          layoutId="card-content"
          variants={contentVariants}
          initial="initial"
          animate={isInView ? "expanded" : "initial"}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut",
            layout: { duration: 0.6, ease: "easeInOut" }
          }}
          className="w-full flex flex-col items-center justify-center relative"
        >
          {/* Reddit Card View */}
          <motion.div
            layoutId="reddit-card"
            variants={redditCardVariants}
            initial="initial"
            animate={isInView ? "expanded" : "initial"}
            className="w-full max-w-md mx-auto"
            role="region"
            aria-label="Initial card view"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Tell us what you're working on
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                We'll reach out to understand your focus, goals, and what insights matter most to you.
              </p>
            </div>
          </motion.div>

          {/* Full Screen Content */}
          <motion.div
            layoutId="fullscreen-content"
            variants={fullScreenVariants}
            initial="initial"
            animate={isInView ? "expanded" : "initial"}
            className="w-full h-full flex flex-col items-center justify-center space-y-8"
            role="region"
            aria-label="Full screen process view"
          >
            {/* Scene Container */}
            <div className="w-full max-w-6xl mx-auto px-4">
              {/* Scene 1 */}
              <div className="mb-16">
                <Scene1 isVisible={scene1Visible} />
              </div>

              {/* Scene 2 */}
              <div className="mb-16">
                <Scene2 
                  isVisible={scene2Visible}
                  emailAnimation={emailAnimation}
                  reportAnimation={reportAnimation}
                />
              </div>

              {/* Scene 3 */}
              <div className="mb-16">
                <Scene3 isVisible={scene3Visible} />
              </div>
            </div>

            {/* Scroll Indicator */}
            {isInView && (
              <motion.div
                variants={scrollIndicatorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
                role="status"
                aria-label="Scroll to navigate through steps"
              >
                <div className="flex space-x-2">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        currentScene === index ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500 text-center">
                  <span className="hidden sm:inline">Scroll or use arrow keys to navigate</span>
                  <span className="sm:hidden">Swipe to navigate</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
} 
import React from "react";
import { motion } from "framer-motion";

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const checkmarkVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { delay: 0.5, duration: 0.6, ease: "easeOut" }
  }
};

interface Scene4Props {
  isVisible: boolean;
}

export default function Scene4({ isVisible }: Scene4Props) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      exit="exit"
      className="text-center space-y-6"
      role="region"
      aria-label="Step 4: Success completion"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight px-4">
        4. <strong>Success!</strong>
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4">
        Your weekly brief is ready and delivered to your inbox.
      </p>
      
      {/* Success Animation */}
      <motion.div
        variants={checkmarkVariants}
        initial="initial"
        animate={isVisible ? "animate" : "initial"}
        className="flex justify-center mt-8"
        aria-label="Success checkmark"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
} 
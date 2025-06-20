import React from "react";
import { motion } from "framer-motion";

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

interface Scene1Props {
  isVisible: boolean;
}

export default function Scene1({ isVisible }: Scene1Props) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      exit="exit"
      className="text-center space-y-6"
      role="region"
      aria-label="Step 1: Tell us what you're working on"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight px-4">
        1. <strong>Tell us what you're working on</strong>
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4">
        We'll reach out to understand your focus, goals, and what insights matter most to you.
      </p>
    </motion.div>
  );
} 
import React from "react";
import { motion } from "framer-motion";

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

interface Scene3Props {
  isVisible: boolean;
}

export default function Scene3({ isVisible }: Scene3Props) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      exit="exit"
      className="text-center space-y-6"
      role="region"
      aria-label="Step 3: Coming soon"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight px-4">
        3. <strong>Coming Soon</strong>
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4">
        More steps will be added here as we expand the process.
      </p>
    </motion.div>
  );
} 
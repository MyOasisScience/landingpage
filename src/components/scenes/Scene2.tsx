import React from "react";
import { motion, MotionValue } from "framer-motion";

// Animation Variants
const emailIconVariants = {
  initial: { y: -50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { delay: 0.5, duration: 0.8 }
  }
};

const emailOpenVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { delay: 1.3, duration: 0.6 }
  }
};

const reportVariants = {
  initial: { y: 100, opacity: 0, rotateX: 90 },
  animate: { 
    y: 0, 
    opacity: 1, 
    rotateX: 0,
    transition: { delay: 1.8, duration: 1.2, ease: "easeOut" }
  }
};

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

interface Scene2Props {
  isVisible: boolean;
  emailAnimation: MotionValue<number>;
  reportAnimation: MotionValue<number>;
}

export default function Scene2({ isVisible, emailAnimation, reportAnimation }: Scene2Props) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      exit="exit"
      className="w-full"
      role="region"
      aria-label="Step 2: We build your weekly brief"
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
                variants={emailIconVariants}
                initial="initial"
                animate="animate"
                className="w-16 h-12 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center"
                aria-label="Email notification"
              >
                <svg className="w-8 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </motion.div>
              
              {/* Email Opening Animation */}
              <motion.div
                variants={emailOpenVariants}
                initial="initial"
                animate="animate"
                className="absolute -top-2 -right-2 w-20 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
                aria-label="Email content preview"
              >
                <div className="p-2">
                  <div className="w-full h-2 bg-gray-200 rounded mb-1" aria-hidden="true"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded mb-1" aria-hidden="true"></div>
                  <div className="w-1/2 h-2 bg-gray-200 rounded" aria-hidden="true"></div>
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
              variants={reportVariants}
              initial="initial"
              animate="animate"
              className="w-64 h-72 bg-white border-2 border-gray-300 rounded-lg shadow-xl transform perspective-1000"
              aria-label="Weekly report preview"
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
                <div className="flex-1 space-y-2" aria-hidden="true">
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
      <div className="hidden md:flex items-center space-x-8 px-4">
        <div className="flex-1 flex justify-center">
          <div className="max-w-md">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight text-center">
              <span className="block">2.</span>
              <span className="block"><strong>We build your</strong></span>
              <span className="block"><strong>weekly brief</strong></span>
            </h1>
          </div>
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
                variants={emailIconVariants}
                initial="initial"
                animate="animate"
                className="w-16 h-12 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center"
                aria-label="Email notification"
              >
                <svg className="w-8 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </motion.div>
              
              {/* Email Opening Animation */}
              <motion.div
                variants={emailOpenVariants}
                initial="initial"
                animate="animate"
                className="absolute -top-2 -right-2 w-20 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
                aria-label="Email content preview"
              >
                <div className="p-2">
                  <div className="w-full h-2 bg-gray-200 rounded mb-1" aria-hidden="true"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded mb-1" aria-hidden="true"></div>
                  <div className="w-1/2 h-2 bg-gray-200 rounded" aria-hidden="true"></div>
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
              variants={reportVariants}
              initial="initial"
              animate="animate"
              className="w-72 h-80 bg-white border-2 border-gray-300 rounded-lg shadow-xl transform perspective-1000"
              aria-label="Weekly report preview"
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
                <div className="flex-1 space-y-2" aria-hidden="true">
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
  );
}
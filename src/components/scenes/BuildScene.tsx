import { motion } from "framer-motion"
import Scene from "./Scene"

interface BuildSceneProps {
  onNext?: () => void
}

// Animation Variants
const emailIconVariants = {
  initial: { y: -50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { delay: 0.5, duration: 0.8 }
  }
}

const emailOpenVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { delay: 1.3, duration: 0.6 }
  }
}

const reportVariants = {
  initial: { y: 100, opacity: 0, rotateX: 90 },
  animate: { 
    y: 0, 
    opacity: 1, 
    rotateX: 0,
    transition: { delay: 1.8, duration: 1.2, ease: "easeOut" }
  }
}

export default function BuildScene({ onNext }: BuildSceneProps) {
  return (
    <Scene>
      <h2 className="text-3xl font-semibold">We build your weekly brief</h2>
      <p className="max-w-md mb-8">
        Our team curates the most relevant research and insights for your specific focus areas.
      </p>
      
      <div className="space-y-8">
        {/* Email Animation */}
        <motion.div
          variants={emailIconVariants}
          initial="initial"
          animate="animate"
          className="flex justify-center"
        >
          <div className="relative">
            {/* Email Icon */}
            <motion.div
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
          variants={reportVariants}
          initial="initial"
          animate="animate"
          className="flex justify-center"
        >
          <motion.div
            className="w-64 h-72 bg-white border-2 border-gray-300 rounded-lg shadow-xl transform perspective-1000"
            aria-label="Weekly report preview"
          >
            <div className="p-4 h-full flex flex-col">
              {/* Report Header */}
              <div className="border-b border-gray-200 pb-3 mb-3">
                <h3 className="text-sm font-bold text-gray-900 text-center">
                  Jack Dunning&apos;s Weekly Oasis
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

      {onNext && (
        <button 
          onClick={onNext} 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors mt-8"
        >
          Next
        </button>
      )}
    </Scene>
  )
} 
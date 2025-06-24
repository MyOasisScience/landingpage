import { motion } from "framer-motion"
import Scene from "./Scene"

interface ReadAndRefineSceneProps {
  scrollProgress?: number
}

export default function ReadAndRefineScene({ scrollProgress = 0 }: ReadAndRefineSceneProps) {
  return (
    <Scene scrollProgress={scrollProgress}>
      <motion.div
        layoutId="card"
        className="rounded-md shadow-sm w-full max-w-4xl"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${scrollProgress})`,
          border: `1px solid rgba(229, 231, 235, ${scrollProgress})`
        }}
        transition={{ layout: { duration: 0.8, ease: "easeInOut" } }}
      >
        {/* Reddit Post Header */}
        <motion.div
          className="flex items-center p-3 border-b border-gray-100"
          style={{ opacity: scrollProgress }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#C6FF00] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#2B3D3B] text-xs font-bold">r</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-900">HowItWorks</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reddit Post Content */}
        <div className="flex">
          {/* Vote Column */}
          <motion.div
            className="flex flex-col items-center w-10 bg-gray-50 py-2"
            style={{ opacity: scrollProgress }}
          >
            <button className="text-gray-500 hover:text-[#B2E600] hover:scale-110 transition-all duration-200 p-1 group cursor-pointer">
              <svg className="w-5 h-5 group-hover:w-6 group-hover:h-6 group-hover:font-bold transition-all duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="text-xs font-medium py-1 text-gray-900">1.6k</span>
            <button className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-all duration-200 p-1 group cursor-pointer">
              <svg className="w-5 h-5 group-hover:w-6 group-hover:h-6 group-hover:font-bold transition-all duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="flex-1 p-6"
          >
            <div className="text-gray-900">
              <h2 className="text-3xl font-semibold mb-4">
                3. Read and Refine
              </h2>
              <p className="text-lg text-gray-700">
                Reply with feedback any time, and we&apos;ll fine-tune your brief to make sure it delivers exactly what&apos;s useful to you.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Reddit Post Footer */}
        <motion.div
          className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50"
          style={{ opacity: scrollProgress }}
        >
          {/* Footer content removed - keeping only the styling for card appearance */}
        </motion.div>
      </motion.div>
    </Scene>
  )
} 
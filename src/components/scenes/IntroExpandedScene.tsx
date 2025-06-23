import { motion } from "framer-motion"
import Scene from "./Scene"

interface IntroExpandedSceneProps {
  scrollProgress?: number
}

export default function IntroExpandedScene({ scrollProgress = 0 }: IntroExpandedSceneProps) {
  return (
    <Scene scrollProgress={scrollProgress}>
      <motion.div
        layoutId="card"
        className="rounded-md shadow-sm w-full max-w-4xl"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${1 - scrollProgress})`,
          border: `1px solid rgba(229, 231, 235, ${1 - scrollProgress})`
        }}
        transition={{ layout: { duration: 0.8, ease: "easeInOut" } }}
      >
        {/* Reddit Post Header */}
        <motion.div
          className="flex items-center p-3 border-b border-gray-100"
          style={{ opacity: 1 - scrollProgress }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#C6FF00] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#2B3D3B] text-xs font-bold">r</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-900">r/HowItWorks</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-800">
                <span>Posted by</span>
                <span className="text-blue-600 hover:underline cursor-pointer">MyOasis.science</span>
                <span>•</span>
                <span>15 minutes ago</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reddit Post Content */}
        <div className="flex">
          {/* Vote Column */}
          <motion.div
            className="flex flex-col items-center w-10 bg-gray-50 py-2"
            style={{ opacity: 1 - scrollProgress }}
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
                1. Tell us what you&apos;re working on
              </h2>
              <p className="text-lg text-gray-700">
                We&apos;ll reach out to understand your focus, goals, and what insights matter most to you.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Reddit Post Footer */}
        <motion.div
          className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50"
          style={{ opacity: 1 - scrollProgress }}
        >
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-800 hover:bg-gray-200 px-2 py-1 rounded transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">89 Comments</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-800 hover:bg-gray-200 px-2 py-1 rounded transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span className="text-sm">Share</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-800 hover:bg-gray-200 px-2 py-1 rounded transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Save</span>
            </button>
          </div>
          <button className="text-gray-800 hover:bg-gray-200 p-1 rounded transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </Scene>
  )
} 
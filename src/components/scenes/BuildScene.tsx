import { motion } from "framer-motion"
import Scene from "./Scene"

interface BuildSceneProps {
  scrollProgress?: number
}

export default function BuildScene({ scrollProgress = 0 }: BuildSceneProps) {
  return (
    <Scene scrollProgress={scrollProgress}>
      <div className="w-full max-w-4xl">
        <div className="text-gray-900">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center">2. We build your custom weekly debrief</h2>
          
          <div className="space-y-6 sm:space-y-8">
            {/* Step 1 */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollProgress - 0.1) / 0.2))
              }}
            >
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200 mx-auto sm:mx-0"
                style={{
                  scale: Math.min(1, Math.max(0, (scrollProgress - 0.15) / 0.2))
                }}
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3">Analyse your interests</h3>
                <p className="text-base sm:text-lg text-gray-800">We analyse your brief and goals to understand what matters to you.</p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.2))
              }}
            >
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200 mx-auto sm:mx-0"
                style={{
                  scale: Math.min(1, Math.max(0, (scrollProgress - 0.35) / 0.2))
                }}
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </motion.div>
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3">Curate relevant content</h3>
                <p className="text-base sm:text-lg text-gray-800">Our AI scans thousands of scientific papers, industry reports, and social threads to find the most relevant insights for you.</p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollProgress - 0.5) / 0.2))
              }}
            >
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200 mx-auto sm:mx-0"
                style={{
                  scale: Math.min(1, Math.max(0, (scrollProgress - 0.55) / 0.2))
                }}
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </motion.div>
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3">Deliver insights</h3>
                <p className="text-base sm:text-lg text-gray-800">Each week, we deliver a newsletter summarising key developments, trends, and discussions in your field.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Scene>
  )
} 
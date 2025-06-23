import { motion } from "framer-motion"
import Image from "next/image"
import Scene from "./Scene"

interface IndustrySceneProps {
  scrollProgress?: number
}

export default function IndustryScene({ scrollProgress = 0 }: IndustrySceneProps) {
  return (
    <Scene scrollProgress={scrollProgress}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-gray-900">
          <h2 className="text-3xl font-semibold mb-6 text-center">Monitor industry developments</h2>
          <p className="text-lg text-gray-800 text-center mb-10">We surface major industry research and reports</p>

          <div className="space-y-10">
            {/* Industry Report Images */}
            <div className="flex justify-center space-x-8">
              <motion.div
                className="max-w-sm"
                style={{
                  opacity: Math.max(0, (scrollProgress - 0.1) / 0.2),
                  transform: `translateY(${(1 - Math.max(0, (scrollProgress - 0.1) / 0.2)) * 30}px)`
                }}
              >
                <Image 
                  src="/images/IndustryReport1.png" 
                  alt="Industry Report 1" 
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </motion.div>
              
              <motion.div
                className="max-w-sm"
                style={{
                  opacity: Math.max(0, (scrollProgress - 0.4) / 0.2),
                  transform: `translateY(${(1 - Math.max(0, (scrollProgress - 0.4) / 0.2)) * 30}px)`
                }}
              >
                <Image 
                  src="/images/IndustryReport2.png" 
                  alt="Industry Report 2" 
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  )
}


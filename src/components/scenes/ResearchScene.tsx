import { motion } from "framer-motion"
import Image from "next/image"
import Scene from "./Scene"

interface ResearchSceneProps {
  scrollProgress?: number
}

export default function ResearchScene({ scrollProgress = 0 }: ResearchSceneProps) {
  const paperVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }

  return (
    <Scene scrollProgress={scrollProgress}>
      <div className="w-full max-w-4xl">
        <div className="text-gray-900">
          <h2 className="text-3xl font-semibold mb-8 text-center">Stay on top of new research</h2>
          <p className="text-lg text-gray-800 text-center mb-8">Get notified about important scientific papers released this week.</p>
          
          <div className="space-y-6 mb-8">
            {/* Research Papers - Masonry Layout */}
            <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div>
                <motion.div
                  className="relative w-full aspect-[3/2] bg-gradient-to-br from-white to-gray-100 border border-gray-200 shadow-md rounded-lg overflow-hidden hover:scale-[1.02] transition-transform"
                  variants={paperVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="absolute top-2 right-2 bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium">
                    🧠 Medical AI
                  </div>
                  <Image 
                    src="/images/Paper1Title.png" 
                    alt="Research Paper 1" 
                    width={300}
                    height={200}
                    className="w-full h-full object-contain p-3"
                  />
                </motion.div>
                <div className="text-center mt-2">
                  <div className="text-xs font-semibold text-gray-700 bg-white/90 px-3 py-1.5 rounded-md shadow-sm border border-gray-200 inline-block">
                    AI boosts Parkinson&apos;s treatment
                  </div>
                </div>
              </div>
              
              <div>
                <motion.div
                  className="relative w-full aspect-[3/2] bg-gradient-to-br from-white to-gray-100 border border-gray-200 shadow-md rounded-lg overflow-hidden hover:scale-[1.02] transition-transform mt-12"
                  variants={paperVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium">
                    🌱 Sustainability
                  </div>
                  <Image 
                    src="/images/Paper2Title.png" 
                    alt="Research Paper 2" 
                    width={300}
                    height={200}
                    className="w-full h-full object-contain p-3"
                  />
                </motion.div>
                <div className="text-center mt-2">
                  <div className="text-xs font-semibold text-gray-700 bg-white/90 px-3 py-1.5 rounded-md shadow-sm border border-gray-200 inline-block">
                    NLP&apos;s carbon footprint, quantified
                  </div>
                </div>
              </div>
            </div>
            
            {/* Third paper centered below - hidden on mobile */}
            <div className="hidden md:flex justify-center">
              <div>
                <motion.div
                  className="relative w-72 aspect-[3/2] bg-gradient-to-br from-white to-gray-100 border border-gray-200 shadow-md rounded-lg overflow-hidden hover:scale-[1.02] transition-transform"
                  variants={paperVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="absolute top-2 right-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium">
                    🤖 Autonomous Research
                  </div>
                  <Image 
                    src="/images/Paper3Title.png" 
                    alt="Research Paper 3" 
                    width={300}
                    height={200}
                    className="w-full h-full object-contain p-3"
                  />
                </motion.div>
                <div className="text-center mt-2">
                  <div className="text-xs font-semibold text-gray-700 bg-white/90 px-3 py-1.5 rounded-md shadow-sm border border-gray-200 inline-block">
                    AI scientist passes peer review
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  )
}

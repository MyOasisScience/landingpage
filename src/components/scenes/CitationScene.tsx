import { motion } from "framer-motion"
import Scene from "./Scene"

interface CitationSceneProps {
  scrollProgress?: number
}

export default function CitationScene({ scrollProgress = 0 }: CitationSceneProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }

  return (
    <Scene scrollProgress={scrollProgress}>
      <div className="w-full max-w-4xl">
        <div className="text-gray-900">
          <h2 className="text-3xl font-semibold mb-4 text-center">Track citation milestones in real-time</h2>
          <p className="text-lg text-gray-800 mb-8 text-center">We notify you when relevant research hits key citation or impact thresholds.</p>
          
          <div className="space-y-8">
            {/* Citation Examples */}
            <div className="space-y-6">
              {/* Self-Injury Study */}
              <motion.div
                className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg border border-gray-200 shadow-md hover:scale-[1.02] transition-transform"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium">
                        🧠 Clinical Research
                      </div>
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">
                      &ldquo;Self-Injury in College Youth&rdquo;
                    </h3>
                    <p className="text-lg text-gray-800">Whitlock et al. • Pediatrics • 2006</p>
                    <p className="text-sm text-gray-700 mt-2 italic">
                      Crossed 1,000 citations — now a clinical and policy reference point.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">1,524</div>
                    <div className="text-sm text-gray-500">citations</div>
                  </div>
                </div>
              </motion.div>

              {/* Laser Wakefield Acceleration */}
              <motion.div
                className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg border border-gray-200 shadow-md hover:scale-[1.02] transition-transform"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium">
                        ⚛️ Physics
                      </div>
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">
                      &ldquo;Laser Wakefield Electron Beams&rdquo;
                    </h3>
                    <p className="text-lg text-gray-800">Nature • 2004</p>
                    <p className="text-sm text-gray-700 mt-2 italic">
                      Surpassed 1,000 citations — now a core method in compact particle physics.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">2,699</div>
                    <div className="text-sm text-gray-500">citations</div>
                  </div>
                </div>
              </motion.div>

              {/* Addison Chemistry Paper - hidden on mobile */}
              <motion.div
                className="hidden md:block bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg border border-gray-200 shadow-md hover:scale-[1.02] transition-transform"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-sm shadow-sm font-medium">
                        🧪 Chemistry
                      </div>
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">
                      &ldquo;Copper(II) Complex Structures&rdquo;
                    </h3>
                    <p className="text-lg text-gray-800">Addison et al. • J. Chem. Soc. • 1984</p>
                    <p className="text-sm text-gray-700 mt-2 italic">
                      Exceeded 5,000 citations — textbook-standard in materials chemistry.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">6,721</div>
                    <div className="text-sm text-gray-500">citations</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  )
} 
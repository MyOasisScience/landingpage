import { motion } from "framer-motion"
import Scene from "./Scene"

interface TrendsSceneProps {
  scrollProgress?: number
}

export default function TrendsScene({ scrollProgress = 0 }: TrendsSceneProps) {
  return (
    <Scene scrollProgress={scrollProgress}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-gray-900">
          <h2 className="text-3xl font-semibold mb-6 text-center">Get actionable insights</h2>
          
          <motion.p 
            className="text-lg text-gray-700 text-center mb-10"
            style={{
              opacity: Math.max(0, (scrollProgress - 0.1) / 0.2)
            }}
          >
            Every week, we recommend specific next steps based on your focus areas and current developments.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <motion.div
              className="bg-blue-50 border-none rounded-lg shadow-sm p-5"
              style={{
                opacity: Math.max(0, (scrollProgress - 0.2) / 0.2)
              }}
            >
              <p className="text-blue-800 text-md font-medium">
                Use GenSLM to boost compound prediction in your pipeline — early adopters are seeing faster hits.
              </p>
            </motion.div>

            <motion.div
              className="bg-green-50 border-none rounded-lg shadow-sm p-5"
              style={{
                opacity: Math.max(0, (scrollProgress - 0.3) / 0.2)
              }}
            >
              <p className="text-green-800 text-md font-medium">
                Tailor your fundraising deck to BioNTech's investment focus on programmable biology and DNA assembly.
              </p>
            </motion.div>

            <motion.div
              className="bg-purple-50 border-none rounded-lg shadow-sm p-5"
              style={{
                opacity: Math.max(0, (scrollProgress - 0.4) / 0.2)
              }}
            >
              <p className="text-purple-800 text-md font-medium">
                Prototype a proof-of-concept using Qiskit or OrbNet to accelerate quantum-powered molecule modelling.
              </p>
            </motion.div>

            <motion.div
              className="bg-amber-50 border-none rounded-lg shadow-sm p-5"
              style={{
                opacity: Math.max(0, (scrollProgress - 0.5) / 0.2)
              }}
            >
              <p className="text-amber-800 text-md font-medium">
                Submit a proposal to NIH's AI-driven hypothesis funding stream, focused on generative model interpretability.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </Scene>
  )
}


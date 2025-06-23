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
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Get actionable insights</h2>
          
          <motion.p 
            className="text-base sm:text-lg text-gray-700 text-center mb-6 sm:mb-10"
            style={{
              opacity: Math.max(0, (scrollProgress - 0.1) / 0.2)
            }}
          >
            Every week, we recommend specific next steps based on your focus areas and current developments.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            
            <motion.div
              className="bg-blue-50 border-none rounded-lg shadow-sm p-4 sm:p-5"
              style={{
                opacity: Math.max(0, (scrollProgress - 0.2) / 0.2)
              }}
            >
              <p className="text-blue-800 text-sm sm:text-md font-medium">
                Experiment with MoE (Mixture of Experts) tuning for cost efficiency
                <br />
                → Google&apos;s latest Gemini work shows MoE tuning reduces compute costs by 38%. Try it on your fine-tuning workload with LoRA and gated routing.
              </p>
            </motion.div>

            <motion.div
              className="hidden sm:block bg-green-50 border-none rounded-lg shadow-sm p-5"
              style={{
                opacity: Math.max(0, (scrollProgress - 0.3) / 0.2)
              }}
            >
              <p className="text-green-800 text-md font-medium">
                Reference the May 2025 IPCC scenario brief in your next urban resilience policy memo
                <br />
                → It includes revised flood risk projections for Western Europe and actionable cost-benefit models for green infrastructure.
              </p>
            </motion.div>

            <motion.div
              className="hidden sm:block bg-purple-50 border-none rounded-lg shadow-sm p-5"
              style={{
                opacity: Math.max(0, (scrollProgress - 0.4) / 0.2)
              }}
            >
              <p className="text-purple-800 text-md font-medium">
                Adapt your R&D to align with BioNTech&apos;s programmable biology fund
                <br />
                → They&apos;re backing startups focused on DNA assembly platforms and programmable vaccine development. Position your product as compatible with open mRNA tech stacks.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </Scene>
  )
}


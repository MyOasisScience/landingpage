import { motion } from "framer-motion"
import Scene from "./Scene"

const checkmarkVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      delay: 0.5, 
      duration: 0.6, 
      ease: "easeOut",
      type: "spring",
      stiffness: 200
    }
  }
}

export default function ComingSoonScene() {
  return (
    <Scene>
      <motion.div
        variants={checkmarkVariants}
        initial="initial"
        animate="animate"
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      
      <h2 className="text-3xl font-semibold">You&apos;re all set.</h2>
      <p className="max-w-md">
        We&apos;ll start sending you tailored updates every Wednesday.
      </p>
    </Scene>
  )
} 
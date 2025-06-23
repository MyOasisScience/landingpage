"use client"
import { motion } from "framer-motion"

export default function StoryTrigger() {
  return (
    <motion.div
      layoutId="card"
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          How MyOasis.science works
        </h3>
      </div>
    </motion.div>
  )
} 
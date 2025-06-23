import { motion } from "framer-motion"

interface SceneProps {
  children: React.ReactNode
}

export default function Scene({ children }: SceneProps) {
  return (
    <motion.section
      className="flex flex-col items-center gap-6 p-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.section>
  )
} 
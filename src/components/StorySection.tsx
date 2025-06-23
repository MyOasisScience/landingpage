"use client"
import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import IntroScene from "./scenes/IntroScene"
import BuildScene from "./scenes/BuildScene"
import ComingSoonScene from "./scenes/ComingSoonScene"

const scenes = [IntroScene, BuildScene, ComingSoonScene] as const
const SECTION_H = scenes.length    // 3 → 300vh

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // 0 when bottom enters, 1 when top leaves
  })

  const [scene, setScene] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // v is 0 → 1 across the whole section
    const idx = Math.min(
      scenes.length - 1,
      Math.floor(v * scenes.length)
    )
    setScene(idx)
  })

  const ActiveScene = scenes[scene]

  return (
    <section  // height = 3×viewport
      ref={sectionRef}
      style={{ height: `${SECTION_H * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          layoutId="card"       // matches the Reddit card → morphs on entry
          className="w-full max-w-4xl bg-neutral-800 rounded-xl p-8 text-white"
        >
          <AnimatePresence mode="wait">
            <ActiveScene key={scene} /> {/* fade/scale handled inside Scene wrapper */}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
} 
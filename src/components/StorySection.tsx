"use client"
import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import IntroExpandedScene from "./scenes/IntroExpandedScene"
import BuildScene from "./scenes/BuildScene"
import ResearchScene from "./scenes/ResearchScene"
import CitationScene from "./scenes/CitationScene"
import IndustryScene from "./scenes/IndustryScene"
import SocialChatterScene from "./scenes/SocialChatterScene"
import TrendsScene from "./scenes/TrendsScene"
import ReadAndRefineScene from "./scenes/ReadAndRefineScene"
import ReadAndRefineFinalScene from "./scenes/ReadAndRefineFinalScene"

const scenes = [IntroExpandedScene, BuildScene, ResearchScene, CitationScene, IndustryScene, SocialChatterScene, TrendsScene, ReadAndRefineScene, ReadAndRefineFinalScene] as const
const SECTION_H = scenes.length    // 9 → 900vh

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // 0 when bottom enters, 1 when top leaves
  })

  const [scene, setScene] = useState(0)
  const [localProgress, setLocalProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (raw) => {
    // Apply delay consistently for both scene selection and progress calculation
    const delay = 0.2 // 20% delay before first scene starts
    const adjustedV = Math.max(0, (raw - delay) / (1 - delay))
    
    // Calculate scene index based on adjustedV
    const idx = Math.min(
      scenes.length - 1,
      Math.max(0, Math.floor(adjustedV * scenes.length))
    )
    setScene(idx)

    // Calculate local progress for the current scene based on adjustedV
    const sceneStart = idx / scenes.length
    const sceneEnd = (idx + 1) / scenes.length
    const progress = Math.max(0, Math.min(1, (adjustedV - sceneStart) / (sceneEnd - sceneStart)))
    setLocalProgress(progress)
  })

  const ActiveScene = scenes[scene]
  
  return (
    <section  // height = 9×viewport
      ref={sectionRef}
      style={{ height: `${SECTION_H * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          className="w-full max-w-4xl"
        >
          <ActiveScene key={scene} scrollProgress={localProgress} />
        </motion.div>
      </div>
    </section>
  )
} 
"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ children, className = "", delay = 0 }: Props) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  const variants: Record<string, Variant> = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay
      } 
    },
  }

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
        }
      },
      { threshold: 0.1 },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
      }))
      setHearts(newHearts)
    }
    generateHearts()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-5xl md:text-6xl opacity-20"
          style={{ left: `${heart.x}%`, bottom: "-50px" }}
          animate={{
            y: [0, -1200],
            x: [0, Math.sin(heart.id) * 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  )
}

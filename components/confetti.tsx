"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const confettiColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"]

export function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ 
    id: number
    x: number
    delay: number
    duration: number
    color: string
    rotation: number
    size: number
  }>>([])

  useEffect(() => {
    const generateConfetti = () => {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        size: 8 + Math.random() * 12,
      }))
      setConfettiPieces(newConfetti)
    }
    generateConfetti()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute opacity-70"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
          animate={{
            y: [0, 1200],
            x: [0, Math.sin(piece.id) * 200],
            rotate: [piece.rotation, piece.rotation + 720],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}


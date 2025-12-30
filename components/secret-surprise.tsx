"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Gift, Lock } from "lucide-react"
import confetti from "canvas-confetti"

export function SecretSurprise() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleUnlock = () => {
    setIsUnlocked(true)

    // Confetti burst
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff6b9d", "#c767f7", "#f9a8d4", "#fca5a5", "#ddd6fe"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff6b9d", "#c767f7", "#f9a8d4", "#fca5a5", "#ddd6fe"],
      })
    }, 250)
  }

  return (
    <section className="relative py-20 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl -mt-18 font-bold text-center mb-12 text-foreground">Okay… last thing 💖</h2>

        <Card className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
          {!isUnlocked ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                className="inline-block"
              >
                <Gift className="w-24 h-24 mx-auto text-primary" />
              </motion.div>

              <p className="text-2xl text-foreground font-medium">There's something hidden here for you…</p>

              <Button
                onClick={handleUnlock}
                size="lg"
                className="text-xl px-12 py-8 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Lock className="mr-2 h-6 w-6" />
                Click for your surprise
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-video bg-muted rounded-2xl overflow-hidden mb-4">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  >
                    <source src="/memory/Untitled design (1).mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-xl text-center text-foreground leading-relaxed">
                  A little message from me (Kavish) — press play when you're ready 💖
                </p>
              </motion.div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </section>
  )
}

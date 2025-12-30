"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Music2, Music } from "lucide-react"
import { useState, useMemo } from "react"
import Image from "next/image"

// All images from public/memory directory
const imageFiles = [
  "WhatsApp Image 2025-12-30 at 21.22.37.jpeg",
  "WhatsApp Image 2025-12-30 at 21.24.42.jpeg",
  "WhatsApp Image 2025-12-30 at 21.25.18.jpeg",
  "WhatsApp Image 2025-12-30 at 21.28.37.jpeg",
  "WhatsApp Image 2025-12-30 at 21.28.46.jpeg",
  "WhatsApp Image 2025-12-30 at 21.29.18.jpeg",
  "WhatsApp Image 2025-12-30 at 21.30.36.jpeg",
  "WhatsApp Image 2025-12-30 at 21.30.53.jpeg",
]

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function HeroSection() {
  const [musicOn, setMusicOn] = useState(false)

  // Randomly select 4 images for corners
  const cornerImages = useMemo(() => {
    const shuffled = shuffleArray([...imageFiles])
    return shuffled.slice(0, 4)
  }, [])

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
  }

  // Corner positions and animations
  const corners = [
    { position: "top-4 left-4 lg:top-32 lg:left-32 xl:top-40 xl:left-40", rotation: -12, delay: 0.2 },
    { position: "top-4 right-4 lg:top-32 lg:right-32 xl:top-40 xl:right-40", rotation: 12, delay: 0.4 },
    { position: "bottom-4 left-4 lg:bottom-32 lg:left-32 xl:bottom-40 xl:left-40", rotation: 8, delay: 0.6 },
    { position: "bottom-4 right-4 lg:bottom-32 lg:right-32 xl:bottom-40 xl:right-40", rotation: -8, delay: 0.8 },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 z-10 overflow-hidden">
      {/* Corner images with sticking animation */}
      {cornerImages.map((imageFile, index) => (
        <motion.div
          key={imageFile}
          className={`absolute ${corners[index].position} w-24 h-32 md:w-32 md:h-40 lg:w-48 lg:h-64 xl:w-56 xl:h-72 rounded-lg overflow-hidden shadow-2xl z-0`}
          initial={{ 
            opacity: 0, 
            scale: 0.5,
            x: index % 2 === 0 ? -100 : 100,
            y: index < 2 ? -100 : 100,
            rotate: corners[index].rotation * 2
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: 0,
            y: 0,
            rotate: corners[index].rotation
          }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: corners[index].delay,
            duration: 0.8
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: corners[index].rotation + 5,
            zIndex: 10
          }}
          style={{
            transformOrigin: "center center",
          }}
        >
          <Image
            src={`/memory/${imageFile}`}
            alt={`Memory ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 192px, 224px"
          />
          {/* Tape effect overlay */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-3 md:w-10 md:h-4 lg:w-12 lg:h-5 xl:w-14 xl:h-6 bg-yellow-200/40 opacity-60 blur-sm" />
        </motion.div>
      ))}
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Happy 23rd Birthday,
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              My Love 💖
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty"
        >
          From Kavish — a little gallery of us, and a surprise at the end 🎁
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={scrollToGallery}
            className="text-lg px-8 py-6 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Start the memories ✨
            </motion.span>
          </Button>
          
        </motion.div>
      </div>
    </section>
  )
}

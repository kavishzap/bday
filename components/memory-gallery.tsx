"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

// Available captions
const captions = [
  "The day everything felt right.",
  "Your smile is my favorite view.",
  "Our little world, everywhere we go.",
  "A memory I replay when I miss you.",
  "You + me = my happiest place.",
  "Still crushing on you, daily.",
  "And this is only the beginning… 💞",
  "Every moment with you is a treasure.",
  "Love you more than words can say. 💕",
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

export function MemoryGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Create memories array with images from public/memory and randomized captions
  const memories = useMemo(() => {
    const shuffledCaptions = shuffleArray(captions)
    return imageFiles.map((imageFile, index) => ({
      id: index + 1,
      title: `Memory ${index + 1}`,
      caption: shuffledCaptions[index] || captions[index % captions.length],
      imageUrl: `/memory/${imageFile}`,
    }))
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1))
  }

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [memories.length])

  return (
    <section id="gallery" className="relative py-20 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">Our Memories Together ✨</h2>

        <Card className="glass-card rounded-3xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-2xl text-center text-foreground font-medium mb-6"
            >
              {memories[currentIndex].caption}
            </motion.p>
          </AnimatePresence>

          <div className="relative mb-6 rounded-2xl overflow-hidden min-h-[400px] max-h-[80vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={memories[currentIndex].imageUrl || "/placeholder.svg"}
                  alt={memories[currentIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`hearts-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                >
                  💖
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full h-12 w-12 bg-background/80 backdrop-blur hover:bg-background/90"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToNext}
              className="rounded-full h-12 w-12 bg-background/80 backdrop-blur hover:bg-background/90"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}
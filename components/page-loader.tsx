"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

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

function preloadImages(
  imagePaths: string[],
  onProgress?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    let loadedCount = 0
    const totalImages = imagePaths.length

    if (totalImages === 0) {
      resolve()
      return
    }

    imagePaths.forEach((imagePath) => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        const progress = (loadedCount / totalImages) * 100
        onProgress?.(progress)
        if (loadedCount === totalImages) {
          resolve()
        }
      }
      img.onerror = () => {
        loadedCount++
        const progress = (loadedCount / totalImages) * 100
        onProgress?.(progress)
        if (loadedCount === totalImages) {
          resolve()
        }
      }
      img.src = `/memory/${imagePath}`
    })
  })
}

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate hearts for loader
    const generateHearts = () => {
      const newHearts = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 6,
      }))
      setHearts(newHearts)
    }
    generateHearts()
  }, [])

  useEffect(() => {
    const loadAssets = async () => {
      // Simulate minimum loading time for smooth UX
      const minLoadTime = 2000
      const startTime = Date.now()

      // Start progress immediately
      setProgress(10)

      // Simulate progress animation
      const progressSteps = [20, 35, 50, 65, 80, 90]
      let stepIndex = 0
      
      const progressInterval = setInterval(() => {
        if (stepIndex < progressSteps.length) {
          setProgress(progressSteps[stepIndex])
          stepIndex++
        }
      }, 300)

      // Preload all images (don't wait for them to block)
      preloadImages(imageFiles, (imgProgress) => {
        // Update progress based on image loading
        const imageBasedProgress = 30 + (imgProgress * 0.5)
        setProgress((prev) => Math.max(prev, imageBasedProgress))
      }).catch(() => {
        // Ignore errors, continue loading
      })

      // Wait for minimum load time
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      await new Promise((resolve) => setTimeout(resolve, remaining))

      // Clear progress interval
      clearInterval(progressInterval)

      // Animate to 100%
      setProgress(100)

      // Wait a moment then hide loader
      await new Promise((resolve) => setTimeout(resolve, 500))

      setIsLoading(false)
    }

    loadAssets()
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          >
            {/* Floating hearts */}
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-5xl md:text-6xl opacity-40 pointer-events-none"
                style={{ 
                  left: `${heart.x}%`, 
                  bottom: "-60px",
                }}
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
            <div className="text-center space-y-8 relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
              >
                <Image
                  src="/ChatGPT_Image_Dec_30__2025__10_40_57_PM-removebg-preview (1).png"
                  alt="Loading"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Hello Ashwini
                </h2>
                <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  {progress < 100 ? `${Math.round(progress)}%` : "Almost there..."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}


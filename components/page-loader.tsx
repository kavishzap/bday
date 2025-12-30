"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

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

  useEffect(() => {
    const loadAssets = async () => {
      // Simulate minimum loading time for smooth UX
      const minLoadTime = 1500
      const startTime = Date.now()

      // Preload all images with progress tracking
      await preloadImages(imageFiles, (imgProgress) => {
        setProgress(Math.min(imgProgress, 90)) // Cap at 90% until all loaded
      })

      // Calculate remaining time
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)

      // Update progress to 100%
      setProgress(100)

      // Wait for minimum load time if needed
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining))
      }

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="text-center space-y-8">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="text-7xl"
              >
                💖
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


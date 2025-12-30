"use client"

import { HeroSection } from "@/components/hero-section"
import { MemoryGallery } from "@/components/memory-gallery"
import { LoveNotes } from "@/components/love-notes"
import { SecretSurprise } from "@/components/secret-surprise"
import { FloatingHearts } from "@/components/floating-hearts"
import { Confetti } from "@/components/confetti"
import { PageLoader } from "@/components/page-loader"
import { BackgroundMusic } from "@/components/background-music"
import { useEffect } from "react"

export default function BirthdayPage() {
  useEffect(() => {
    // Enable audio context on user interaction (required by some browsers)
    const enableAudio = () => {
      const audioElements = document.querySelectorAll("audio")
      audioElements.forEach((audio) => {
        if (audio.paused) {
          audio.play().catch(() => {
            // Ignore errors, will be handled by BackgroundMusic component
          })
        }
      })
    }

    // Try to enable on any user interaction
    const events = ["click", "touchstart", "keydown"]
    events.forEach((event) => {
      document.addEventListener(event, enableAudio, { once: true })
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, enableAudio)
      })
    }
  }, [])

  return (
    <PageLoader>
      <BackgroundMusic />
      <main className="relative min-h-screen overflow-hidden">
        <FloatingHearts />
        <Confetti />
        <HeroSection />
        <MemoryGallery />
        <LoveNotes />
        <SecretSurprise />
        <footer className="py-12 text-center">
          <p className="text-lg font-medium text-foreground">Made with love by Kavish 💗</p>
        </footer>
      </main>
    </PageLoader>
  )
}

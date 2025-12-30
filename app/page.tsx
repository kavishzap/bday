"use client"

import { HeroSection } from "@/components/hero-section"
import { MemoryGallery } from "@/components/memory-gallery"
import { LoveNotes } from "@/components/love-notes"
import { SecretSurprise } from "@/components/secret-surprise"
import { FloatingHearts } from "@/components/floating-hearts"
import { Confetti } from "@/components/confetti"
import { PageLoader } from "@/components/page-loader"

export default function BirthdayPage() {
  return (
    <PageLoader>
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

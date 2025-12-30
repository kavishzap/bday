"use client"

import { useEffect, useRef } from "react"

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasPlayedRef = useRef(false)
  const playAttemptedRef = useRef(false)

  const playAudio = async () => {
    const audio = audioRef.current
    if (audio && !hasPlayedRef.current && !playAttemptedRef.current) {
      playAttemptedRef.current = true
      try {
        audio.volume = 0.7 // Set volume to 70%
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          hasPlayedRef.current = true
          console.log("✅ Audio playing successfully")
        }
      } catch (error) {
        console.log("⚠️ Autoplay blocked, waiting for user interaction...")
        // Try again on ANY user interaction
        const handleUserInteraction = async () => {
          try {
            if (audio && !hasPlayedRef.current) {
              await audio.play()
              hasPlayedRef.current = true
              console.log("✅ Audio started after user interaction")
            }
          } catch (e) {
            console.error("❌ Still can't play audio:", e)
          }
          // Remove all listeners
          document.removeEventListener("click", handleUserInteraction)
          document.removeEventListener("touchstart", handleUserInteraction)
          document.removeEventListener("keydown", handleUserInteraction)
          document.removeEventListener("mousemove", handleUserInteraction)
        }
        
        // Listen for multiple interaction types
        document.addEventListener("click", handleUserInteraction, { once: true })
        document.addEventListener("touchstart", handleUserInteraction, { once: true })
        document.addEventListener("keydown", handleUserInteraction, { once: true })
        document.addEventListener("mousemove", handleUserInteraction, { once: true })
      }
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Set volume before trying to play
      audio.volume = 0.7
      
      const handleCanPlay = () => {
        console.log("🎵 Audio can play")
        // Try to play after loader finishes (wait a bit longer)
        setTimeout(() => {
          playAudio()
        }, 1500)
      }

      const handleLoadedData = () => {
        console.log("🎵 Audio data loaded")
      }

      const handleError = (e: Event) => {
        console.error("❌ Audio error:", e)
        const audioEl = e.target as HTMLAudioElement
        if (audioEl.error) {
          console.error("Audio error code:", audioEl.error.code)
          console.error("Audio error message:", audioEl.error.message)
        }
      }

      audio.addEventListener("canplaythrough", handleCanPlay)
      audio.addEventListener("loadeddata", handleLoadedData)
      audio.addEventListener("error", handleError)
      
      // Load the audio
      audio.load()

      // Also try to play after a longer delay as fallback
      const fallbackTimeout = setTimeout(() => {
        if (!hasPlayedRef.current) {
          playAudio()
        }
      }, 3000)

      return () => {
        audio.removeEventListener("canplaythrough", handleCanPlay)
        audio.removeEventListener("loadeddata", handleLoadedData)
        audio.removeEventListener("error", handleError)
        clearTimeout(fallbackTimeout)
      }
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src="/song.mp3"
      preload="auto"
      loop={false}
      crossOrigin="anonymous"
    />
  )
}


"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const reasons = [
  "Your laugh is my favorite sound in the entire world.",
  "You make my heart skip a beat every single day.",
  "I fall in love with you more with each passing moment.",
  "Your eyes are the only stars I need to navigate life.",
  "Your smile makes my whole world brighter.",
  "I'm completely and utterly obsessed with you.",
  "You remember every detail because you truly care.",
  "Your embrace is where I belong—it's my forever home.",
  "You're the most beautiful person I've ever laid eyes on.",
  "You make my heart race and my soul sing.",
  "Your patience with me shows how deeply you love.",
  "You see potential in me that I never knew existed.",
  "I want to share every sunrise and sunset with you.",
  "You understand me in ways no one else ever could.",
  "Your passion for life makes me fall in love all over again.",
  "In your arms, I've found my sanctuary.",
  "Every moment with you feels like a dream come true.",
  "Your thoughtfulness shows me how loved I truly am.",
  "You see beauty in everything, especially in me.",
  "Just being near you makes everything feel right.",
  "I could spend eternity doing nothing with you.",
  "You make me feel like the luckiest person alive.",
  "You're not just my love—you're my everything.",
]

export function LoveNotes() {
  const [showAll, setShowAll] = useState(false)
  const displayedReasons = showAll ? reasons : reasons.slice(0, 12)

  return (
    <section className="relative py-20 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center -mt-18 mb-6 md:mb-12 text-foreground">
          23 tiny reasons I adore you ✨
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="glass-card rounded-2xl p-6 h-full hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">💖</span>
                  <p className="text-lg text-foreground leading-relaxed">{reason}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            size="lg"
            className="glass-card rounded-2xl px-8 py-6 text-lg hover:scale-105 transition-all"
          >
            {showAll ? (
              <>
                Show less <ChevronUp className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                View more <ChevronDown className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

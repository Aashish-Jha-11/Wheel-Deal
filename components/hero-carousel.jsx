"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye, Play, Pause } from "lucide-react"
import ThreeSixtyModal from "./three-sixty-modal"

const images = [
  {
    src: "/futuristic-car-electric-blue.png",
    title: "Tesla Model S Plaid",
    subtitle: "The future of electric performance",
    price: "₹ 1,25,00,000"
  },
  {
    src: "/luxury-sedan-night-city.png", 
    title: "Mercedes EQS",
    subtitle: "Luxury redefined with electric power",
    price: "₹ 1,45,00,000"
  },
  {
    src: "/sportscar-glass-aesthetic.png",
    title: "Porsche Taycan",
    subtitle: "Performance meets sustainability",
    price: "₹ 1,65,00,000"
  }
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [open360, setOpen360] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const touchStartX = useRef(null)

  const next = () => setIndex((i) => (i + 1) % images.length)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [isPlaying])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev()
    touchStartX.current = null
  }

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 3000)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
      <div 
        className="relative aspect-[16/7] w-full" 
        onTouchStart={onTouchStart} 
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          {images.map((image, i) => (
            i === index && (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={`Showcase car ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="w-full max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        {image.title}
                      </h2>
                      <p className="text-lg text-white/80 mb-4">
                        {image.subtitle}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-semibold text-blue-400">
                          {image.price}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setOpen360(true)}
                          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur transition-all hover:bg-white/20"
                          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 10px 30px rgba(0,194,255,0.2)" }}
                        >
                          <Eye className="h-4 w-4" />
                          360° View
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-8 flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20 transition-colors"
            title={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous image"
            onClick={() => {
              prev()
              setIsPlaying(false)
              setTimeout(() => setIsPlaying(true), 3000)
            }}
            className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next image"
            onClick={() => {
              next()
              setIsPlaying(false)
              setTimeout(() => setIsPlaying(true), 3000)
            }}
            className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
          {images.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToSlide(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === index 
                  ? "bg-white scale-125" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: isPlaying ? "100%" : "0%" }}
          transition={{ 
            duration: isPlaying ? 5 : 0,
            ease: "linear"
          }}
        />
      </div>

      <ThreeSixtyModal open={open360} onClose={() => setOpen360(false)} imageSrc={images[index]?.src} />
    </div>
  )
}

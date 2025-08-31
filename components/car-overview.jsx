"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Share2, RotateCw, BarChart3, Star, Zap, Car } from "lucide-react"
import ThreeSixtyModal from "./three-sixty-modal"
import { cars } from "../lib/cars-data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

export default function CarOverview() {
  const favKey = "wheeldeal:favorites"
  const cmpKey = "wheeldeal:compare"
  const [mounted, setMounted] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [compare, setCompare] = useState([])
  const [show360, setShow360] = useState(false)
  const [img360, setImg360] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    setMounted(true)
    try {
      setFavorites(JSON.parse(localStorage.getItem(favKey)) || [])
      setCompare(JSON.parse(localStorage.getItem(cmpKey)) || [])
    } catch {}
  }, [])
  
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(favKey, JSON.stringify(favorites))
    } catch {}
  }, [favorites, mounted])
  
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(cmpKey, JSON.stringify(compare))
    } catch {}
  }, [compare, mounted])

  const isFav = (id) => favorites.includes(id)
  const toggleFav = (id) => setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const canAddCompare = (slug) => !compare.includes(slug) && compare.length < 3
  const addCompare = (slug) => setCompare((prev) => (prev.includes(slug) || prev.length >= 3 ? prev : [...prev, slug]))
  
  const shareCar = async (slug) => {
    if (!mounted) return
    const url = `${window.location.origin}/cars/${slug}`
    try {
      if (navigator.share) await navigator.share({ title: "WheelDeal Car", url })
      else {
        await navigator.clipboard.writeText(url)
        alert("Link copied!")
      }
    } catch {}
  }

  if (!mounted) {
    return (
      <section id="cars" aria-label="Car overview">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Car className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Popular Picks</h3>
          </div>
          <Link
            href="/cars"
            className="group flex items-center gap-2 text-sm text-white/80 underline-offset-4 hover:text-white transition-colors"
            aria-label="View all cars"
          >
            View all
            <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.slice(0, 6).map((car) => (
            <div
              key={car.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.img || "/placeholder.svg?height=192&width=384&query=high%20tech%20car"}
                  alt={`${car.model} ${car.year}`}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button className="rounded-full bg-black/50 p-2 text-white/80">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                {car.features && car.features.includes("Electric") && (
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur">
                      <Zap className="h-3 w-3" />
                      Electric
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)]">
                  <span className="rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white backdrop-blur truncate block">
                    {car.price}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold mb-1 truncate">{car.model}</h4>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-xs text-white/80">
                        {car.year}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-white/60">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-4 line-clamp-2 flex-shrink-0">{car.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-white/80 mb-4 flex-shrink-0">
                  <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
                    <div className="text-xs text-white/60 mb-1">Mileage</div>
                    <div className="font-medium truncate">{car.mileage}</div>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
                    <div className="text-xs text-white/60 mb-1">Price</div>
                    <div className="font-medium text-blue-400 truncate">{car.price}</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4 flex-shrink-0">
                  <Link
                    href={`/cars/${car.slug}`}
                    className="w-full rounded-lg border border-white/10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-2 text-sm font-medium backdrop-blur text-center block"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/cars/${car.slug}#contact`}
                    className="w-full rounded-lg border border-white/10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-2 text-sm font-medium backdrop-blur text-center block"
                  >
                    Test Drive
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="cars" aria-label="Car overview">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Car className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Popular Picks</h3>
        </div>
        <Link
          href="/cars"
          className="group flex items-center gap-2 text-sm text-white/80 underline-offset-4 hover:text-white transition-colors"
          aria-label="View all cars"
        >
          View all
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.div>
        </Link>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cars.slice(0, 6).map((car, index) => (
          <motion.article
            key={car.id}
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard(car.id)}
            onHoverEnd={() => setHoveredCard(null)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm transition-all duration-300"
            style={{
              boxShadow: hoveredCard === car.id 
                ? "inset 0 0 0 1px rgba(255,255,255,0.15), 0 20px 40px rgba(0,194,255,0.2)" 
                : "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <motion.img
                src={car.img || "/placeholder.svg?height=192&width=384&query=high%20tech%20car"}
                alt={`${car.model} ${car.year}`}
                className="h-48 w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Favorite Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFav(car.id)}
                className={`absolute top-3 right-3 rounded-full p-2 backdrop-blur transition-all duration-300 ${
                  isFav(car.id)
                    ? "bg-red-500/90 text-white shadow-lg"
                    : "bg-black/50 text-white/80 hover:bg-black/70 hover:text-white"
                }`}
                aria-pressed={isFav(car.id)}
              >
                <Heart className={`h-4 w-4 ${isFav(car.id) ? "fill-current" : ""}`} />
              </motion.button>
              
              {/* Electric Badge */}
              {car.features && car.features.includes("Electric") && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="absolute top-3 left-3"
                >
                  <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur">
                    <Zap className="h-3 w-3" />
                    Electric
                  </span>
                </motion.div>
              )}
              
              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="absolute bottom-3 left-3 max-w-[calc(100%-24px)]"
              >
                <span className="rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white backdrop-blur truncate block">
                  {car.price}
                </span>
              </motion.div>
            </div>
            
            <div className="p-4 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold mb-1 truncate">{car.model}</h4>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-xs text-white/80">
                      {car.year}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-white/60">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-white/80 mb-4 line-clamp-2 flex-shrink-0">{car.description}</p>
              
              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-sm text-white/80 mb-4 flex-shrink-0">
                <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
                  <div className="text-xs text-white/60 mb-1">Mileage</div>
                  <div className="font-medium truncate">{car.mileage}</div>
                </div>
                <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
                  <div className="text-xs text-white/60 mb-1">Price</div>
                  <div className="font-medium text-blue-400 truncate">{car.price}</div>
                </div>
              </div>

              {/* Key Specs */}
              {car.specs && (
                <div className="mb-4 flex-shrink-0">
                  <div className="text-xs text-white/60 mb-2">Key Specs</div>
                  <div className="flex flex-wrap gap-1">
                    {car.specs.range && (
                      <span className="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-2 py-1 text-xs">
                        {car.specs.range}
                      </span>
                    )}
                    {car.specs.engine && (
                      <span className="rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-2 py-1 text-xs">
                        {car.specs.engine}
                      </span>
                    )}
                    {car.specs.power && (
                      <span className="rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 px-2 py-1 text-xs">
                        {car.specs.power}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4 flex-shrink-0">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Link
                    href={`/cars/${car.slug}`}
                    className="w-full rounded-lg border border-white/10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-2 text-sm font-medium backdrop-blur hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 text-center block"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,194,255,0.15)" }}
                  >
                    View Details
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Link
                    href={`/cars/${car.slug}#contact`}
                    className="w-full rounded-lg border border-white/10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-2 text-sm font-medium backdrop-blur hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 text-center block"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(122,92,255,0.15)" }}
                  >
                    Test Drive
                  </Link>
                </motion.div>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-wrap items-center gap-1 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (canAddCompare(car.slug)) addCompare(car.slug)
                    else alert("Compare list full (max 3)")
                  }}
                  className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-xs hover:bg-black/40 transition-colors"
                >
                  <BarChart3 className="h-3 w-3" />
                  <span className="hidden sm:inline">Compare</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => shareCar(car.slug)}
                  className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-xs hover:bg-black/40 transition-colors"
                >
                  <Share2 className="h-3 w-3" />
                  <span className="hidden sm:inline">Share</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setImg360(car.img)
                    setShow360(true)
                  }}
                  className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-xs hover:bg-black/40 transition-colors"
                >
                  <RotateCw className="h-3 w-3" />
                  <span className="hidden sm:inline">360°</span>
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <ThreeSixtyModal open={show360} onClose={() => setShow360(false)} imageSrc={img360} />
    </section>
  )
}

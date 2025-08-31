"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react"

export default function ThreeSixtyModal({ open, onClose, imageSrc }) {
  const [deg, setDeg] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)

  useEffect(() => {
    if (!open) {
      setDeg(0)
      setZoom(1)
      setIsAutoRotating(true)
      return
    }
    
    if (isAutoRotating) {
      const id = setInterval(() => setDeg((d) => (d + 2) % 360), 50)
      return () => clearInterval(id)
    }
  }, [open, isAutoRotating])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const delta = e.clientX - dragStart
    setDeg(prev => (prev + delta * 0.5) % 360)
    setDragStart(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }

  const resetView = () => {
    setDeg(0)
    setZoom(1)
  }

  const rotateLeft = () => setDeg(prev => (prev - 45) % 360)
  const rotateRight = () => setDeg(prev => (prev + 45) % 360)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="360 degree car view"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="relative w-full max-w-5xl rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl"
            style={{ 
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px rgba(0,0,0,0.5), 0 0 100px rgba(0,194,255,0.3)" 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <RotateCw className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold">360° Interactive View</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                onClick={onClose}
                aria-label="Close 360 view"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Controls */}
            <div className="absolute top-20 right-6 z-10 flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`rounded-full p-3 backdrop-blur transition-all ${
                  isAutoRotating 
                    ? "bg-green-500/80 text-white" 
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
                title={isAutoRotating ? "Stop Auto-rotation" : "Start Auto-rotation"}
              >
                <RotateCw className={`h-4 w-4 ${isAutoRotating ? "animate-spin" : ""}`} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resetView}
                className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20 transition-colors"
                title="Reset View"
              >
                <RotateCcw className="h-4 w-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={rotateLeft}
                className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20 transition-colors"
                title="Rotate Left"
              >
                <RotateCcw className="h-4 w-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={rotateRight}
                className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20 transition-colors"
                title="Rotate Right"
              >
                <RotateCw className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 left-6 z-10 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
                className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
                className="rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Car Display */}
            <div 
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black/40 to-black/20 p-8"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <motion.div
                animate={{ 
                  rotateY: deg,
                  scale: zoom
                }}
                transition={{ 
                  rotateY: { duration: isAutoRotating ? 0.05 : 0.3, ease: "linear" },
                  scale: { duration: 0.2 }
                }}
                className="flex justify-center"
              >
                <img
                  src={imageSrc || "/placeholder.svg"}
                  alt="Car 360 view"
                  className="h-96 w-auto max-w-full select-none object-contain"
                  draggable={false}
                />
              </motion.div>
              
              {/* Rotation Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <span className="text-xs text-white/80">
                    {Math.round(deg)}° • {Math.round(zoom * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/70">
                {isAutoRotating 
                  ? "Auto-rotating • Click to pause • Drag to rotate manually • Scroll to zoom"
                  : "Drag to rotate • Scroll to zoom • Click play to auto-rotate"
                }
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

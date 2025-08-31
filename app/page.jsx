"use client"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Shield, Zap, Star } from "lucide-react"
import Navbar from "../components/navbar"
import HeroCarousel from "../components/hero-carousel"
import EMICalculator from "../components/emi-calculator"
import CarOverview from "../components/car-overview"
import Footer from "../components/footer"

const features = [
  {
    icon: Shield,
    title: "Certified Quality",
    description: "200+ point quality check, transparent history, no hidden surprises"
  },
  {
    icon: Zap,
    title: "Electric Focus",
    description: "Premium electric vehicles with cutting-edge technology"
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "Doorstep test drives, flexible financing, expert support"
  }
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      {/* Enhanced Background accents */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(0,194,255,0.35), transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(122,92,255,0.35), transparent 70%)" }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-8 md:pt-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Futuristic Car Marketplace</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              Drive the Future.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Explore Certified Used Cars
              </span>
              <br />
              with Confidence.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-white/80 mb-6"
            >
              Discover premium electric and luxury vehicles with transparent pricing, 
              comprehensive quality checks, and seamless financing options.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.a
              href="/tools/emi-calculator"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 text-sm backdrop-blur transition-all hover:from-blue-500/30 hover:to-purple-500/30"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,194,255,0.15)" }}
            >
              Calculate EMI
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <HeroCarousel />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">WheelDeal</span>?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We're redefining the car buying experience with cutting-edge technology and transparent processes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm transition-all duration-300"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,0,0,0.3)" }}
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EMI + Overview Section */}
      <section id="emi" className="mx-auto w-full max-w-6xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <EMICalculator />
          <CarOverview />
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}

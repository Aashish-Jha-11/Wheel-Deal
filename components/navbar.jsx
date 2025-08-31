"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Car, Calculator, Heart, BarChart3, Home, Phone } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/cars", label: "Cars", icon: Car },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/compare", label: "Compare", icon: BarChart3 },
    { href: "/tools/emi-calculator", label: "EMI Calculator", icon: Calculator },
    { href: "#contact", label: "Contact", icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-40">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mt-4 flex w-[min(100%,92rem)] items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(122,92,255,0.12)" }}
        aria-label="Primary"
      >
        <motion.a 
          href="/" 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="h-8 w-8 rounded-lg"
            style={{ background: "linear-gradient(135deg, #00C2FF 0%, #7A5CFF 100%)" }}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
          <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            WheelDeal
          </span>
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden rounded-md border border-white/10 bg-white/10 p-2 backdrop-blur hover:bg-white/15 transition-colors"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <motion.a
                href={item.href}
                className="group flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                {item.label}
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 w-[min(100%,92rem)] rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl md:hidden"
          >
            <motion.ul 
              className="flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <motion.a
                    href={item.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                    onClick={() => setOpen(false)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-4 w-4 opacity-60" />
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

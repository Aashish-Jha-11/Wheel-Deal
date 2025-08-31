"use client"
import { motion } from "framer-motion"
import { Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  const [currentYear, setCurrentYear] = useState("")

  useEffect(() => {
    setMounted(true)
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Cars" },
    { href: "/tools/emi-calculator", label: "EMI Calculator" },
    { href: "#contact", label: "Contact" },
  ]

  const socialLinks = [
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Youtube, label: "YouTube" },
  ]

  const contactInfo = [
    { icon: Phone, text: "+91 12345 12345", href: "tel:+911234512345" },
    { icon: Mail, text: "hello@wheeldeal.com", href: "mailto:hello@wheeldeal.com" },
    { icon: MapPin, text: "Mumbai, Maharashtra", href: "#" },
  ]

  if (!mounted) {
    return (
      <footer id="contact" className="mx-auto mt-20 w-full max-w-6xl px-4 pb-10 pt-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Placeholder content for SSR */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
                <span className="text-xl font-bold">WheelDeal</span>
              </div>
              <p className="text-sm text-white/80 mb-4">
                A futuristic, transparent way to buy certified used cars with cutting-edge technology and premium service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer id="contact" className="mx-auto mt-20 w-full max-w-6xl px-4 pb-10 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,194,255,0.12)" }}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="h-8 w-8 rounded-lg"
                style={{ background: "linear-gradient(135deg, #00C2FF 0%, #7A5CFF 100%)" }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                WheelDeal
              </span>
            </div>
            <p className="text-sm text-white/80 mb-4">
              A futuristic, transparent way to buy certified used cars with cutting-edge technology and premium service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.text}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <contact.icon className="h-4 w-4" />
                  {contact.text}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Car Inspection",
                "Test Drive Booking",
                "EMI Calculator",
                "Car Comparison",
                "Financing Options",
                "Insurance Support"
              ].map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm text-white/80">{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-lg border border-white/10 bg-white/10 p-3 hover:bg-white/20 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <p className="text-xs text-white/70 mb-3">
                Stay updated with the latest cars and offers
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-blue-400 transition-colors"
                  suppressHydrationWarning
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium transition-all hover:from-blue-600 hover:to-purple-600"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 border-t border-white/10 pt-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <div>
              © {currentYear} WheelDeal. All rights reserved. Demo experience.
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  onNavigate?: (id: string) => void
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate(id)
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 text-white backdrop-blur-md shadow-md"
      style={{
        backgroundColor: "#051659",
        background: "linear-gradient(135deg, #051659 0%, #08217d 50%, #061966 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-7 h-7 flex-shrink-0 bg-white/10 rounded-md p-0.5"
            >
              <Image
                src="/icon.svg"
                alt="Collab AI logo"
                width={28}
                height={28}
                className="rounded-md"
                priority
              />
            </motion.div>
            <span className="text-[17px] font-bold text-white tracking-tight">
              Collab <span className="text-[#f5b722]">AI</span>
            </span>
          </Link>

          {/* Center navigation links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleScroll("problems")}
              className="px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              Why Collab AI
            </button>
            <button
              onClick={() => handleScroll("for-brands")}
              className="px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              For Brands
            </button>
            {/* <button
              onClick={() => handleScroll("for-creators")}
              className="px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              For Creators
            </button> */}
            <button
              onClick={() => handleScroll("how-it-works")}
              className="px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              How It Works
            </button>
            <Link
              href="/pricing"
              className="px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              Pricing
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10"
            >
              <Link href="/login">Log In</Link>
            </Button>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="sm"
                asChild
                className="rounded-full px-4 text-sm font-bold shadow-lg shadow-black/20 transition-all border border-[#f5b722]/40"
                style={{
                  backgroundColor: "#f5b722",
                  color: "#051659",
                }}
              >
                <Link href="/signup" className="gap-1.5">
                  Get Started <ArrowRight className="w-3.5 h-3.5 text-[#051659]" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              size="sm"
              asChild
              className="rounded-full px-3 text-xs font-bold"
              style={{
                backgroundColor: "#f5b722",
                color: "#051659",
              }}
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 bg-[#051659] px-4 pt-3 pb-5 space-y-2 overflow-hidden"
          >
            <button
              onClick={() => handleScroll("problems")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
            >
              Why Collab AI
            </button>
            <button
              onClick={() => handleScroll("for-brands")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
            >
              For Brands
            </button>
            <button
              onClick={() => handleScroll("for-creators")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
            >
              For Creators
            </button>
            <button
              onClick={() => handleScroll("how-it-works")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
            >
              How It Works
            </button>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
            >
              Pricing
            </Link>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/90 hover:text-white py-2 px-3"
              >
                Log In
              </Link>
              <Button
                size="sm"
                asChild
                className="rounded-full px-4 font-bold"
                style={{
                  backgroundColor: "#f5b722",
                  color: "#051659",
                }}
              >
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

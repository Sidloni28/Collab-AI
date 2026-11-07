"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function FinalCTASection() {
  return (
    <section
      className="relative py-28 sm:py-36 lg:py-40 text-white isolate overflow-hidden"
      style={{
        backgroundColor: "#051659",
        background: "linear-gradient(145deg, #051659 0%, #071f7a 50%, #031045 100%)",
      }}
    >
      {/* Decorative ambient lighting in warm gold & cyan */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, #f5b722 0%, transparent 70%), " +
            "radial-gradient(circle 350px at 85% 85%, #08217d 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-white shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5b722]" />
            ONE PLATFORM. TWO SIDES. BETTER COLLABORATIONS.
          </span>
        </motion.div>

        {/* Main headline with Golden Yellow font */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-7 sm:mb-9 text-white leading-[1.08]"
        >
          Your next great collaboration <br className="hidden sm:inline" />
          <span className="italic font-serif font-normal text-[#f5b722]">
            starts here.
          </span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 font-normal"
        >
          Whether you&apos;re a brand looking for the right creators or a creator searching for meaningful opportunities, Collab AI helps bring the right people together.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <Link
            href="/signup?role=brand"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold shadow-xl shadow-black/40 group transition-all"
            style={{
              backgroundColor: "#f5b722",
              color: "#051659",
            }}
          >
            Get Started as a Brand
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#051659]" />
          </Link>

          <Link
            href="/signup?role=creator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold border border-white/30 bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white transition-all shadow-lg backdrop-blur-sm group"
          >
            Get Started as a Creator
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#f5b722]" />
          </Link>
        </motion.div>

        {/* Reassurance line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 sm:mt-10 text-xs sm:text-sm text-blue-200/80 font-medium"
        >
          Free to get started · Built for brands and creators
        </motion.p>

      </div>
    </section>
  )
}

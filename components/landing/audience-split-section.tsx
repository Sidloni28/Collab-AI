"use client"

import Link from "next/link"
import { ArrowRight, Building2, UserCheck } from "lucide-react"
import { motion } from "framer-motion"

export function AudienceSplitSection() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] lg:min-h-[620px]">
        
        {/* ── LEFT PANEL: FOR BRANDS (Deep Ultramarine Blue with Yellow Accent) ── */}
        <motion.div
          id="for-brands"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white scroll-mt-20 transition-all"
          style={{
            background: "linear-gradient(145deg, #051659 0%, #071f7a 50%, #04124a 100%)",
          }}
        >
          {/* Subtle warm glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none -z-0 blur-3xl"
            style={{
              background: "radial-gradient(circle, #f5b722 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-semibold tracking-wide uppercase mb-8 text-white backdrop-blur-sm">
              <Building2 className="w-3.5 h-3.5 text-[#f5b722]" />
              For Enterprise &amp; D2C Brands
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              For <span className="italic font-serif font-normal text-[#f5b722]">brands.</span>
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-md mb-10">
              Discover niche-based creators, find the right audience, and build meaningful creator partnerships with verified deliverables and transparent milestones.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup?role=brand"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-black/25 group transition-all"
                style={{
                  backgroundColor: "#f5b722",
                  color: "#051659",
                }}
              >
                Explore for brands
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#051659]" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── RIGHT PANEL: FOR CREATORS (Soft Off-White/Ice Surface) ── */}
        <motion.div
          id="for-creators"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[#f7f9fd] text-foreground scroll-mt-20 border-t lg:border-t-0 lg:border-l border-slate-200 transition-all"
        >
          {/* Subtle ambient accent */}
          <div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none -z-0 blur-2xl"
            style={{
              background: "radial-gradient(circle, #051659 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-900/15 bg-blue-900/5 text-xs font-semibold tracking-wide uppercase mb-8 text-[#051659]">
              <UserCheck className="w-3.5 h-3.5 text-[#d99706]" />
              For Micro &amp; Nano Creators
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-[#051659]">
              For <span className="italic font-serif font-normal text-[#d99706]">creators.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md mb-10">
              Discover brand opportunities, showcase your creativity, and find collaborations that match your niche — with guaranteed 50% upfront payment structure.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup?role=creator"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all shadow-md group"
                style={{
                  backgroundColor: "#051659",
                }}
              >
                Explore for creators
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#f5b722]" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Center Floating Pill */}
      <div className="hidden lg:flex absolute left-1/2 bottom-8 -translate-x-1/2 z-20 pointer-events-none">
        <div className="px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-300 shadow-md flex items-center gap-2 text-xs font-semibold text-[#051659] tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-[#f5b722] animate-pulse" />
          One unified collaboration ecosystem
        </div>
      </div>
    </section>
  )
}

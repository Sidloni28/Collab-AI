"use client"

import Link from "next/link"
import { ArrowRight, Building2, UserCheck } from "lucide-react"
import { motion } from "framer-motion"

export function AudienceSplitSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/80">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] lg:min-h-[620px]">
        
        {/* ── LEFT PANEL: FOR BRANDS ── */}
        <motion.div
          id="for-brands"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white scroll-mt-20 transition-all"
          style={{
            background: "linear-gradient(145deg, oklch(0.28 0.16 260) 0%, oklch(0.22 0.13 260) 100%)",
          }}
        >
          {/* Subtle background glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none -z-0"
            style={{
              background: "radial-gradient(circle, oklch(0.52 0.12 185) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-semibold tracking-wide uppercase mb-8 text-white/90">
              <Building2 className="w-3.5 h-3.5 text-white/80" />
              For Enterprise &amp; D2C Brands
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              For <span className="italic font-serif font-normal text-white/95">brands.</span>
            </h2>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-md mb-10">
              Discover niche-based creators, find the right audience, and build meaningful creator partnerships with verified deliverables and transparent milestones.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <Link
              href="/signup?role=brand"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold bg-white text-slate-900 hover:bg-white/90 active:scale-[0.98] transition-all shadow-lg shadow-black/20 group"
            >
              Explore for brands
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* ── RIGHT PANEL: FOR CREATORS ── */}
        <motion.div
          id="for-creators"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-slate-50/80 text-foreground scroll-mt-20 border-t lg:border-t-0 lg:border-l border-border/80 transition-all"
        >
          {/* Subtle background accent */}
          <div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none -z-0"
            style={{
              background: "radial-gradient(circle, oklch(0.35 0.15 260) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wide uppercase mb-8 text-primary">
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              For Micro &amp; Nano Creators
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-foreground">
              For <span className="italic font-serif font-normal text-primary">creators.</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mb-10">
              Discover brand opportunities, showcase your creativity, and find collaborations that match your niche — with guaranteed 50% upfront payment structure.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <Link
              href="/signup?role=creator"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 group"
            >
              Explore for creators
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Center Floating Pill: "one collaboration ecosystem" */}
      <div className="hidden lg:flex absolute left-1/2 bottom-8 -translate-x-1/2 z-20 pointer-events-none">
        <div className="px-5 py-2 rounded-full bg-background/95 backdrop-blur-md border border-border shadow-md flex items-center gap-2 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          One unified collaboration ecosystem
        </div>
      </div>
    </section>
  )
}

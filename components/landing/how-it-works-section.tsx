"use client"

import Image from "next/image"
import { Sparkles, Check, FileText, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HowItWorksSection() {
  const workflowSteps = [
    {
      step: "01",
      badge: "AI-ASSISTED MATCHING",
      title: "Find creators who fit your brand.",
      description:
        "Discover niche-based creators through AI-assisted recommendations. Find relevant talent based on campaign requirements, audience fit, and engagement signals.",
      bullets: [
        "Niche-based creator recommendations",
        "Audience fit and engagement signals",
        "Focus on high-affinity micro & nano creators",
      ],
    },
    {
      step: "02",
      badge: "50/50 MILESTONE CONTRACT",
      title: "Better payment clarity. Less waiting.",
      description:
        "Creator collaborations should come with clear payment expectations. Collab AI is built around a milestone-based 50/50 payment structure.",
      bullets: [
        "50% upfront paid upon brief agreement",
        "50% released after approved deliverables",
        "Eliminates payment chasing and confusion",
      ],
    },
    {
      step: "03",
      badge: "SHARED WORKSPACE",
      title: "Every collaboration, in one place.",
      description:
        "Bring campaign details, agreed terms, deliverables, and collaboration progress into one organized workspace without scattered messages.",
      bullets: [
        "One centralized campaign room",
        "Direct brief negotiation and locked terms",
        "Live deliverable review and feedback loops",
      ],
    },
  ]

  return (
    <section id="how-it-works" className="relative scroll-mt-20 bg-slate-50/60 py-20 lg:py-28 border-t border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary mb-3.5 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Product Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            How Collab AI makes <br className="hidden sm:inline" />
            <span className="italic font-serif font-normal text-primary">collaboration smarter.</span>
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            From discovering the right creators to creating more transparent collaborations, everything starts with a better way to connect.
          </p>
        </motion.div>

        {/* ── 3-COLUMN PROGRESSIVE WORKFLOW GRID (Fresh layout, zero hiccups) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* ════ CARD 1: SMART DISCOVERY ════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-card border border-border/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group"
          >
            <div>
              {/* Top Step Number & Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black text-primary/25 tracking-tight group-hover:text-primary/40 transition-colors">
                  01
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                  {workflowSteps[0].badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                {workflowSteps[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                {workflowSteps[0].description}
              </p>

              {/* Product UI Mockup */}
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-border/80 shadow-inner mb-6 space-y-2.5">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-border/60">
                  <span className="text-[11px] font-bold text-foreground">Matched Creators</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200">
                    <Sparkles className="w-2.5 h-2.5 text-teal-600" />
                    AI Engine
                  </span>
                </div>

                {/* Priya Mehta */}
                <div className="p-2.5 rounded-xl border border-primary/30 bg-white shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <Image
                        src="/fashion-blogger-female.jpg"
                        alt="Priya Mehta"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover object-top border-2 border-white shadow-xs"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Priya Mehta</p>
                      <p className="text-[10px] text-muted-foreground">Fashion · 28K followers</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-primary bg-primary/5 px-2 py-0.5 rounded">
                    94%
                  </span>
                </div>

                {/* Aarav Shah */}
                <div className="p-2.5 rounded-xl border border-border/70 bg-white shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/video-editor-male.jpg"
                      alt="Aarav Shah"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover object-top"
                    />
                    <div>
                      <p className="text-xs font-bold text-foreground">Aarav Shah</p>
                      <p className="text-[10px] text-muted-foreground">Fitness · 12K followers</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">
                    91%
                  </span>
                </div>
              </div>
            </div>

            {/* Bullets */}
            <div className="pt-4 border-t border-border/60 space-y-2 text-xs">
              {workflowSteps[0].bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════ CARD 2: TRANSPARENT PAYMENTS ════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-card border border-border/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group"
          >
            <div>
              {/* Top Step Number & Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black text-primary/25 tracking-tight group-hover:text-primary/40 transition-colors">
                  02
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {workflowSteps[1].badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                {workflowSteps[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                {workflowSteps[1].description}
              </p>

              {/* Product UI Mockup */}
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-border/80 shadow-inner mb-6 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-[11px] font-bold text-foreground">Deal Terms</span>
                  <span className="text-xs font-black text-foreground">₹20,000 Total</span>
                </div>

                {/* 50/50 breakdown */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-emerald-800">50% Upfront</span>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-emerald-200 text-emerald-900">
                        Paid
                      </span>
                    </div>
                    <p className="text-xs font-black text-emerald-950">₹10,000</p>
                  </div>

                  <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-primary">50% Approval</span>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-primary/15 text-primary">
                        Held
                      </span>
                    </div>
                    <p className="text-xs font-black text-foreground">₹10,000</p>
                  </div>
                </div>

                {/* Quick Checklist */}
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-border/60">
                    <span className="text-foreground font-medium flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                      Brief agreed &amp; locked
                    </span>
                    <span className="text-emerald-700 font-bold text-[10px]">Done</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-border/60">
                    <span className="text-foreground font-medium flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                      50% transferred
                    </span>
                    <span className="text-emerald-700 font-bold text-[10px]">₹10K Paid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bullets */}
            <div className="pt-4 border-t border-border/60 space-y-2 text-xs">
              {workflowSteps[1].bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════ CARD 3: UNIFIED COLLABORATION ════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-card border border-border/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group"
          >
            <div>
              {/* Top Step Number & Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black text-primary/25 tracking-tight group-hover:text-primary/40 transition-colors">
                  03
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-primary border border-primary/20">
                  {workflowSteps[2].badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                {workflowSteps[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                {workflowSteps[2].description}
              </p>

              {/* Product UI Mockup */}
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-border/80 shadow-inner mb-6 space-y-2.5">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-border/60">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-bold text-foreground">Campaign Room</span>
                  </div>
                  <span className="px-2 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-primary border border-primary/20">
                    Active
                  </span>
                </div>

                {/* Deliverables */}
                <div className="p-2 rounded-xl border border-border/70 bg-white flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-foreground">1x Unboxing Reel</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800">
                    Approved
                  </span>
                </div>

                <div className="p-2 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px] font-bold">•</span>
                    <span className="text-[11px] font-semibold text-foreground">2x Story Frames</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-900">
                    Reviewing
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white border border-border/60 text-center">
                  <p className="text-[10px] text-muted-foreground">
                    Guaranteed turnaround: <span className="font-bold text-foreground">Within 24 hours</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bullets */}
            <div className="pt-4 border-t border-border/60 space-y-2 text-xs">
              {workflowSteps[2].bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

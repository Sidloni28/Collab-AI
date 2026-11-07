"use client"

import Image from "next/image"
import { Sparkles, Check, FileText, CheckCircle2 } from "lucide-react"
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
    <section id="how-it-works" className="relative scroll-mt-20 py-20 lg:py-28 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#051659]/20 bg-[#051659]/5 text-xs font-semibold text-[#051659] mb-3.5 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5b722]" />
            Product Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#051659] leading-tight">
            How Collab AI makes <br className="hidden sm:inline" />
            <span className="italic font-serif font-normal text-[#d99706]">collaboration smarter.</span>
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
            From discovering the right creators to creating more transparent collaborations, everything starts with a better way to connect.
          </p>
        </motion.div>

        {/* ── 3-COLUMN PROGRESSIVE WORKFLOW GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* ════ CARD 1: SMART DISCOVERY ════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#051659]/40 transition-all duration-300 group"
          >
            <div>
              {/* Top Step Number & Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black text-[#051659]/20 tracking-tight group-hover:text-[#051659]/40 transition-colors">
                  01
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#051659]/10 text-[#051659] border border-[#051659]/20">
                  {workflowSteps[0].badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#051659] mb-3 leading-snug">
                {workflowSteps[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {workflowSteps[0].description}
              </p>

              {/* Product UI Mockup */}
              <div className="bg-[#f8faff] rounded-2xl p-4 border border-slate-200 shadow-inner mb-6 space-y-2.5">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-200">
                  <span className="text-[11px] font-bold text-[#051659]">Matched Creators</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-[#92400e] px-2 py-0.5 rounded-full border border-amber-200">
                    <Sparkles className="w-2.5 h-2.5 text-[#d99706]" />
                    AI Engine
                  </span>
                </div>

                {/* Priya Mehta */}
                <div className="p-2.5 rounded-xl border-2 border-[#051659]/30 bg-white shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <Image
                        src="/fashion-blogger-female.jpg"
                        alt="Priya Mehta"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover object-top border-2 border-white shadow-xs"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#f5b722] border-2 border-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#051659]">Priya Mehta</p>
                      <p className="text-[10px] text-slate-500">Fashion · 28K followers</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#051659] bg-[#f5b722]/30 px-2 py-0.5 rounded">
                    94%
                  </span>
                </div>

                {/* Aarav Shah */}
                <div className="p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/video-editor-male.jpg"
                      alt="Aarav Shah"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover object-top"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#051659]">Aarav Shah</p>
                      <p className="text-[10px] text-slate-500">Fitness · 12K followers</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    91%
                  </span>
                </div>
              </div>
            </div>

            {/* Bullets */}
            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
              {workflowSteps[0].bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-[#d99706] flex-shrink-0" />
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
            className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#051659]/40 transition-all duration-300 group"
          >
            <div>
              {/* Top Step Number & Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black text-[#051659]/20 tracking-tight group-hover:text-[#051659]/40 transition-colors">
                  02
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#f5b722]/20 text-[#051659] border border-[#f5b722]/50">
                  {workflowSteps[1].badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#051659] mb-3 leading-snug">
                {workflowSteps[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {workflowSteps[1].description}
              </p>

              {/* Product UI Mockup */}
              <div className="bg-[#f8faff] rounded-2xl p-4 border border-slate-200 shadow-inner mb-6 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-[11px] font-bold text-[#051659]">Deal Terms</span>
                  <span className="text-xs font-black text-[#051659]">₹20,000 Total</span>
                </div>

                {/* 50/50 breakdown */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl border border-amber-300 bg-amber-50">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-[#92400e]">50% Upfront</span>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-[#f5b722] text-[#051659]">
                        Paid
                      </span>
                    </div>
                    <p className="text-xs font-black text-[#92400e]">₹10,000</p>
                  </div>

                  <div className="p-2.5 rounded-xl border border-[#051659]/20 bg-[#051659]/5">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-[#051659]">50% Approval</span>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-[#051659]/15 text-[#051659]">
                        Held
                      </span>
                    </div>
                    <p className="text-xs font-black text-[#051659]">₹10,000</p>
                  </div>
                </div>

                {/* Quick Checklist */}
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-[#051659] font-medium flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#f5b722] text-[#051659] flex items-center justify-center text-[9px] font-bold">✓</span>
                      Brief agreed &amp; locked
                    </span>
                    <span className="text-[#051659] font-bold text-[10px]">Done</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-[#051659] font-medium flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#f5b722] text-[#051659] flex items-center justify-center text-[9px] font-bold">✓</span>
                      50% transferred
                    </span>
                    <span className="text-[#051659] font-bold text-[10px]">₹10K Paid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bullets */}
            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
              {workflowSteps[1].bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-[#d99706] flex-shrink-0" />
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
            className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#051659]/40 transition-all duration-300 group"
          >
            <div>
              {/* Top Step Number & Badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black text-[#051659]/20 tracking-tight group-hover:text-[#051659]/40 transition-colors">
                  03
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#051659]/10 text-[#051659] border border-[#051659]/20">
                  {workflowSteps[2].badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#051659] mb-3 leading-snug">
                {workflowSteps[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {workflowSteps[2].description}
              </p>

              {/* Product UI Mockup */}
              <div className="bg-[#f8faff] rounded-2xl p-4 border border-slate-200 shadow-inner mb-6 space-y-2.5">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#051659]" />
                    <span className="text-[11px] font-bold text-[#051659]">Campaign Room</span>
                  </div>
                  <span className="px-2 py-0.2 rounded text-[9px] font-bold bg-[#051659]/10 text-[#051659]">
                    Active
                  </span>
                </div>

                {/* Deliverables */}
                <div className="p-2 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-[#051659]">1x Unboxing Reel</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#f5b722]/30 text-[#051659]">
                    Approved
                  </span>
                </div>

                <div className="p-2 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#f5b722] text-[#051659] flex items-center justify-center text-[8px] font-bold">•</span>
                    <span className="text-[11px] font-semibold text-[#051659]">2x Story Frames</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-[#92400e]">
                    Reviewing
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white border border-slate-200 text-center">
                  <p className="text-[10px] text-slate-500">
                    Turnaround: <span className="font-bold text-[#051659]">Within 24 hours</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bullets */}
            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
              {workflowSteps[2].bullets.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600">
                  <Check className="w-3.5 h-3.5 text-[#d99706] flex-shrink-0" />
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

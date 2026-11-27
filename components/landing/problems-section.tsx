"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProblemsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: "01",
      tag: "FRAGMENTED WORKFLOW",
      title: "01 — Fragmented Workflow",
      headline: "Too many conversations. No single place.",
      description:
        "Brands and creators often manage collaborations across WhatsApp, Instagram DMs, and emails. Campaign requirements, deliverables, discussions, and important details become scattered across multiple conversations.",
      solutionHeading: "One platform. One place to collaborate.",
      solutionText:
        "Collab AI brings brands and creators into one organized ecosystem where collaboration becomes easier to discover, manage, and track.",
      highlight: "Structured deals instead of lost DMs",
      bgClass: "#eef3fb",
    },
    {
      id: "02",
      tag: "CREATOR DISCOVERY",
      title: "02 — Creator Discovery",
      headline: "Influence is more than follower counts.",
      description:
        "Micro and nano creators often build highly engaged, niche-specific communities, but they can remain overlooked when brands rely heavily on follower counts to find collaboration partners.",
      solutionHeading: "Discover creators who actually fit your brand.",
      solutionText:
        "Collab AI uses AI-assisted recommendations to help brands identify creators based on niche relevance, campaign requirements, audience fit, and engagement signals.",
      highlight: "Niche relevance & true alignment",
      bgClass: "#f7f9fd",
    },
    {
      id: "03",
      tag: "CREATOR OPPORTUNITIES",
      title: "03 — Creator Opportunities",
      headline: "Every creator deserves an opportunity.",
      description:
        "Emerging creators have creativity, unique perspectives, and dedicated communities, but finding brands willing to collaborate can be difficult during the early stages of their content creation journey.",
      solutionHeading: "Turn your creativity into opportunities.",
      solutionText:
        "Collab AI helps micro and nano creators discover relevant brand opportunities and build meaningful partnerships.",
      highlight: "Monetize with clear milestones",
      bgClass: "#f0f7f6",
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const panel = panelRef.current
      if (!panel) return

      const slide1 = panel.querySelector(".problems-slide-1")
      const slide2 = panel.querySelector(".problems-slide-2")
      const slide3 = panel.querySelector(".problems-slide-3")

      // Initial state
      gsap.set(slide1, { opacity: 1, y: 0, display: "block" })
      gsap.set(slide2, { opacity: 0, y: 30, display: "none" })
      gsap.set(slide3, { opacity: 0, y: 30, display: "none" })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          pin: true,
          pinSpacing: true,
          start: "center center",
          end: "+=1600",
          scrub: 1,
          anticipatePin: 0,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            const p = self.progress
            if (p < 0.35) {
              setActiveStep(0)
            } else if (p < 0.72) {
              setActiveStep(1)
            } else {
              setActiveStep(2)
            }
          },
        },
      })

      // Slide 1 -> Slide 2
      tl.to({}, { duration: 0.25 })
        .to(slide1, { opacity: 0, y: -25, duration: 0.35, ease: "power2.inOut" })
        .set(slide1, { display: "none" })
        .set(slide2, { display: "block" })
        .to(panel, { backgroundColor: "#f7f9fd", duration: 0.35, ease: "power1.inOut" }, "<")
        .to(slide2, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })
        .to({}, { duration: 0.35 })
        // Slide 2 -> Slide 3
        .to(slide2, { opacity: 0, y: -25, duration: 0.35, ease: "power2.inOut" })
        .set(slide2, { display: "none" })
        .set(slide3, { display: "block" })
        .to(panel, { backgroundColor: "#f0f7f6", duration: 0.35, ease: "power1.inOut" }, "<")
        .to(slide3, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })
        .to({}, { duration: 0.3 })
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="problems" className="relative scroll-mt-20 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading at Top with Yellow Accent */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#051659]/20 bg-[#051659]/5 text-xs font-semibold text-[#051659] mb-3 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5b722]" />
            Why Collab AI
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#051659] leading-tight">
            Creator collaborations deserve a <br className="hidden sm:inline" />
            <span className="italic font-serif font-normal text-[#d99706]">better way.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Great collaborations should not get lost in scattered conversations, missed opportunities, or payment uncertainty.
          </p>
        </div>

        {/* ── DESKTOP PINNED PRESENTATION CARD ── */}
        <div className="hidden lg:block relative py-4">
          <div
            ref={panelRef}
            className="relative w-full max-w-5xl mx-auto rounded-[32px] border border-blue-900/15 p-8 lg:p-10 shadow-xl transition-colors duration-500 overflow-hidden flex items-center"
            style={{ backgroundColor: "#eef3fb", minHeight: "470px" }}
          >
            {/* Main Stage Grid with Right Step Indicator */}
            <div className="w-full grid grid-cols-12 gap-8 items-center">
              
              {/* Central Content Area (11 cols) */}
              <div className="col-span-11 relative flex items-center">
                
                {/* ── SLIDE 1: FRAGMENTED WORKFLOW ── */}
                <div className="problems-slide-1 w-full">
                  <div className="grid grid-cols-12 gap-8 items-center">
                    
                    {/* Visual (Left) */}
                    <div className="col-span-6">
                      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md">
                        <div className="space-y-2 mb-3">
                          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                              IG
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-bold text-[#051659]">Brand Agency DM</span>
                                <span className="text-[10px] text-slate-500">10:42 AM</span>
                              </div>
                              <p className="text-xs text-slate-600 truncate">
                                &quot;Can you send commercial rates for 1 Reel + 2 Stories ASAP?&quot;
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 ml-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                              WA
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-bold text-[#051659]">Marketing Lead WA</span>
                                <span className="text-[10px] text-slate-500">Yesterday</span>
                              </div>
                              <p className="text-xs text-slate-600 truncate">
                                &quot;Uploaded final brief to Drive. Payment invoice goes to finance in 45 days.&quot;
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Collab AI Solution Banner */}
                        <div className="bg-[#051659]/5 border border-[#051659]/20 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-[#051659]/15">
                            <span className="text-xs font-bold text-[#051659]">Collab AI Collaboration Room</span>
                            <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#f5b722] text-[#051659]">
                              Terms Locked
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                              <span className="text-[9px] text-slate-500 block">Deliverables</span>
                              <span className="font-bold text-[#051659] text-xs">1 Reel + 2 Stories</span>
                            </div>
                            <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                              <span className="text-[9px] text-slate-500 block">Deal Value</span>
                              <span className="font-bold text-[#051659] text-xs">₹35,000</span>
                            </div>
                            <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                              <span className="text-[9px] text-[#92400e] block">Upfront Status</span>
                              <span className="font-bold text-[#92400e] text-xs">50% Secured</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content (Right) */}
                    <div className="col-span-6 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#051659] text-[#f5b722] w-fit mb-2.5">
                        {steps[0].tag}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-[#051659] tracking-tight mb-3 leading-tight">
                        {steps[0].headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {steps[0].description}
                      </p>
                      <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs mb-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Check className="w-4 h-4 text-[#d99706] stroke-[2.5]" />
                          <h4 className="text-xs font-bold text-[#051659]">{steps[0].solutionHeading}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {steps[0].solutionText}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#051659]">
                        <span>{steps[0].highlight}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#d99706]" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* ── SLIDE 2: CREATOR DISCOVERY ── */}
                <div className="problems-slide-2 w-full" style={{ display: "none" }}>
                  <div className="grid grid-cols-12 gap-8 items-center">
                    
                    {/* Content (Left) */}
                    <div className="col-span-6 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#051659] text-[#f5b722] w-fit mb-2.5">
                        {steps[1].tag}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-[#051659] tracking-tight mb-3 leading-tight">
                        {steps[1].headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {steps[1].description}
                      </p>
                      <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs mb-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Check className="w-4 h-4 text-[#d99706] stroke-[2.5]" />
                          <h4 className="text-xs font-bold text-[#051659]">{steps[1].solutionHeading}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {steps[1].solutionText}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#051659]">
                        <span>{steps[1].highlight}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#d99706]" />
                      </div>
                    </div>

                    {/* Visual (Right) */}
                    <div className="col-span-6">
                      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md">
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
                          <span className="text-xs font-bold text-[#051659]">Matched Micro-Creators</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#92400e] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <Sparkles className="w-3 h-3 text-[#d99706]" />
                            AI Match Engine
                          </span>
                        </div>

                        {/* Highlighted Match */}
                        <div className="p-2.5 rounded-xl border-2 border-[#051659]/30 bg-[#051659]/5 relative mb-2.5">
                          <span className="absolute -top-2 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#f5b722] text-[#051659]">
                            94% AI Match
                          </span>
                          <div className="flex items-center gap-2.5">
                            <Image
                              src="/fashion-blogger-female.jpg"
                              alt="Priya Mehta"
                              width={38}
                              height={38}
                              className="w-9 h-9 rounded-full object-cover object-top border-2 border-white shadow-xs"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-[#051659]">Priya Mehta</p>
                              <p className="text-[10px] text-slate-500 truncate">
                                Sustainable Fashion · 28K followers · 6.2% Engagement
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Creator 2 */}
                        <div className="p-2 rounded-xl border border-slate-200 bg-white shadow-2xs mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Image
                              src="/video-editor-male.jpg"
                              alt="Aarav Shah"
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full object-cover object-top"
                            />
                            <div>
                              <p className="text-xs font-bold text-[#051659]">Aarav Shah</p>
                              <p className="text-[10px] text-slate-500">Fitness · 12K followers</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-[#051659] bg-[#051659]/5 px-2 py-0.5 rounded border border-[#051659]/10">
                            91% Fit
                          </span>
                        </div>

                        {/* Creator 3 */}
                        <div className="p-2 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Image
                              src="/beauty-makeup-influencer.jpg"
                              alt="Ananya Rao"
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full object-cover object-top"
                            />
                            <div>
                              <p className="text-xs font-bold text-[#051659]">Ananya Rao</p>
                              <p className="text-[10px] text-slate-500">Clean Beauty · 18K followers</p>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-[#051659] bg-[#051659]/5 px-2 py-0.5 rounded border border-[#051659]/10">
                            89% Fit
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ── SLIDE 3: CREATOR OPPORTUNITIES ── */}
                <div className="problems-slide-3 w-full" style={{ display: "none" }}>
                  <div className="grid grid-cols-12 gap-8 items-center">
                    
                    {/* Visual (Left) */}
                    <div className="col-span-6">
                      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md">
                        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm mb-2.5">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#051659]/10 text-[#051659]">
                              Commercial Brief
                            </span>
                            <span className="text-xs font-black text-emerald-800">₹30,000 – ₹50,000</span>
                          </div>
                          <h5 className="text-xs font-bold text-[#051659] mb-0.5">
                            Direct-to-Consumer Organic Beverage
                          </h5>
                          <p className="text-[10px] text-slate-500 mb-2">
                            Seeking wellness micro-creators for product launch
                          </p>
                          <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-xs">
                            <span className="flex items-center gap-1 text-emerald-700 font-medium text-[10px]">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              50% Upfront milestone
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f5b722] text-[#051659]">
                              Apply Now
                            </span>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                              In Review
                            </span>
                            <span className="text-xs font-black text-[#051659]">₹25,000</span>
                          </div>
                          <h5 className="text-xs font-bold text-[#051659] mb-0.5">Sustainable Apparel Line</h5>
                          <p className="text-[10px] text-slate-500">Brand review turnaround within 48h</p>
                        </div>
                      </div>
                    </div>

                    {/* Content (Right) */}
                    <div className="col-span-6 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#051659] text-[#f5b722] w-fit mb-2.5">
                        {steps[2].tag}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-[#051659] tracking-tight mb-3 leading-tight">
                        {steps[2].headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {steps[2].description}
                      </p>
                      <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs mb-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Check className="w-4 h-4 text-[#d99706] stroke-[2.5]" />
                          <h4 className="text-xs font-bold text-[#051659]">{steps[2].solutionHeading}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {steps[2].solutionText}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#051659]">
                        <span>{steps[2].highlight}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#d99706]" />
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* ── VERTICAL STEP INDICATOR ON THE RIGHT ── */}
              <div className="col-span-1 flex flex-col items-center justify-center pl-1">
                <div className="relative flex flex-col items-center gap-5">
                  {/* Connecting Line */}
                  <div className="absolute top-2 bottom-2 w-0.5 bg-slate-300 -z-0" />

                  {steps.map((step, idx) => {
                    const isActive = activeStep === idx
                    return (
                      <div key={step.id} className="relative z-10 flex items-center justify-center">
                        <div
                          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                            isActive
                              ? "bg-[#051659] ring-4 ring-[#f5b722]/50 scale-125"
                              : "bg-white border-2 border-slate-400"
                          }`}
                        >
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#f5b722]" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── MOBILE ACCESSIBLE FALLBACK ── */}
        <div className="lg:hidden space-y-6 mt-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3.5"
              style={{ backgroundColor: step.bgClass }}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#051659] text-[#f5b722]">
                  Step {step.id}
                </span>
                <span className="text-xs font-semibold text-slate-500">{step.tag}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#051659] leading-snug">
                {step.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="text-xs font-bold text-[#051659] mb-1">{step.solutionHeading}</p>
                <p className="text-xs text-slate-600">{step.solutionText}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

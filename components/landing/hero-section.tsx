"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations"

const heroCreators = [
  {
    name: "Priya Mehta",
    handle: "@priyamehta",
    followers: "218K",
    niche: "Fashion",
    photo: "/fashion-blogger-female.jpg",
    match: "Lifestyle Brand",
  },
  {
    name: "James Park",
    handle: "@jamestechreviews",
    followers: "94K",
    niche: "Tech",
    photo: "/tech-content-creator.jpg",
    match: "Consumer App",
  },
  {
    name: "Sophie Laurent",
    handle: "@sophiebeauty",
    followers: "155K",
    niche: "Beauty",
    photo: "/beauty-makeup-influencer.jpg",
    match: "Skincare Brand",
  },
]

interface HeroSectionProps {
  onScrollToHowItWorks?: () => void
}

export function HeroSection({ onScrollToHowItWorks }: HeroSectionProps) {
  const handleScroll = () => {
    if (onScrollToHowItWorks) {
      onScrollToHowItWorks()
      return
    }
    const element = document.getElementById("how-it-works")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 75% 35%, rgba(245, 183, 34, 0.12), transparent 70%), " +
            "radial-gradient(ellipse 60% 45% at 20% 65%, rgba(6, 26, 107, 0.08), transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[56%_44%] gap-10 lg:gap-8 items-center">
          {/* Left column: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-semibold tracking-wide uppercase shadow-2xs"
                style={{
                  background: "rgba(5, 22, 89, 0.06)",
                  borderColor: "rgba(5, 22, 89, 0.18)",
                  color: "#051659",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#f5b722" }}
                  aria-hidden="true"
                />
                Creator × Brand Collaboration
              </span>
            </motion.div>

            {/* Headline with Yellow Accent Font */}
            <motion.h1
              variants={fadeInUp}
              className="font-extrabold leading-[1.08] tracking-tight text-[#051659] mb-6"
              style={{ fontSize: "clamp(38px, 4.8vw, 62px)" }}
            >
              <span className="block">Discover Creators.</span>
              <span className="block">Find Brands.</span>
              <span
                className="block italic font-serif font-normal"
                style={{
                  color: "#d99706",
                  fontSize: "clamp(42px, 5.5vw, 68px)",
                }}
              >
                Collaborate Smarter.
              </span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              variants={fadeInUp}
              className="text-[17px] leading-[1.7] text-slate-700 mb-8 max-w-[480px]"
            >
              Collab AI brings brands and creators together in one organized space.
              Brands discover relevant creators. Creators find meaningful partnership
              opportunities. Built for real collaborations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3.5 mb-9"
            >
              <Button
                id="hero-get-started"
                size="lg"
                asChild
                className="rounded-full px-7 h-12 text-[15px] font-bold shadow-md transition-all border border-[#f5b722]/30 hover:opacity-95"
                style={{
                  background: "#051659",
                  color: "#ffffff",
                  boxShadow: "0 4px 20px rgba(5, 22, 89, 0.25)",
                }}
              >
                <Link href="/signup" className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4 text-[#f5b722]" />
                </Link>
              </Button>
              <Button
                id="hero-see-how"
                size="lg"
                variant="outline"
                className="rounded-full px-7 h-12 text-[15px] font-medium gap-2 border-slate-300 hover:bg-slate-100 text-[#051659]"
                onClick={handleScroll}
              >
                See How It Works
                <ArrowDown className="w-4 h-4 text-[#d99706]" />
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2"
            >
              {[
                "Free to get started",
                "For brands & creators",
                "AI-assisted discovery",
              ].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="w-4 h-4 flex-shrink-0 text-[#d99706]"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] font-medium text-slate-700">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column: Product Preview */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="relative hidden lg:flex flex-col gap-3.5"
            aria-label="Platform preview — illustrative"
          >
            {/* Subtle background decoration */}
            <div
              className="absolute -top-10 -right-10 w-72 h-72 rounded-full border pointer-events-none -z-10"
              style={{ borderColor: "rgba(245, 183, 34, 0.25)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full border pointer-events-none -z-10"
              style={{ borderColor: "rgba(5, 22, 89, 0.15)" }}
              aria-hidden="true"
            />

            {/* Creator Discovery Card */}
            <motion.div
              variants={scaleIn}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xl shadow-blue-950/5"
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[#051659]">
                    Creator Discovery
                  </span>
                  <span
                    className="px-2 py-0.5 text-[11px] font-bold rounded-full border"
                    style={{
                      background: "rgba(245, 183, 34, 0.15)",
                      color: "#92400e",
                      borderColor: "rgba(245, 183, 34, 0.4)",
                    }}
                  >
                    AI-assisted
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  24 matches
                </span>
              </div>

              {/* Creator rows */}
              <div className="divide-y divide-slate-100">
                {heroCreators.map((creator, i) => (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={creator.photo}
                        alt={`${creator.name}, ${creator.niche} creator`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover object-top w-10 h-10 border border-slate-200"
                      />
                      <span
                        className="absolute -bottom-0.5 -right-0.5 w-[11px] h-[11px] rounded-full border-2 border-white"
                        style={{ background: "#f5b722" }}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#051659] truncate">
                        {creator.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {creator.handle} · {creator.followers} followers
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="text-[11px] text-slate-500 block">
                        {creator.niche}
                      </span>
                      <span
                        className="text-[11px] font-bold text-[#b45309]"
                      >
                        {creator.match}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer action */}
              <div className="mt-3 pt-1">
                <span
                  className="flex items-center gap-1 text-[12px] font-bold text-[#051659] hover:underline cursor-pointer"
                >
                  View all 24 matches
                  <ArrowRight className="w-3.5 h-3.5 text-[#d99706]" aria-hidden="true" />
                </span>
              </div>
            </motion.div>

            {/* Brand Campaign Opportunity Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-lg shadow-blue-950/5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5">
                    <span
                      className="inline-block px-2 py-0.5 text-[11px] font-bold rounded-full"
                      style={{
                        background: "rgba(5, 22, 89, 0.08)",
                        color: "#051659",
                      }}
                    >
                      New Opportunity
                    </span>
                  </div>
                  <p className="text-[13px] font-bold text-[#051659] mb-0.5">
                    Sustainable Lifestyle Brand
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Lifestyle &amp; fashion · 50K+ followers · <span className="font-semibold text-emerald-700">₹30K–₹60K</span>
                  </p>
                </div>
                <div
                  className="flex-shrink-0 px-3.5 py-1.5 text-[12px] font-bold rounded-full text-[#051659] cursor-pointer hover:opacity-90 transition-opacity shadow-xs"
                  style={{ background: "#f5b722" }}
                >
                  Explore
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

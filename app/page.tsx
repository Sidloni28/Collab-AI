"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowDown,
  Users,
  Zap,
  BarChart3,
  CreditCard,
  X,
  CheckCircle2,
} from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations"

// ─── Illustrative creator data for the hero product preview ───────────────────
// These are example personas — not real accounts or verifiable claims.
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

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const featureDetails = {
    "Find & Connect": {
      title: "Discover Creators",
      description:
        "Find and connect with creators that align with your brand values and audience.",
      features: [
        "Search by niche, follower count, and engagement rate",
        "View creator profiles and previous campaigns",
        "Direct messaging and collaboration invitations",
        "Automated matching based on brand preferences",
      ],
    },
    "Manage Collaborations": {
      title: "Collaboration Management",
      description:
        "Keep all your campaigns organized in one centralized workspace.",
      features: [
        "Create and manage multiple campaigns simultaneously",
        "Track deliverables and content submissions",
        "Set deadlines and milestones",
        "Communicate directly with influencers",
      ],
    },
    "Track Payments": {
      title: "Payment Tracking",
      description:
        "Automate payments and keep full transparency on all transactions.",
      features: [
        "Secure payment processing between brands and creators",
        "Invoice generation and automated reminders",
        "Payment history and detailed transaction logs",
        "Multiple payment methods supported",
      ],
    },
    "Onboarding Process": {
      title: "Creator Onboarding",
      description:
        "Get started quickly with our comprehensive onboarding process designed for creators.",
      features: [
        "Profile setup and verification in minutes",
        "Portfolio and media uploading",
        "Pricing and availability configuration",
        "Connect your social media accounts",
      ],
    },
  }

  const cards = [
    {
      title: "Find & Connect",
      icon: Users,
      description: "Discover and connect with the perfect creators for your brand.",
    },
    {
      title: "Manage Collaborations",
      icon: Zap,
      description: "Streamline campaign workflows and deliverables in one place.",
    },
    {
      title: "Track Payments",
      icon: CreditCard,
      description: "Automate payments and invoicing between brands and creators.",
    },
    {
      title: "Onboarding Process",
      icon: BarChart3,
      description: "Complete your creator profile and get started earning.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo wordmark */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <Image
                src="/icon.svg"
                alt="Collab AI logo"
                width={28}
                height={28}
                className="rounded-md transition-opacity group-hover:opacity-80"
              />
              <span className="text-[17px] font-bold text-foreground tracking-tight">
                Collab AI
              </span>
            </Link>

            {/* Center navigation */}
            <div className="hidden md:flex items-center gap-0.5">
              <button
                id="nav-for-brands"
                onClick={() => handleSmoothScroll("for-brands")}
                className="px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all cursor-pointer"
              >
                For Brands
              </button>
              <button
                id="nav-for-creators"
                onClick={() => handleSmoothScroll("for-creators")}
                className="px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all cursor-pointer"
              >
                For Creators
              </button>
              <button
                id="nav-features"
                onClick={() => handleSmoothScroll("features")}
                className="px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all cursor-pointer"
              >
                Features
              </button>
              <Link
                href="/pricing"
                className="px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
              >
                Pricing
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                id="nav-get-started"
                size="sm"
                asChild
                className="rounded-full px-4 shadow-sm"
              >
                <Link href="/signup" className="gap-1.5">
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" aria-label="Hero">
        {/* Background: dual-tone soft radial gradients — no glow blobs or animated circles */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 72% 55% at 72% 42%, var(--teal-light), transparent 70%), " +
              "radial-gradient(ellipse 50% 40% at 22% 70%, oklch(0.65 0.15 260 / 0.06), transparent 80%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-[56%_44%] gap-10 lg:gap-6 items-center">

            {/* ── Left column: Copy ─────────────────────────────────────────── */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeInUp} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "oklch(0.96 0.015 260 / 0.55)",
                    borderColor: "oklch(0.35 0.15 260 / 0.18)",
                    color: "oklch(0.35 0.15 260)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "oklch(0.35 0.15 260)" }}
                    aria-hidden="true"
                  />
                  Creator × Brand Collaboration
                </span>
              </motion.div>

              {/* Headline — three distinct lines, third line accented */}
              <motion.h1
                variants={fadeInUp}
                className="font-extrabold leading-[1.08] tracking-tight text-foreground mb-6"
                style={{ fontSize: "clamp(38px, 4.8vw, 62px)" }}
              >
                <span className="block">Discover Creators.</span>
                <span className="block">Find Brands.</span>
                <span
                  className="block italic"
                  style={{
                    color: "oklch(0.35 0.15 260)",
                    fontSize: "clamp(44px, 5.5vw, 70px)",
                  }}
                >
                  Collaborate Smarter.
                </span>
              </motion.h1>

              {/* Supporting text */}
              <motion.p
                variants={fadeInUp}
                className="text-[17px] leading-[1.7] text-muted-foreground mb-8 max-w-[460px]"
              >
                Collab AI brings brands and creators together in one organized space.
                Brands discover relevant creators. Creators find meaningful partnership
                opportunities. Built for real collaborations.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 mb-9"
              >
                <Button
                  id="hero-get-started"
                  size="lg"
                  asChild
                  className="rounded-full px-7 h-12 text-[15px] font-semibold shadow-md"
                  style={{ boxShadow: "0 4px 20px oklch(0.35 0.15 260 / 0.25)" }}
                >
                  <Link href="/signup" className="gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  id="hero-see-how"
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 h-12 text-[15px] gap-2"
                  onClick={() => handleSmoothScroll("features")}
                >
                  See How It Works
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </motion.div>

              {/* Trust signals — concise, no fabricated stats */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                {[
                  "Free to get started",
                  "For brands & creators",
                  "AI-assisted discovery",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <CheckCircle2
                      className="w-3.5 h-3.5 flex-shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    <span className="text-[13px] text-muted-foreground">{text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right column: Product Preview ─────────────────────────────── */}
            {/* Hidden on mobile — shown from lg breakpoint */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="relative hidden lg:flex flex-col gap-3"
              aria-label="Platform preview — illustrative"
            >
              {/* Decorative rings: subtle, not distracting */}
              <div
                className="absolute -top-12 -right-12 w-80 h-80 rounded-full border pointer-events-none -z-10"
                style={{ borderColor: "var(--teal-light)" }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full border pointer-events-none -z-10"
                style={{ borderColor: "oklch(0.35 0.15 260 / 0.1)" }}
                aria-hidden="true"
              />

              {/* ── Creator Discovery Card ── */}
              <motion.div
                variants={scaleIn}
                className="bg-card border border-border rounded-2xl p-5"
                style={{ boxShadow: "0 8px 40px oklch(0 0 0 / 0.07)" }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-foreground">
                      Creator Discovery
                    </span>
                    {/* AI-assisted badge — teal accent */}
                    <span
                      className="px-2 py-0.5 text-[11px] font-semibold rounded-full border"
                      style={{
                        background: "var(--teal-light)",
                        color: "var(--teal-muted)",
                        borderColor: "oklch(0.78 0.08 185)",
                      }}
                    >
                      AI-assisted
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    24 matches
                  </span>
                </div>

                {/* Creator rows */}
                <div className="divide-y divide-border">
                  {heroCreators.map((creator, i) => (
                    <div key={i} className="flex items-center gap-3 py-3">
                      {/* Avatar with teal online indicator */}
                      <div className="relative flex-shrink-0">
                        <Image
                          src={creator.photo}
                          alt={`${creator.name}, ${creator.niche} creator`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover object-top w-10 h-10"
                        />
                        <span
                          className="absolute -bottom-0.5 -right-0.5 w-[11px] h-[11px] rounded-full border-2 border-card"
                          style={{ background: "var(--teal)" }}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Creator info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-foreground truncate">
                          {creator.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {creator.handle} · {creator.followers} followers
                        </p>
                      </div>

                      {/* Niche + match label */}
                      <div className="flex-shrink-0 text-right">
                        <span className="text-[11px] text-muted-foreground block">
                          {creator.niche}
                        </span>
                        <span
                          className="text-[11px] font-semibold"
                          style={{ color: "var(--teal-muted)" }}
                        >
                          {creator.match}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer action */}
                <div className="mt-3.5 pt-0.5">
                  <span className="flex items-center gap-1 text-[12px] font-medium text-primary">
                    View all 24 matches
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
              </motion.div>

              {/* ── Brand Campaign Opportunity Card ── */}
              <motion.div
                variants={fadeInUp}
                className="bg-card border border-border rounded-2xl p-4"
                style={{ boxShadow: "0 4px 24px oklch(0 0 0 / 0.05)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Opportunity badge — primary indigo */}
                    <div className="mb-2">
                      <span
                        className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full"
                        style={{
                          background: "oklch(0.35 0.15 260 / 0.09)",
                          color: "oklch(0.35 0.15 260)",
                        }}
                      >
                        New Opportunity
                      </span>
                    </div>
                    <p className="text-[13px] font-semibold text-foreground mb-0.5">
                      Sustainable Lifestyle Brand
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Lifestyle &amp; fashion · 50K+ followers · ₹30K–₹60K
                    </p>
                  </div>
                  <button
                    className="flex-shrink-0 px-3.5 py-1.5 text-[12px] font-semibold rounded-full text-primary-foreground transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{ background: "oklch(0.35 0.15 260)" }}
                    aria-label="Explore Sustainable Lifestyle Brand opportunity (illustrative)"
                    tabIndex={-1}
                  >
                    Explore
                  </button>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ─────────────────────────────────────────────────── */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {cards.map((card) => (
            <motion.button
              key={card.title}
              onClick={() => setActiveFeature(card.title)}
              className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-all cursor-pointer hover:shadow-lg text-left group"
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <card.icon className="w-8 h-8 text-primary mb-4 group-hover:text-primary/80 transition" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURE DETAILS MODAL ────────────────────────────────────────────── */}
      {activeFeature && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveFeature(null)}
        >
          <motion.div
            className="bg-background border border-border rounded-lg max-w-2xl w-full p-8 relative"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveFeature(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
              aria-label="Close feature details"
            >
              <X className="w-6 h-6" />
            </button>

            {featureDetails[activeFeature as keyof typeof featureDetails] && (
              <div>
                <h2 className="text-3xl font-bold mb-3">
                  {featureDetails[activeFeature as keyof typeof featureDetails].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featureDetails[activeFeature as keyof typeof featureDetails].description}
                </p>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Key Features:</h3>
                  <ul className="space-y-3">
                    {featureDetails[activeFeature as keyof typeof featureDetails].features.map(
                      (feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button size="lg" asChild>
                    <Link href="/signup?role=brand">Get Started</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setActiveFeature(null)}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ── TESTIMONIALS SECTION ─────────────────────────────────────────────── */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by brands and creators
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              name: "Sarah Chen",
              role: "Brand Manager",
              quote:
                "Collab AI has reduced our campaign setup time by 70%. Highly recommend!",
              company: "TechBrand Inc",
            },
            {
              name: "Alex Martinez",
              role: "Creator",
              quote:
                "Easy payments, clear analytics, and simple to use. Best platform out there.",
              company: "Creative Content",
            },
            {
              name: "Jordan Lee",
              role: "Marketing Director",
              quote:
                "The transparency and ROI tracking have transformed how we measure success.",
              company: "Global Brands Co",
            },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
              variants={scaleIn}
              whileHover={{ y: -4 }}
            >
              <p className="text-foreground mb-4 italic">&quot;{testimonial.quote}&quot;</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                <p className="text-xs text-muted-foreground">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 Collab AI. All rights reserved.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

"use client"

import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemsSection } from "@/components/landing/problems-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { AudienceSplitSection } from "@/components/landing/audience-split-section"
import { FinalCTASection } from "@/components/landing/final-cta-section"
import { Footer } from "@/components/landing/footer"

export default function PreviewLandingPage() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Navbar */}
      <Navbar onNavigate={handleScroll} />

      {/* 2. Hero Section (Preserved) */}
      <HeroSection onScrollToHowItWorks={() => handleScroll("how-it-works")} />

      {/* 3. Problems We Solve */}
      <ProblemsSection />

      {/* 4. How It Works (Guapd-inspired 2-feature storytelling) */}
      <HowItWorksSection />

      {/* 5. For Brands / For Creators Split Section */}
      <AudienceSplitSection />

      {/* 6. Final CTA */}
      <FinalCTASection />

      {/* 7. Footer */}
      <Footer />
    </div>
  )
}


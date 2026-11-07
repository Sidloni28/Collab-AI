"use client"

import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemsSection } from "@/components/landing/problems-section"
import { AudienceSplitSection } from "@/components/landing/audience-split-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
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
    <div
      className="min-h-screen selection:bg-[#f5b722]/30 selection:text-[#051659]"
      style={{
        background: "linear-gradient(180deg, #f4f7fc 0%, #edf2f9 25%, #f7f9fd 60%, #eef3fb 100%)",
      }}
    >
      {/* 1. Deep Ultramarine Blue Navbar with Warm Honey Gold Accent */}
      <Navbar onNavigate={handleScroll} />

      {/* 2. Hero Section (with "Collaborate Smarter" in Golden Yellow font) */}
      <HeroSection onScrollToHowItWorks={() => handleScroll("how-it-works")} />

      {/* 3. Why Collab AI / Problems We Solve */}
      <ProblemsSection />

      {/* 4. Brand & Creator Split Section (Deep Ultramarine + Warm Gold on Left) */}
      <AudienceSplitSection />

      {/* 5. Product Workflow (3-Column Progressive Journey) */}
      <HowItWorksSection />

      {/* 6. Final CTA Section (Deep Ultramarine + "starts here." in Warm Gold) */}
      <FinalCTASection />

      {/* 7. Footer */}
      <Footer />
    </div>
  )
}

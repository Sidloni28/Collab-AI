"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Zap, BarChart3, CreditCard, X } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/animations"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const featureDetails = {
    "Find & Connect": {
      title: "Discover Creators",
      description: "Find and connect with creators that align with your brand values and audience.",
      features: [
        "Search by niche, follower count, and engagement rate",
        "View creator profiles and previous campaigns",
        "Direct messaging and collaboration invitations",
        "Automated matching based on brand preferences",
      ],
    },
    "Manage Collaborations": {
      title: "Collaboration Management",
      description: "Keep all your campaigns organized in one centralized workspace.",
      features: [
        "Create and manage multiple campaigns simultaneously",
        "Track deliverables and content submissions",
        "Set deadlines and milestones",
        "Communicate directly with influencers",
      ],
    },
    "Track Payments": {
      title: "Payment Tracking",
      description: "Automate payments and keep full transparency on all transactions.",
      features: [
        "Secure payment processing between brands and creators",
        "Invoice generation and automated reminders",
        "Payment history and detailed transaction logs",
        "Multiple payment methods supported",
      ],
    },
    "Onboarding Process": {
      title: "Creator Onboarding",
      description: "Get started quickly with our comprehensive onboarding process designed for creators.",
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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-primary">Collab AI</div>
            <div className="hidden md:flex gap-8">
              <button onClick={() => handleSmoothScroll('features')} className="text-sm text-muted-foreground hover:text-foreground transition cursor-pointer">
                Features
              </button>
              <button onClick={() => handleSmoothScroll('testimonials')} className="text-sm text-muted-foreground hover:text-foreground transition cursor-pointer">
                Testimonials
              </button>
              <button onClick={() => handleSmoothScroll('contact')} className="text-sm text-muted-foreground hover:text-foreground transition cursor-pointer">
                Contact
              </button>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
                Pricing
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div className="text-center" variants={staggerContainer} initial="initial" animate="animate">
          <motion.h1 
            className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance"
            variants={fadeInUp}
          >
            Empower Your Creator Marketing
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
            variants={fadeInUp}
          >
            Connect brands with creators. Manage campaigns, track payments, and measure results—all in one platform.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <Button size="lg" asChild>
              <Link href="/signup?role=brand" className="gap-2">
                For Brands <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup?role=creator" className="gap-2">
                For Creators <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
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

      {/* Feature Details Modal */}
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
                    {featureDetails[activeFeature as keyof typeof featureDetails].features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button size="lg" asChild>
                    <Link href="/signup?role=brand">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveFeature(null)}>
                    Learn More
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Testimonials Section */}
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
              quote: "Collab AI has reduced our campaign setup time by 70%. Highly recommend!",
              company: "TechBrand Inc",
            },
            {
              name: "Alex Martinez",
              role: "Creator",
              quote: "Easy payments, clear analytics, and simple to use. Best platform out there.",
              company: "Creative Content",
            },
            {
              name: "Jordan Lee",
              role: "Marketing Director",
              quote: "The transparency and ROI tracking have transformed how we measure success.",
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

      {/* Footer */}
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
                  <Link href="#" className="hover:text-foreground transition">
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
            <p className="text-sm text-muted-foreground text-center">© 2025 Collab AI. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

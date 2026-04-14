"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowLeft, X } from "lucide-react"
import { motion } from "framer-motion"
// Checkout component removed (no Stripe)

export default function PricingPage() {
  const [showCheckout, setShowCheckout] = useState(false)
  const plans = [
    {
      name: "Creator Starter",
      price: "Free",
      description: "Perfect for new creators just starting out",
      features: [
        "Profile creation and verification",
        "Upload up to 5 portfolio pieces",
        "Social media account linking",
        "Basic creator analytics",
        "Access to brand collaborations",
        "Community forum access",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Creator Pro",
      price: "₹499/month",
      description: "For growing creators wanting to maximize earnings",
      features: [
        "Everything in Starter",
        "Unlimited portfolio uploads",
        "Advanced analytics dashboard",
        "Priority brand matching",
        "Custom rate cards",
        "Payment options (Bank, UPI, PayPal)",
        "Weekly earnings reports",
        "Dedicated support",
        "Early access to features",
      ],
      cta: "Upgrade to Pro",
      highlight: true,
    },
  ]

  const onboardingSteps = [
    {
      step: 1,
      title: "Create Profile",
      description: "Set up your creator profile with your bio, niches, and platform links",
    },
    {
      step: 2,
      title: "Add Portfolio",
      description: "Upload your best work samples and media to showcase your creativity",
    },
    {
      step: 3,
      title: "Set Pricing",
      description: "Define your rates and availability for brand collaborations",
    },
    {
      step: 4,
      title: "Connect Socials",
      description: "Link your Instagram, TikTok, YouTube and other social accounts",
    },
    {
      step: 5,
      title: "Start Earning",
      description: "Accept collaboration offers from brands and start earning",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center mb-16">
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Creator Onboarding Plans
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Choose the perfect plan to start your creator journey and begin earning
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
            >
              <Card className={`p-8 flex flex-col h-full ${plan.highlight ? 'border-primary border-2 relative' : ''}`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-2">{plan.price}</p>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => {
                    if (plan.highlight) {
                      setShowCheckout(true)
                    } else {
                      window.location.href = `/signup?role=creator&plan=${plan.name.toLowerCase().replace(' ', '-')}`
                    }
                  }}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Onboarding Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Onboarding Process
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {onboardingSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {idx < onboardingSteps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-border"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              q: "Can I upgrade or downgrade my plan anytime?",
              a: "Yes, you can change your plan at any time. Changes take effect immediately.",
            },
            {
              q: "How do I get paid?",
              a: "We support bank transfers, UPI, and PayPal. Payments are processed weekly.",
            },
            {
              q: "What commission do you take?",
              a: "We take 10% commission on paid collaborations and 15% on barter deals.",
            },
            {
              q: "Can I have multiple portfolios?",
              a: "Yes, Pro creators can manage multiple portfolios for different niches.",
            },
          ].map((faq, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="p-6 border border-border rounded-lg"
            >
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-border mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Creator Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of creators earning through Collab AI</p>
          <Button size="lg" asChild>
            <Link href="/signup?role=creator">Get Started Free</Link>
          </Button>
        </motion.div>
      </section>

      {/* Upgrade Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md relative">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Upgrade to Creator Pro</h2>
              <p className="text-muted-foreground mb-6">Payment integration coming soon!</p>
              <Button onClick={() => setShowCheckout(false)}>Got it</Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <Image
                src="/icon.svg"
                alt="Collab AI logo"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="text-lg font-bold text-foreground tracking-tight">
                Collab AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-4">
              Where brands meet their creators. AI-assisted discovery, milestone-driven transparency, and structured collaborations in one place.
            </p>
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
              Built for micro &amp; nano creators and growing brands
            </span>
          </div>

          {/* Navigation: Platform */}
          <div>
            <h4 className="font-bold text-sm text-foreground mb-4 tracking-tight">Platform</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => handleScroll("how-it-works")}
                  className="hover:text-foreground transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("problems")}
                  className="hover:text-foreground transition-colors cursor-pointer text-left"
                >
                  Why Collab AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("for-brands")}
                  className="hover:text-foreground transition-colors cursor-pointer text-left"
                >
                  For Brands
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("for-creators")}
                  className="hover:text-foreground transition-colors cursor-pointer text-left"
                >
                  For Creators
                </button>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation: Account */}
          <div>
            <h4 className="font-bold text-sm text-foreground mb-4 tracking-tight">Account</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/login" className="hover:text-foreground transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-foreground transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/signup?role=brand" className="hover:text-foreground transition-colors">
                  Brand Onboarding
                </Link>
              </li>
              <li>
                <Link href="/signup?role=creator" className="hover:text-foreground transition-colors">
                  Creator Onboarding
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation: Legal & Trust */}
          <div>
            <h4 className="font-bold text-sm text-foreground mb-4 tracking-tight">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <span className="text-xs text-muted-foreground/80 block">Payment Model:</span>
                <span className="text-xs font-semibold text-foreground">50/50 Milestone Escrow</span>
              </li>
              <li className="pt-2">
                <span className="text-xs text-muted-foreground/80 block">Discovery Engine:</span>
                <span className="text-xs font-semibold text-foreground">Niche Relevance AI</span>
              </li>
              <li className="pt-2">
                <span className="text-xs text-muted-foreground/80 block">Focus:</span>
                <span className="text-xs font-semibold text-foreground">Micro &amp; Nano Talents</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Collab AI. All rights reserved.</p>
          <p className="text-muted-foreground/80">
            Crafted for seamless brand &amp; creator partnerships.
          </p>
        </div>
      </div>
    </footer>
  )
}


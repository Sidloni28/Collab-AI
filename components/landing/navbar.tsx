"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"

interface NavbarProps {
  onNavigate?: (id: string) => void
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate(id)
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image
                src="/icon.svg"
                alt="Collab AI logo"
                width={28}
                height={28}
                className="rounded-md transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <span className="text-[17px] font-bold text-foreground tracking-tight">
              Collab AI
            </span>
          </Link>

          {/* Center navigation links */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleScroll("how-it-works")}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full transition-all cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleScroll("problems")}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full transition-all cursor-pointer"
            >
              Why Collab AI
            </button>
            <button
              onClick={() => handleScroll("for-brands")}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full transition-all cursor-pointer"
            >
              For Brands
            </button>
            <button
              onClick={() => handleScroll("for-creators")}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full transition-all cursor-pointer"
            >
              For Creators
            </button>
            <Link
              href="/pricing"
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-full transition-all"
            >
              Pricing
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Button variant="ghost" size="sm" asChild className="text-sm font-medium">
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="rounded-full px-4 text-sm font-medium shadow-sm"
              style={{ background: "oklch(0.35 0.15 260)" }}
            >
              <Link href="/signup" className="gap-1.5">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              size="sm"
              asChild
              className="rounded-full px-3 text-xs font-medium"
              style={{ background: "oklch(0.35 0.15 260)" }}
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleScroll("how-it-works")}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
          >
            How It Works
          </button>
          <button
            onClick={() => handleScroll("problems")}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
          >
            Why Collab AI
          </button>
          <button
            onClick={() => handleScroll("for-brands")}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
          >
            For Brands
          </button>
          <button
            onClick={() => handleScroll("for-creators")}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
          >
            For Creators
          </button>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
          >
            Pricing
          </Link>
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground py-2 px-3"
            >
              Log In
            </Link>
            <Button
              size="sm"
              asChild
              className="rounded-full px-4"
              style={{ background: "oklch(0.35 0.15 260)" }}
            >
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}


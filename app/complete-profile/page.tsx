"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { User, Instagram, Briefcase, Sparkles } from 'lucide-react'
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

import { Suspense } from "react"

function OnboardingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "creator"
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    socialMediaId: "",
    niche: "",
    followers: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }
      setUserId(user.id)
      setFormData(prev => ({ ...prev, name: user.user_metadata?.full_name || "" }))
    }
    checkUser()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: Record<string, string> = {}
    if (role === "brand" && !formData.brandName) newErrors.brandName = "Company name is required"
    if (role === "creator" && !formData.socialMediaId) newErrors.socialMediaId = "Instagram handle is required"
    if (role === "creator" && !formData.followers) newErrors.followers = "Follower range is required"
    if (!formData.niche) newErrors.niche = "Niche is required"
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      if (!userId) {
        throw new Error("User session not found. Please try logging in again.")
      }
      const supabase = createClient()
      const profileData: any = {
        name: formData.name,
        niche: formData.niche,
      }

      if (role === "brand") {
        profileData.company = formData.brandName
      } else {
        profileData.social_handle = formData.socialMediaId.replace("@", "")
        profileData.social_platform = "Instagram"
        
        // Industry Standard Mapping
        const followerMap: Record<string, { count: number, rating: number }> = {
          "1k-10k": { count: 5000, rating: 90 },
          "10k-50k": { count: 25000, rating: 85 },
          "50k-100k": { count: 75000, rating: 80 },
          "100k+": { count: 150000, rating: 75 }
        }
        const stats = followerMap[formData.followers] || { count: 1000, rating: 70 }
        profileData.followers = stats.count
        profileData.rating = stats.rating
      }

      const { error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", userId)

      if (error) throw error
      
      router.push(role === "brand" ? "/dashboard/brand" : "/dashboard/creator")
    } catch (err: any) {
      console.error("Error completing profile:", err.message || err)
      alert(`Failed to save profile: ${err.message || "Please try again"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Display Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="pl-10"
            />
          </div>
        </div>

        {role === "brand" ? (
          <div>
            <label className="block text-sm font-medium mb-2">Company Name *</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                placeholder="Your Company"
                className="pl-10"
              />
            </div>
            {errors.brandName && <p className="text-xs text-destructive mt-1">{errors.brandName}</p>}
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram Handle *</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  value={formData.socialMediaId}
                  onChange={(e) => setFormData({ ...formData, socialMediaId: e.target.value })}
                  placeholder="yourhandle"
                  className="pl-10"
                />
              </div>
              {errors.socialMediaId && <p className="text-xs text-destructive mt-1">{errors.socialMediaId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Follower Range *</label>
              <select
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
              >
                <option value="">Select range</option>
                <option value="1k-10k">1,000 - 10,000</option>
                <option value="10k-50k">10,000 - 50,000</option>
                <option value="50k-100k">50,000 - 100,000</option>
                <option value="100k+">100,000+</option>
              </select>
              {errors.followers && <p className="text-xs text-destructive mt-1">{errors.followers}</p>}
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">{role === "brand" ? "Industry" : "Niche"} *</label>
          <select
            value={formData.niche}
            onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
          >
            <option value="">Select {role === "brand" ? "industry" : "niche"}</option>
            <option value="Fashion">Fashion</option>
            <option value="Beauty">Beauty</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Fitness">Fitness</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>
          {errors.niche && <p className="text-xs text-destructive mt-1">{errors.niche}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Start Exploring"}
        </Button>
      </form>
    </Card>
  )
}

export default function CompleteProfile() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="text-center mb-8">
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-3xl font-bold mb-2">Complete Your Profile</motion.h1>
          <motion.p variants={fadeInUp} className="text-muted-foreground">Just a few more details to get you started</motion.p>
        </div>

        <motion.div variants={fadeInUp}>
          <Suspense fallback={
            <Card className="p-6 flex flex-col items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Loading onboarding form...</p>
            </Card>
          }>
            <OnboardingForm />
          </Suspense>
        </motion.div>
      </motion.div>
    </div>
  )
}

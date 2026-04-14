"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mail, Lock, User, Building2 } from 'lucide-react'
import { createClient } from "@/lib/supabase/client"
import { GoogleLogo } from "@/components/google-logo"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [role, setRole] = useState<"brand" | "creator" | null>(
    searchParams.get("role") as "brand" | "creator" | null,
  )
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    brandName: "",
    socialMediaPlatform: "",
    socialMediaId: "",
    niche: "",
    followers: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelect = (selectedRole: "brand" | "creator") => {
    setRole(selectedRole)
    setFormData({ name: "", email: "", password: "", confirmPassword: "", brandName: "", socialMediaPlatform: "", socialMediaId: "", niche: "", followers: "" })
    setErrors({})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return

    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (role === "brand" && !formData.brandName) newErrors.brandName = "Brand name is required"
    if (role === "creator" && !formData.socialMediaPlatform) newErrors.socialMediaPlatform = "Platform is required"
    if (role === "creator" && !formData.socialMediaId) newErrors.socialMediaId = "Handle is required"
    if (role === "creator" && !formData.niche) newErrors.niche = "Niche is required"
    if (role === "creator" && !formData.followers) newErrors.followers = "Follower range is required"
    if (role === "creator" && !formData.socialMediaPlatform) newErrors.socialMediaPlatform = "Social media platform is required"
    if (role === "creator" && !formData.socialMediaId) newErrors.socialMediaId = "Social media ID is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: role,
          },
        },
      })

      if (error) {
        setErrors({ submit: error.message })
        return
      }

      if (data.user) {
        const profileData: Record<string, unknown> = {
          id: data.user.id,
          role: role,
          name: formData.name,
          email: formData.email,
        }

        if (role === "brand") {
          profileData.company = formData.brandName
        } else {
          profileData.social_platform = formData.socialMediaPlatform
          profileData.social_handle = formData.socialMediaId.replace('@', '')
          profileData.niche = formData.niche
          
          // Map follower range to numeric value and industry standard rating
          const followerMap: Record<string, { count: number, rating: number }> = {
            "1k-10k": { count: 5000, rating: 90 },
            "10k-50k": { count: 25000, rating: 85 },
            "50k-100k": { count: 75000, rating: 80 },
            "100k+": { count: 150000, rating: 75 }
          }
          const stats = followerMap[formData.followers as string] || { count: 1000, rating: 70 }
          profileData.followers = stats.count 
          profileData.rating = stats.rating
        }

        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(profileData)

        if (profileError) {
          console.error('Profile creation error:', profileError)
        }

        router.push(role === "brand" ? "/dashboard/brand" : "/dashboard/creator")
      }
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ submit: 'An unexpected error occurred' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async (selectedRole: "brand" | "creator") => {
    try {
      setIsLoading(true)
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=${selectedRole}`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Google sign up error:', error)
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to sign up with Google',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join Collab AI</h1>
            <p className="text-muted-foreground">Choose your account type</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelect("brand")}
              className="w-full p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition flex items-center gap-3 text-left"
            >
              <Building2 className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">Brand Account</p>
                <p className="text-sm text-muted-foreground">Find & manage influencer campaigns</p>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("creator")}
              className="w-full p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition flex items-center gap-3 text-left"
            >
              <User className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">Creator Account</p>
                <p className="text-sm text-muted-foreground">Collaborate with brands & earn</p>
              </div>
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with Google</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleGoogleSignUp("brand")}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-border rounded-md bg-background hover:bg-muted transition-colors flex items-center justify-center gap-3 font-medium disabled:opacity-50"
            >
              <GoogleLogo />
              Continue as Brand
            </button>

            <button
              type="button"
              onClick={() => handleGoogleSignUp("creator")}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-border rounded-md bg-background hover:bg-muted transition-colors flex items-center justify-center gap-3 font-medium disabled:opacity-50"
            >
              <GoogleLogo />
              Continue as Creator
            </button>

            <div className="pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground mb-4">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <button
          onClick={() => setRole(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create {role === "brand" ? "Brand" : "Creator"} Account</h1>
          <p className="text-muted-foreground">Get started in less than a minute</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.submit && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="pl-10"
              />
            </div>
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          {role === "brand" && (
            <div>
              <label className="block text-sm font-medium mb-2">Brand Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="Your brand name"
                  className="pl-10"
                />
              </div>
              {errors.brandName && <p className="text-xs text-destructive mt-1">{errors.brandName}</p>}
            </div>
          )}

          {role === "creator" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Social Media Platform</label>
                <select
                  name="socialMediaPlatform"
                  value={formData.socialMediaPlatform}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, socialMediaPlatform: e.target.value }))
                    if (errors.socialMediaPlatform) {
                      setErrors((prev) => ({ ...prev, socialMediaPlatform: "" }))
                    }
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                >
                  <option value="">Select a platform</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Pinterest">Pinterest</option>
                </select>
                {errors.socialMediaPlatform && <p className="text-xs text-destructive mt-1">{errors.socialMediaPlatform}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Social Media ID/Handle</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="socialMediaId"
                    value={formData.socialMediaId}
                    onChange={handleChange}
                    placeholder="yourhandle (without @)"
                    className="pl-10"
                  />
                </div>
                {errors.socialMediaId && <p className="text-xs text-destructive mt-1">{errors.socialMediaId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Follower Range *</label>
                <select
                  name="followers"
                  value={formData.followers}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, followers: e.target.value }))
                    if (errors.followers) {
                      setErrors((prev) => ({ ...prev, followers: "" }))
                    }
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                >
                  <option value="">Select your follower range</option>
                  <option value="1k-10k">1,000 - 10,000 (Nano)</option>
                  <option value="10k-50k">10,000 - 50,000 (Micro)</option>
                  <option value="50k-100k">50,000 - 100,000 (Mid-Tier)</option>
                  <option value="100k+">100,000+ (Macro)</option>
                </select>
                {errors.followers && <p className="text-xs text-destructive mt-1">{errors.followers}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Creator Niche *</label>
                <select
                  name="niche"
                  value={formData.niche}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, niche: e.target.value }))
                    if (errors.niche) {
                      setErrors((prev) => ({ ...prev, niche: "" }))
                    }
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                >
                  <option value="">Select your main niche</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Editor">Editor</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Fitness & Wellness">Fitness & Wellness</option>
                  <option value="Tech & Gadgets">Tech & Gadgets</option>
                  <option value="Travel & Lifestyle">Travel & Lifestyle</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                </select>
                {errors.niche && <p className="text-xs text-destructive mt-1">{errors.niche}</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="pl-10"
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
            {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleGoogleSignUp(role)}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-border rounded-md bg-background hover:bg-muted transition-colors flex items-center justify-center gap-3 font-medium disabled:opacity-50"
          >
            <GoogleLogo />
            Google
          </button>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

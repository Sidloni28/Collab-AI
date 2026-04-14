export interface User {
  id: string
  role: "brand" | "creator"
  name: string
  email: string
  company?: string
  niche?: string
  followers?: number
  rating?: number
  socialMediaPlatform?: string
  socialMediaId?: string
}

export interface Influencer {
  id: string
  name: string
  email: string
  niche: string
  followers: number
  engagement: number
  rating: number
  verified: boolean
  bio: string
  profileImage: string
}

export interface Campaign {
  id: string
  brandId: string
  title: string
  budget: number
  deadline: string
  type: "Paid" | "Barter"
  category: string
  description: string
  status: "Active" | "Completed" | "Pending"
}

export interface Payment {
  id: string
  brandId: string
  influencerId: string
  campaignId: string
  amount: number
  status: "Pending" | "Completed" | "Failed"
  date: string
  brandName?: string
  influencerName?: string
}

export interface Collaboration {
  id: string
  influencerId: string
  campaignId: string
  brandId: string
  type: "Paid" | "Barter"
  compensation: number
  status: "Active" | "Completed" | "Pending"
}

export interface Deliverable {
  id: string
  collaborationId: string
  influencerId: string
  type: "image" | "video"
  filename: string
  url: string
  uploadedAt: string
}

export interface Feedback {
  id: string
  influencerId: string
  brandId: string
  rating: number
  comment: string
  date: string
}

// Demo data
export const DEMO_INFLUENCERS: Influencer[] = [
  {
    id: "inf_1",
    name: "Sarah Anderson",
    email: "sarah@example.com",
    niche: "Fashion",
    followers: 125000,
    engagement: 4.8,
    rating: 4.9,
    verified: true,
    bio: "Fashion enthusiast and style guide",
    profileImage: "/fashion-influencer-female.jpg",
  },
  {
    id: "inf_2",
    name: "John Tech",
    email: "john@example.com",
    niche: "Content Creator",
    followers: 89000,
    engagement: 5.2,
    rating: 4.7,
    verified: true,
    bio: "Tech content creator and reviewer",
    profileImage: "/tech-content-creator.jpg",
  },
  {
    id: "inf_3",
    name: "Emma Beauty",
    email: "emma@example.com",
    niche: "Beauty",
    followers: 234000,
    engagement: 6.1,
    rating: 4.8,
    verified: true,
    bio: "Makeup artist and beauty expert",
    profileImage: "/beauty-makeup-influencer.jpg",
  },
  {
    id: "inf_4",
    name: "Mike Editor",
    email: "mike@example.com",
    niche: "Editor",
    followers: 45000,
    engagement: 7.3,
    rating: 4.9,
    verified: true,
    bio: "Professional video editor",
    profileImage: "/video-editor-male.jpg",
  },
  {
    id: "inf_5",
    name: "Lisa Fashion",
    email: "lisa@example.com",
    niche: "Fashion",
    followers: 156000,
    engagement: 5.5,
    rating: 4.6,
    verified: false,
    bio: "Street style and fashion blogger",
    profileImage: "/fashion-blogger-female.jpg",
  },
]

export const DEMO_CAMPAIGNS: Campaign[] = [
  {
    id: "camp_1",
    brandId: "brand_1",
    title: "Summer Collection Launch",
    budget: 5000,
    deadline: "2025-03-15",
    type: "Paid",
    category: "Product Marketing",
    description: "Launch summer collection with influencers",
    status: "Active",
  },
  {
    id: "camp_2",
    brandId: "brand_1",
    title: "Holiday Campaign",
    budget: 3000,
    deadline: "2025-03-20",
    type: "Barter",
    category: "Video Shoot",
    description: "Holiday season video shoots",
    status: "Active",
  },
  {
    id: "camp_3",
    brandId: "brand_1",
    title: "Brand Awareness",
    budget: 7500,
    deadline: "2025-04-01",
    type: "Paid",
    category: "Product Marketing",
    description: "General brand awareness campaign",
    status: "Pending",
  },
]

export const DEMO_PAYMENTS: Payment[] = [
  {
    id: "pay_1",
    brandId: "brand_1",
    influencerId: "inf_1",
    campaignId: "camp_1",
    amount: 1500,
    status: "Completed",
    date: "2025-02-10",
    brandName: "StyleHub",
    influencerName: "Sarah Anderson",
  },
  {
    id: "pay_2",
    brandId: "brand_1",
    influencerId: "inf_2",
    campaignId: "camp_1",
    amount: 2000,
    status: "Completed",
    date: "2025-02-12",
    brandName: "StyleHub",
    influencerName: "John Tech",
  },
  {
    id: "pay_3",
    brandId: "brand_1",
    influencerId: "inf_3",
    campaignId: "camp_2",
    amount: 1200,
    status: "Pending",
    date: "2025-02-15",
    brandName: "StyleHub",
    influencerName: "Emma Beauty",
  },
]

export const DEMO_COLLABORATIONS: Collaboration[] = [
  {
    id: "collab_1",
    influencerId: "inf_1",
    campaignId: "camp_1",
    brandId: "brand_1",
    type: "Paid",
    compensation: 1500,
    status: "Active",
  },
  {
    id: "collab_2",
    influencerId: "inf_2",
    campaignId: "camp_1",
    brandId: "brand_1",
    type: "Paid",
    compensation: 2000,
    status: "Active",
  },
  {
    id: "collab_3",
    influencerId: "inf_3",
    campaignId: "camp_2",
    brandId: "brand_1",
    type: "Barter",
    compensation: 0,
    status: "Pending",
  },
]

// Auth utilities
export const saveUser = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("userRole", user.role)
    localStorage.setItem("userId", user.id)
  }
}

export const getUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }
  return null
}

export const getUserId = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId")
  }
  return null
}

export const getUserRole = (): "brand" | "creator" | null => {
  if (typeof window !== "undefined") {
    const role = localStorage.getItem("userRole")
    return role as "brand" | "creator" | null
  }
  return null
}

export const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
  }
}

// Dark mode preference storage
export const saveDarkModePreference = (isDark: boolean) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("darkMode", isDark ? "dark" : "light")
  }
}

export const getDarkModePreference = (): "dark" | "light" | null => {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("darkMode") as "dark" | "light") || null
  }
  return null
}

// Demo data retrieval for Find & Connect
export const getInfluencers = (): Influencer[] => {
  return DEMO_INFLUENCERS
}

export const getInfluencersByNiche = (niche: string): Influencer[] => {
  return DEMO_INFLUENCERS.filter((inf) => inf.niche === niche)
}

export const getPaymentsBetweenBrandAndInfluencer = (brandId: string): Payment[] => {
  return DEMO_PAYMENTS.filter((pay) => pay.brandId === brandId)
}

export const getInfluencerEarnings = (influencerId: string): Payment[] => {
  return DEMO_PAYMENTS.filter((pay) => pay.influencerId === influencerId && pay.status === "Completed")
}

// Supabase profile types and helpers
export interface Profile {
  id: string
  role: "brand" | "creator"
  name: string
  email: string
  company?: string
  niche?: string
  followers?: number
  rating?: number
  social_platform?: string
  social_handle?: string
  bio?: string
  verified?: boolean
}

export const getSupabaseProfile = async (): Promise<Profile | null> => {
  if (typeof window === "undefined") return null

  try {
    const { createClient } = await import("@/lib/supabase/client")
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !profile) return null
    return profile as Profile
  } catch {
    return null
  }
}

export const signOutUser = async (): Promise<void> => {
  if (typeof window === "undefined") return
  try {
    const { createClient } = await import("@/lib/supabase/client")
    const supabase = createClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Sign out error:', error)
  }
}


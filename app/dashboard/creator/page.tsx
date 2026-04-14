"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { CreatorSidebar } from "@/components/influencer-sidebar"
import { CreatorDashboardContent } from "@/components/influencer-dashboard-content"
import { createClient } from "@/lib/supabase/client"

export default function CreatorDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }
      setUserId(user.id)
      setIsAuthenticated(true)
    }
    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <CreatorSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <CreatorDashboardContent activeTab={activeTab} userId={userId || ""} />
    </SidebarProvider>
  )
}

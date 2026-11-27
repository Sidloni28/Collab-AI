"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BarChart3, Briefcase, TrendingUp, FileText, DollarSign, MessageSquare, Settings, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { clearAuth, getUser } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

interface CreatorSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function CreatorSidebar({ activeTab, onTabChange }: CreatorSidebarProps) {
  const router = useRouter()
  const [creatorName, setCreatorName] = useState<string>("Creator Account")

  useEffect(() => {
    const user = getUser()
    if (user?.name) {
      setCreatorName(user.name)
    }
  }, [])
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "collabs", label: "Active Collabs", icon: Briefcase },
    { id: "campaigns", label: "Find & Connect", icon: TrendingUp },
    { id: "deliverables", label: "Deliverables", icon: FileText },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
  ]

  const handleLogout = () => {
    clearAuth()
    router.push("/")
  }

  return (
    <Sidebar className="border-r border-[#051659]/10 bg-white">
      <SidebarHeader className="flex flex-row items-center justify-between p-4 border-b border-[#051659]/10 bg-[#051659] text-white">
        <div>
          <h1 className="text-lg font-bold tracking-tight leading-tight">
            Collab <span className="text-[#f5b722]">AI</span>
          </h1>
          <p className="text-[10px] text-white/75 uppercase tracking-wider font-semibold truncate max-w-[140px]">
            {creatorName}
          </p>
        </div>
        <ThemeToggle />
      </SidebarHeader>

      <SidebarContent className="bg-[#f8faff] px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-[#051659]/60 px-2">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      tooltip={item.label}
                      onClick={() => onTabChange(item.id)}
                      isActive={isActive}
                      className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#051659] text-white shadow-sm hover:bg-[#051659] hover:text-white"
                          : "text-slate-700 hover:bg-[#051659]/5 hover:text-[#051659]"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? "text-[#f5b722]" : "text-slate-500"}`} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-[#051659]/60 px-2">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Settings"
                  isActive={activeTab === "settings"}
                  onClick={() => onTabChange("settings")}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    activeTab === "settings"
                      ? "bg-[#051659] text-white shadow-sm hover:bg-[#051659] hover:text-white"
                      : "text-slate-700 hover:bg-[#051659]/5 hover:text-[#051659]"
                  }`}
                >
                  <Settings className={`w-4 h-4 ${activeTab === "settings" ? "text-[#f5b722]" : "text-slate-500"}`} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#051659]/10 bg-[#f8faff] p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl font-medium"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

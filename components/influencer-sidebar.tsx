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
    <Sidebar className="border-r border-slate-200/80 bg-white">
      <SidebarHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-slate-200/80 bg-white">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-[#1e3a8a] leading-tight">
            Collab <span className="text-[#d99706]">AI</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold truncate max-w-[160px]">
            {creatorName}
          </p>
        </div>
        <span className="w-2 h-2 rounded-full bg-[#f5b722]" title="Creator Workspace" />
      </SidebarHeader>

      <SidebarContent className="bg-[#f9fbff] px-2.5 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2.5 mb-1">
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
                      className={`rounded-xl px-3 py-2.5 text-sm transition-all ${
                        isActive
                          ? "bg-[#eef3fb] text-[#1e3a8a] font-semibold border border-[#1e3a8a]/15 shadow-2xs hover:bg-[#eef3fb] hover:text-[#1e3a8a]"
                          : "text-slate-600 font-medium hover:bg-slate-100/80 hover:text-[#1e3a8a]"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? "text-[#d99706]" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-3">
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2.5 mb-1">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Settings"
                  isActive={activeTab === "settings"}
                  onClick={() => onTabChange("settings")}
                  className={`rounded-xl px-3 py-2.5 text-sm transition-all ${
                    activeTab === "settings"
                      ? "bg-[#eef3fb] text-[#1e3a8a] font-semibold border border-[#1e3a8a]/15 shadow-2xs hover:bg-[#eef3fb] hover:text-[#1e3a8a]"
                      : "text-slate-600 font-medium hover:bg-slate-100/80 hover:text-[#1e3a8a]"
                  }`}
                >
                  <Settings className={`w-4 h-4 ${activeTab === "settings" ? "text-[#d99706]" : "text-slate-400"}`} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/80 bg-[#f9fbff] p-3">
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

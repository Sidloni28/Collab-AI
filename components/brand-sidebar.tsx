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
import { BarChart3, Users, Calendar, CreditCard, Settings, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { clearAuth, getUser } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

export function BrandSidebar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const router = useRouter()
  const [brandName, setBrandName] = useState<string>("Brand Account")
  
  useEffect(() => {
    const user = getUser()
    if (user?.company) {
      setBrandName(user.company)
    }
  }, [])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "campaigns", label: "Campaigns", icon: Calendar },
    { id: "find-connect", label: "Find and Connect", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
  ]

  const handleLogout = () => {
    clearAuth()
    router.push("/")
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-bold text-primary leading-tight">Collab AI</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{brandName}</p>
          </div>
          <ThemeToggle />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      isActive={activeTab === item.id}
                      onClick={() => onTabChange(item.id)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Other</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Settings"
                    isActive={activeTab === "settings"}
                    onClick={() => onTabChange("settings")}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}

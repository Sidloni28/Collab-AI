"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminDashboardContent } from "@/components/admin-dashboard-content"

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <AdminDashboardContent />
    </SidebarProvider>
  )
}

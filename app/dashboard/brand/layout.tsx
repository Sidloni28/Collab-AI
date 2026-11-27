import type React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-subtle-theme min-h-screen bg-[#f5f8fd] text-slate-900">
      {children}
    </div>
  )
}

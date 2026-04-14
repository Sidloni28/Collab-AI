"use client"

interface StatusBadgeProps {
  status: "active" | "pending" | "completed" | "rejected" | "suspended" | "draft"
  text?: string
}

const statusConfig = {
  active: { bg: "bg-green-100", text: "text-green-800", label: "Active" },
  pending: { bg: "bg-blue-100", text: "text-blue-800", label: "Pending" },
  completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
  rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
  suspended: { bg: "bg-red-100", text: "text-red-800", label: "Suspended" },
  draft: { bg: "bg-gray-100", text: "text-gray-800", label: "Draft" },
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {text || config.label}
    </span>
  )
}

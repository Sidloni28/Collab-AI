"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, Calendar } from "lucide-react"

interface CampaignCardProps {
  title: string
  brand?: string
  budget: string
  deadline: string
  influencers?: number
  status?: string
  onAction?: () => void
  actionText?: string
}

export function CampaignCard({
  title,
  brand,
  budget,
  deadline,
  influencers,
  status,
  onAction,
  actionText = "View",
}: CampaignCardProps) {
  return (
    <Card className="p-4 flex flex-col">
      <h4 className="font-semibold mb-2">{title}</h4>
      {brand && <p className="text-sm text-muted-foreground mb-4">{brand}</p>}

      <div className="space-y-2 mb-4 flex-1 text-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span>{budget}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>{deadline}</span>
        </div>
        {influencers && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{influencers} influencers</span>
          </div>
        )}
      </div>

      {status && (
        <div className="mb-4">
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">{status}</span>
        </div>
      )}

      <Button onClick={onAction} className="w-full">
        {actionText}
      </Button>
    </Card>
  )
}

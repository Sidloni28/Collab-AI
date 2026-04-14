"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface FeatureShowcaseProps {
  title: string
  description: string
  features: string[]
}

export function FeatureShowcase({ title, description, features }: FeatureShowcaseProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

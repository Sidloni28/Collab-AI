"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CampaignCardProps {
  name: string
  budget: number
  spend: number
  status: "Active" | "Planning" | "Completed"
  deadline: string
}

export function AnimatedCampaignCard({ 
  name, 
  budget, 
  spend, 
  status, 
  deadline 
}: CampaignCardProps) {
  const spendPercentage = (spend / budget) * 100

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4 h-full hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-foreground flex-1">{name}</h4>
          <motion.span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : status === "Planning"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
            }`}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {status}
          </motion.span>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-muted-foreground">Budget Used</span>
              <span className="font-semibold">${spend}K / ${budget}K</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(spendPercentage, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Deadline: <span className="font-medium text-foreground">{deadline}</span>
          </p>
        </div>

        <Button className="w-full" variant="outline" size="sm">
          View Details
        </Button>
      </Card>
    </motion.div>
  )
}

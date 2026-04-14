"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import { PaymentModal } from "@/components/payment-modal"
import { CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Summer Campaign", influencer: "Sarah Fashion", amount: 2000, status: "pending" },
    { id: 2, name: "Fall Series", influencer: "Tech Mike", amount: 5000, status: "pending" },
    { id: 3, name: "Winter Deals", influencer: "Beauty Co", amount: 3500, status: "paid" },
  ])

  const handlePaymentComplete = (campaignId: number) => {
    setCampaigns(campaigns.map((c) => (c.id === campaignId ? { ...c, status: "paid" } : c)))
  }

  const totalAmount = campaigns.filter((c) => c.status === "pending").reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Manage payments to your influencers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">{campaign.influencer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${campaign.amount}</p>
                    <p className={`text-xs mt-1 ${campaign.status === "paid" ? "text-green-600" : "text-yellow-600"}`}>
                      {campaign.status === "paid" ? "✓ Paid" : "Pending"}
                    </p>
                  </div>
                </div>
                {campaign.status === "pending" && (
                  <PaymentModal
                    amount={campaign.amount}
                    influencer={campaign.influencer}
                    campaign={campaign.name}
                    onPaymentComplete={() => handlePaymentComplete(campaign.id)}
                  />
                )}
              </Card>
            ))}
          </div>

          <div>
            <Card className="p-6 sticky top-4">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee (2%)</span>
                  <span>${Math.round(totalAmount * 0.02)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalAmount + Math.round(totalAmount * 0.02)}</span>
                </div>
              </div>

              {totalAmount === 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-900">All payments complete!</p>
                    <p className="text-green-700 text-xs mt-1">No pending invoices at this time.</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

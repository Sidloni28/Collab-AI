"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CreditCard, Loader2 } from "lucide-react"

interface PaymentModalProps {
  amount: number
  influencer: string
  campaign: string
  onPaymentComplete?: () => void
}

export function PaymentModal({ amount, influencer, campaign, onPaymentComplete }: PaymentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handlePayment = async () => {
    setIsLoading(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsOpen(false)
    onPaymentComplete?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <CreditCard className="w-4 h-4" />
          Pay Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Process Payment</DialogTitle>
          <DialogDescription>Complete payment to {influencer}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Payment Summary */}
          <Card className="p-4 bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Campaign</p>
            <p className="font-semibold">{campaign}</p>
            <p className="text-sm text-muted-foreground mt-3 mb-1">Amount</p>
            <p className="text-2xl font-bold">${amount}</p>
          </Card>

          {/* Card Information */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Card Number</label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Expiry Date</label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                  maxLength={5}
                />
              </div>
              <div>
                <label className="text-sm font-medium">CVV</label>
                <Input
                  type="text"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isLoading} className="gap-2">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Processing..." : "Confirm Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

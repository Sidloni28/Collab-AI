"use client"

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
import { FileText, Download } from "lucide-react"
import { Card } from "@/components/ui/card"

interface InvoiceModalProps {
  invoiceId: string
  from: string
  to: string
  amount: number
  date: string
  status: string
}

export function InvoiceModal({ invoiceId, from, to, amount, date, status }: InvoiceModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <FileText className="w-4 h-4" />
          View Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invoice {invoiceId}</DialogTitle>
          <DialogDescription>Invoice details and payment information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">From:</span>
                <span className="font-medium">{from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To:</span>
                <span className="font-medium">{to}</span>
              </div>
              <div className="border-t border-border my-2"></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-bold">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${status === "Paid" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                >
                  {status}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline">Close</Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

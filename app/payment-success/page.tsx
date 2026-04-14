import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
        <p className="text-muted-foreground mb-6">
          Welcome to Creator Pro! Your subscription is now active and you can access all premium features.
        </p>
        
        <div className="bg-muted p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Complete your creator profile</li>
            <li>✓ Upload your portfolio</li>
            <li>✓ Set your rates and availability</li>
            <li>✓ Start connecting with brands</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/dashboard/creator">Go to Creator Dashboard</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Back Home</Link>
          </Button>
        </div>
      </Card>
    </main>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Authentication Error</h1>
          <p className="text-muted-foreground">
            Something went wrong during the authentication process. Please try again.
          </p>
        </div>

        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/login">Try Signing In Again</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/signup">Create a New Account</Link>
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

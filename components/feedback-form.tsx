"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RatingStars } from "@/components/rating-stars"
import { Card } from "@/components/ui/card"

interface FeedbackFormProps {
  onSubmit?: (feedback: { rating: number; text: string }) => void
  placeholder?: string
}

export function FeedbackForm({ onSubmit, placeholder = "Share your feedback..." }: FeedbackFormProps) {
  const [rating, setRating] = useState(0)
  const [text, setText] = useState("")

  const handleSubmit = () => {
    if (rating > 0 && text.trim()) {
      onSubmit?.({ rating, text })
      setRating(0)
      setText("")
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Rate your experience</label>
        <RatingStars rating={rating} onRatingChange={setRating} size="lg" />
      </div>

      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
        />
      </div>

      <Button onClick={handleSubmit} disabled={rating === 0 || !text.trim()} className="w-full">
        Submit Feedback
      </Button>
    </Card>
  )
}

"use client"

import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  onRatingChange?: (rating: number) => void
  size?: "sm" | "md" | "lg"
  readOnly?: boolean
}

export function RatingStars({ rating, onRatingChange, size = "md", readOnly = false }: RatingStarsProps) {
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }[size]

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readOnly && onRatingChange?.(star)}
          disabled={readOnly}
          className="transition-colors"
        >
          <Star className={`${sizeClass} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        </button>
      ))}
    </div>
  )
}

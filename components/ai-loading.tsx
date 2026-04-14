"use client"

import { motion } from "framer-motion"

interface AILoadingProps {
  message?: string
}

export function AILoading({ message = "AI is matching creators..." }: AILoadingProps) {
  const dots = [0, 1, 2]

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex gap-2 mb-4">
        {dots.map((dot) => (
          <motion.div
            key={dot}
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.4,
              delay: dot * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
      <motion.p
        className="text-muted-foreground text-sm"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  )
}

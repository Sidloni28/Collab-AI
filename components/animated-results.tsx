"use client"

import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "@/lib/animations"

interface ResultItem {
  id: string | number
  title: string
  description: string
  [key: string]: any
}

interface AnimatedResultsProps {
  items: ResultItem[]
  children?: (item: ResultItem) => React.ReactNode
}

export function AnimatedResults({ items, children }: AnimatedResultsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-3"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={fadeInUp}
          className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
        >
          {children ? (
            children(item)
          ) : (
            <>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

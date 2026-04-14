"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ReactNode, ComponentProps } from "react"

interface AnimatedButtonProps extends ComponentProps<typeof Button> {
  children: ReactNode
}

export function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button {...props} className="relative overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-white/20"
        />
        {children}
      </Button>
    </motion.div>
  )
}

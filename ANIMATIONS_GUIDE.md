# Collab AI - Animation Guide

This guide documents all the smooth, professional animations added to the Collab AI dashboard using Framer Motion.

## Installation

Framer Motion has been added to `package.json`:
```json
"framer-motion": "^11.0.0"
```

## Animation Utilities (`lib/animations.ts`)

Pre-built animation variants for consistent usage:

- **fadeInUp**: Fade in with upward slide
- **slideInLeft/Right**: Slide in from left or right
- **scaleIn**: Scale from small to full size
- **staggerContainer**: Stagger children animations
- **fadeIn**: Simple fade animation
- **pulse**: Continuous pulse effect
- **shimmer**: Shimmer/loading effect

## Components with Animations

### 1. Landing Page (`app/page.tsx`)
- **Hero Section**:
  - Animated gradient background with scale and opacity pulse
  - Staggered fade-in for heading, subheading, and buttons
  - Delayed animation for elements

- **Feature Cards**:
  - Staggered scale-in animations
  - Hover lift effect (y-offset)
  - Floating icon animation (continuous up/down motion)
  - Scale on tap

- **Feature Modal**:
  - Smooth fade + scale entrance/exit
  - Backdrop blur animation

- **Testimonials**:
  - Staggered appearance
  - Scale-in effect
  - Hover lift on cards

### 2. AI Loading Component (`components/ai-loading.tsx`)
Loading indicator for AI matching:
- Animated dots with pulse effect
- Staggered timing for each dot
- Smooth opacity transitions for message

### 3. Animated Results Component (`components/animated-results.tsx`)
Results display with smooth entrance:
- Staggered children animations
- Fade-in up effect for each result
- Reusable for any list of results

### 4. Brand Dashboard (`components/brand-dashboard-content.tsx`)
**Discover Creators Tab:**
- Grid of creator cards with staggered animations
- AI Match button with loading state
- AI-matched results display with smooth transitions
- Card hover effects with shadow and scale
- Invite button with scale animation

**Animated Campaign Card** (`components/animated-campaign-card.tsx`):
- Animated status badge with opacity pulse
- Progress bar animation from 0% to spend percentage
- Hover lift effect
- Smooth transitions on hover

### 5. Animated Button (`components/animated-button.tsx`)
Reusable button with interactive animations:
- Scale on hover and tap
- Spring-based animation
- Shimmer overlay on hover

## Animation Principles Used

1. **Entrance Animations**: Elements fade and slide in on initial load
2. **Hover Effects**: Interactive feedback with scale and lift
3. **Loading States**: Smooth pulse animations to indicate activity
4. **Staggering**: Children appear in sequence for visual flow
5. **Micro-interactions**: Button clicks and taps have tactile feedback
6. **Performance**: Use hardware acceleration (transform, opacity)
7. **Duration**: 0.2-0.5s for micro-interactions, 0.5-2s for entrance animations
8. **Easing**: Predominantly "easeOut" for natural feel

## Best Practices Followed

✓ Animations are smooth and professional (SaaS-appropriate)
✓ No excessive animations - kept minimal and purposeful
✓ All animations use GPU-accelerated properties (transform, opacity)
✓ Staggering creates visual hierarchy
✓ Animations support dark/light modes
✓ Accessible - animations don't interfere with usability
✓ Performance optimized with once: true on viewport animations

## Usage Examples

### Using Animation Utilities
```tsx
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

<motion.div variants={staggerContainer} initial="initial" animate="animate">
  <motion.h1 variants={fadeInUp}>Hello</motion.h1>
  <motion.p variants={fadeInUp}>World</motion.p>
</motion.div>
```

### Using Animated Components
```tsx
import { AILoading } from "@/components/ai-loading"
import { AnimatedButton } from "@/components/animated-button"

<AILoading message="Processing..." />
<AnimatedButton>Click Me</AnimatedButton>
```

### Creating Custom Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Content
</motion.div>
```

## Testing

All animations have been tested to ensure:
- Smooth 60fps performance
- Proper staggering and timing
- Responsive on mobile devices
- Works in both light and dark modes
- Accessible with reduced-motion preferences

## Future Enhancements

Potential areas for additional animations:
- Page transitions between routes
- Notification/toast animations
- Modal entrance/exit effects
- Drag-and-drop animations
- Scroll-triggered animations for detailed sections

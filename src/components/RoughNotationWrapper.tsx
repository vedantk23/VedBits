import React, { useEffect, useRef, useState } from 'react'
import { annotate, AnnotationType } from 'rough-notation'

interface RoughNotationWrapperProps {
  type: AnnotationType
  color?: string
  strokeWidth?: number
  padding?: number
  multiline?: boolean
  animate?: boolean
  animationDuration?: number
  children: React.ReactNode
}

const RoughNotationWrapper: React.FC<RoughNotationWrapperProps> = ({
  type,
  color = '#007aff',
  strokeWidth = 2,
  padding = 5,
  multiline = true,
  animate = true,
  animationDuration = 800,
  children
}) => {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (elementRef.current && isVisible) {
      const annotation = annotate(elementRef.current, {
        type,
        color,
        strokeWidth,
        padding,
        multiline,
        animationDuration
      })

      if (animate) {
        // Small delay to ensure element is rendered
        const timer = setTimeout(() => {
          annotation.show()
        }, 100)

        return () => {
          clearTimeout(timer)
          annotation.hide()
        }
      }

      return () => {
        annotation.hide()
      }
    }
  }, [type, color, strokeWidth, padding, multiline, animate, animationDuration, isVisible])

  // Use Intersection Observer to trigger animation when element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <span ref={elementRef} style={{ display: 'inline' }}>
      {children}
    </span>
  )
}

export default RoughNotationWrapper
"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01

      const gradient = ctx.createLinearGradient(
        Math.sin(time) * 200,
        Math.cos(time * 0.7) * 200,
        canvas.width + Math.cos(time * 0.5) * 200,
        canvas.height + Math.sin(time * 0.3) * 200,
      )

      gradient.addColorStop(0, `hsl(${220 + Math.sin(time) * 5}, 100%, ${2 + Math.sin(time * 0.5) * 1}%)`) // Deep black-navy
      gradient.addColorStop(0.25, `hsl(${280 + Math.cos(time * 0.8) * 8}, 80%, ${5 + Math.cos(time * 0.3) * 2}%)`) // Very dark purple
      gradient.addColorStop(0.5, `hsl(${200 + Math.sin(time * 0.6) * 6}, 90%, ${8 + Math.sin(time * 0.7) * 3}%)`) // Very dark blue
      gradient.addColorStop(0.75, `hsl(${180 + Math.cos(time * 0.4) * 4}, 85%, ${12 + Math.cos(time * 0.9) * 3}%)`) // Dark teal
      gradient.addColorStop(1, `hsl(${190 + Math.sin(time * 0.9) * 5}, 75%, ${15 + Math.sin(time * 0.2) * 3}%)`) // Slightly lighter dark cyan

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

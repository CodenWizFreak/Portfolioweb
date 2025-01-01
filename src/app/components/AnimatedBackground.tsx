'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TechIcon: React.FC<{ icon: string; x: number; y: number }> = ({ icon, x, y }) => (
  <motion.div
    className="absolute text-blue-300 dark:text-blue-600 opacity-20"
    style={{ fontSize: '24px', x, y }}
    animate={{
      y: [y, y + 50, y],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration: Math.random() * 5 + 5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {icon}
  </motion.div>
)

const Circuit: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <svg
    className="absolute opacity-10"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ left: x, top: y }}
  >
    <path
      d="M10 50 H40 M60 50 H90 M50 10 V40 M50 60 V90"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
)

const BinaryText: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div
    className="absolute text-green-500 dark:text-green-300 opacity-10 font-mono text-xs"
    style={{ left: x, top: y }}
  >
    {Array(10).fill(0).map((_, i) => (
      <div key={i}>{Math.random().toString(2).slice(2, 10)}</div>
    ))}
  </div>
)

export default function AnimatedBackground() {
  const [elements, setElements] = useState<JSX.Element[]>([])

  useEffect(() => {
    const techIcons = ['💻', '🖥️', '📱', '⌨️', '🖱️', '🔌', '💾', '📡']
    const newElements: JSX.Element[] = []

    const generateRandomPosition = () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
    })

    // Create tech icons
    for (let i = 0; i < 20; i++) {
      const { x, y } = generateRandomPosition()
      const icon = techIcons[Math.floor(Math.random() * techIcons.length)]
      newElements.push(<TechIcon key={`icon-${i}`} icon={icon} x={x} y={y} />)
    }

    // Create circuit patterns
    for (let i = 0; i < 15; i++) {
      const { x, y } = generateRandomPosition()
      newElements.push(<Circuit key={`circuit-${i}`} x={x} y={y} />)
    }

    // Create binary text
    for (let i = 0; i < 10; i++) {
      const { x, y } = generateRandomPosition()
      newElements.push(<BinaryText key={`binary-${i}`} x={x} y={y} />)
    }

    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black">
      {elements}
    </div>
  )
}


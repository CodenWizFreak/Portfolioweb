'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { useTheme } from 'next-themes'
import React from 'react'

const navItems = [
  { name: 'Hello World!', target: '#hello' },
  { name: 'About', target: '#about' },
  { name: 'Tech Stack', target: '#skills' },
  { name: 'Projects', target: '#projects' },
  { name: 'Experience', target: '#experience' },
  { name: 'Education', target: '#education' },
  { name: 'Resume', target: '#resume' },
  { name: 'Contact', target: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      
    </motion.header>
  )
}

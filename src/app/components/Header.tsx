/* OLD VERSION

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const navItems = [
  { name: 'Hello', target: 'hello' },
  { name: 'About', target: 'about' },
  { name: 'Skills', target: 'skills' },
  { name: 'Projects', target: 'projects' },
  { name: 'Experience', target: 'experience' },
  { name: 'Education', target: 'education' },
  { name: 'Resume', target: 'resume' },
  { name: 'Contact', target: 'contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

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
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <ul className="flex space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <li key={item.target}>
              <ScrollLink
                to={item.target}
                smooth={true}
                duration={500}
                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                {item.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 hover:-translate-y-1"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </nav>
    </motion.header>
  )
}
*/


'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import React from 'react'

const navItems = [
  { name: 'Hello', target: '#hello' },
  { name: 'About', target: '#about' },
  { name: 'Skills', target: '#skills' },
  { name: 'Projects', target: '#projects' },
  { name: 'Experience', target: '#experience' },
  { name: 'Education', target: '#education' },
  { name: 'Resume', target: '#resume' },
  { name: 'Contact', target: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

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
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <ul className="flex space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <li key={item.target}>
              <AnchorLink
                href={item.target}
                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                {item.name}
              </AnchorLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 hover:-translate-y-1"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </nav>
    </motion.header>
  )
}

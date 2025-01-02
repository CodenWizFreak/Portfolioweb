'use client'
import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-8 border-t border-blue-500 dark:border-pink-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <p>&copy; 2025 Ananyo Dasgupta. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/CodenWizFreak" target="_blank" rel="noopener noreferrer" className="hover-float">
              <FaGithub className="text-2xl hover:text-primary transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/ananyodasgupta2804" target="_blank" rel="noopener noreferrer" className="hover-float">
              <FaLinkedin className="text-2xl hover:text-primary transition-colors" />
            </a>
            <a href="https://x.com/DGAnanyo" target="_blank" rel="noopener noreferrer" className="hover-float">
              <FaTwitter className="text-2xl hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


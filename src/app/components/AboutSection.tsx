'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animated-gradient-text glow-text font-russo">About Me</h2>
          <p className="text-lg mb-4 text-blue-700 dark:text-blue-300 font-russo">
            I&apos;m currently an Android App Developer, dedicated to building intuitive and user-friendly applications. 
            My passion for technology goes beyond just app development—I&apos;m also deeply interested in Data Science and Machine Learning, 
            fields that fuel my curiosity and drive to explore how technology can be used to solve real-world problems.
          </p>
          <p className="text-lg text-blue-700 dark:text-blue-300 font-russo">
            When I&apos;m not coding, you might find me diving into the latest tech trends, 
            debugging my way through challenges, or simply enjoying a good 80s rock playlist (Which you may have already guessed from my choice of songs) :)
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-64 h-64 mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-0 rounded-full glow-gradient-ring">
            <div className="absolute inset-0.5 rounded-full overflow-hidden bg-white dark:bg-gray-800">
              <Image
                src="/profile.jpg"
                alt="Your Name"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

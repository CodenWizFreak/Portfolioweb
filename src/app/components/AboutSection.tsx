'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animated-gradient-text">About Me</h2>
          <p className="text-lg mb-4 text-blue-700 dark:text-blue-300">
          I’m currently an Android App Developer, dedicated to building intuitive and user-friendly applications. 
          My passion for technology goes beyond just app development—I’m also deeply interested in Data Science and Machine Learning, 
          fields that fuel my curiosity and drive to explore how technology can be used to solve real-world problems.
          </p>
          <p className="text-lg text-blue-700 dark:text-blue-300">
          When I’m not coding, you might find me diving into the latest tech trends, 
          debugging my way through challenges, or simply enjoying a good 80s rock playlist. :)
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hover-float"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-64 h-64 mx-auto relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            <div className="absolute inset-2 rounded-full overflow-hidden">
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


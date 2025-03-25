'use client'
import { motion } from 'framer-motion'
import { FaFileDownload, FaLaptopCode, FaServer, FaMobileAlt } from 'react-icons/fa'
import { SiGit } from 'react-icons/si'
import React from 'react'

const skills = [
    { name: 'Mobile App Development (Jetpack Compose, Flutter, React Native)', icon: FaMobileAlt },
    { name: 'Machine Learning (TensorFlow, Scikit-Learn)', icon: FaLaptopCode },
    { name: 'Version Control (Git, GitHub)', icon: SiGit },
    { name: 'Backend Development (Firebase)', icon: FaServer },
  ]
  

export default function ResumeSection() {
  return (
    <section id="resume" className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Resume</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg p-6 card-hover"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-300">Professional Summary</h3>
            <p className="text-gray-800 dark:text-gray-200">
              Experienced app developer with a strong background in creating responsive and user-friendly applications. 
              Also proficient in machine learning technologies and frameworks, with a passion for data analysis.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg p-6 card-hover"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-300">Key Skills</h3>
            <ul className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center text-gray-800 dark:text-gray-200">
                  <skill.icon className="mr-2 text-blue-500 dark:text-blue-400" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <motion.a
            href="/Resume v25.02.08.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 card-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileDownload className="mr-2" />
            Download Full Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}


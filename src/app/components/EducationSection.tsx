'use client'
import { motion } from 'framer-motion'
import React from 'react'
const education = [
  {
    degree: 'Bachelor of Technology in Computer Science (Artificial Intelligence & Machine Learning)',
    school: 'Heritage Institute of Technology, Kolkata',
    year: '2023-2027(expected)',
    eqv: 'Undergraduate Degree',
    grade: 'CGPA: 8.4/10',
  },
  {
    degree: 'High School Diploma (ISC)',
    school: 'The Aryans School, Kolkata',
    year: '2021-2023',
    eqv: 'Equivalent to 12th Grade',
    grade:'Percentage: 92.75%',
  },
  {
    degree: 'Indian Certificate of Secondary Education (ICSE)',
    school: 'The Aryans School, Kolkata',
    year: '2009-2021',
    eqv: 'Equivalent to 10th Grade',
    grade:'Percentage: 97.6%',
  },
  
]

export default function EducationSection() {
  return (
    <section id="education" className="min-h-screen py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Education</h2>
      <div className="max-w-3xl mx-auto">
        {education.map((edu, index) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg p-6 card-hover"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">{edu.degree}</h3>
            <p className="text-blue-500 dark:text-pink-400 mb-2">{edu.school}</p>
            <p className="text-gray-600 dark:text-gray-300">{edu.year}</p>
            <p className="text-gray-600 dark:text-gray-300">{edu.eqv}</p>
            <p className="text-gray-600 dark:text-gray-300">{edu.grade}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


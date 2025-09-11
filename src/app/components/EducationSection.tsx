"use client"
import { motion } from "framer-motion"
import type React from "react"

import { Calendar, MapPin, GraduationCap } from "lucide-react"

const education = [
  {
    degree: "Bachelor of Technology in Computer Science (Artificial Intelligence & Machine Learning)",
    school: "Heritage Institute of Technology, Kolkata",
    year: "2023-2027(expected)",
    eqv: "Undergraduate Degree",
    grade: "CGPA: 8.4/10",
  },
  {
    degree: "High School Diploma (ISC)",
    school: "The Aryans School, Kolkata",
    year: "2021-2023",
    eqv: "Equivalent to 12th Grade",
    grade: "Percentage: 92.75%",
  },
  {
    degree: "Indian Certificate of Secondary Education (ICSE)",
    school: "The Aryans School, Kolkata",
    year: "2009-2021",
    eqv: "Equivalent to 10th Grade",
    grade: "Percentage: 97.6%",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const EducationCard: React.FC<(typeof education)[0]> = ({ degree, school, year, eqv, grade }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    className="mb-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 border border-white/20 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <h3 className="text-xl font-bold mb-2 md:mb-0 text-visible">{degree}</h3>
      <p className="text-sm text-visible-secondary flex items-center">
        <GraduationCap className="w-4 h-4 mr-1" />
        {school}
      </p>
    </div>
    <div className="flex flex-col md:flex-row md:items-center text-sm text-visible-muted mb-4">
      <p className="flex items-center mb-2 md:mb-0 md:mr-4">
        <Calendar className="w-4 h-4 mr-1" />
        {year}
      </p>
      <p className="flex items-center">
        <MapPin className="w-4 h-4 mr-1" />
        {eqv}
      </p>
    </div>
    <p className="text-visible font-semibold">{grade}</p>
  </motion.div>
)

export default function EducationSection() {
  return (
    <section id="education" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center animated-gradient-text">Education</h2>
        <motion.div className="relative" variants={containerVariants} initial="hidden" animate="show">
          {/* Vertical Line */}
          <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-green-500 rounded-full" />
          <div className="ml-6">
            {education.map((edu, index) => (
              <EducationCard key={index} {...edu} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

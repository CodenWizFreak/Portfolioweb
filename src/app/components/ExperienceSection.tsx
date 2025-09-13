"use client"

import { motion } from "framer-motion"
import type React from "react"
import { Calendar, MapPin, Briefcase } from "lucide-react"

const experiences = [
  {
    title: "SDE Intern",
    company: "Bluestock Fintech",
    period: "February 2025 - April 2025",
    location: "Remote",
    description:
      "Developed responsive frontend interfaces using Bootstrap and integrated APIs for real-time financial data processing. Collaborated with backend teams to implement data visualization components for trading analytics.",
  },
  {
    title: "LLM Trainer",
    company: "Outlier.ai",
    period: "Dec 2024 - Mar 2025",
    location: "Remote",
    description:
      "Fine-tuned and trained large language models for various NLP tasks including text generation, sentiment analysis, and question-answering. Worked with transformer architectures, implemented RLHF techniques, and optimized model performance for production deployment.",
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

const ExperienceCard: React.FC<(typeof experiences)[0]> = ({ title, company, period, location, description }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    className="mb-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 border border-white/20 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <h3 className="text-xl font-bold mb-2 md:mb-0 text-visible">{title}</h3>
      <p className="text-sm text-visible-secondary flex items-center">
        <Briefcase className="w-4 h-4 mr-1" />
        {company}
      </p>
    </div>
    <div className="flex flex-col md:flex-row md:items-center text-sm text-visible-muted mb-4">
      <p className="flex items-center mb-2 md:mb-0 md:mr-4">
        <Calendar className="w-4 h-4 mr-1" />
        {period}
      </p>
      <p className="flex items-center">
        <MapPin className="w-4 h-4 mr-1" />
        {location}
      </p>
    </div>
    <p className="text-visible-secondary">{description}</p>
  </motion.div>
)

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center animated-gradient-text">Experience</h2>
        <motion.div className="relative" variants={containerVariants} initial="hidden" animate="show">
          {/* Vertical Line */}
          <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-green-500 rounded-full" />
          <div className="ml-6">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'
import React from 'react'
const experiences = [
    {
      title: 'Web Development Intern',
      company: 'CodSoft',
      period: 'Feb 2024 - Mar 2024',
      description: `
        Created eight tailored sections for my personal web-based portfolio, showcasing expertise in front-end development (CSS/HTML), attracting at least five local businesses for collaboration. Designed and launched a landing page for an E-Book Store, enhancing user engagement by 30% with interactive navigation buttons. Developed a responsive web-based calculator app with HTML, CSS, and JavaScript, enabling basic arithmetic operations.
      `,
    },
    {
      title: 'Android Development Intern',
      company: 'Prodigy Infotech',
      period: 'Feb 2024 - Mar 2024',
      description: `
        Developed an interactive Tic-Tac-Toe game allowing two players to alternate turns on a 3x3 grid. Designed a user-friendly calculator app with day and night mode toggle, achieving a 75% user retention rate within the first month of launch.
      `,
    },
    {
        title: 'LLM Trainer',
        company: 'Outlier.ai',
        period: 'Dec 2024 - Present',
        description: `
            Assisted in the development and refinement of large language models (LLMs) by curating and preparing training data, ensuring it is high-quality, diverse, and representative of various use cases. Provided feedback on model outputs and participated in iterative testing to improve the accuracy, coherence, and relevance of responses. Collaborated with cross-functional teams to identify real-world applications of LLMs, contributing to the development of advanced AI-driven solutions tailored to business needs.        `,
      },
    // Add more experiences as needed
  ]
  
  
  

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Experience</h2>
      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg p-6 card-hover"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">{exp.title}</h3>
            <p className="text-blue-500 dark:text-pink-400 mb-2">{exp.company}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.period}</p>
            <p className="text-gray-800 dark:text-gray-200">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


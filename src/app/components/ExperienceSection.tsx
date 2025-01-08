'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Web Development Intern',
    company: 'CodSoft',
    period: 'Feb 2024 - Mar 2024',
    location: 'Remote',
    description:
      'Developed responsive web applications using modern JavaScript frameworks and libraries.',
  },
  {
    title: 'Android Development Intern',
    company: 'Prodigy Infotech',
    period: 'Feb 2024 - Mar 2024',
    location: 'Remote',
    description:
      'Created native Android applications using Kotlin and implemented Material Design principles.',
  },
  {
    title: 'LLM Trainer',
    company: 'Outlier.ai',
    period: 'Dec 2024 - Present',
    location: 'Remote',
    description:
      'Trained and fine-tuned large language models for various NLP tasks and applications.',
  },
];

// Framer Motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ExperienceCard: React.FC<(typeof experiences)[0]> = ({
  title,
  company,
  period,
  location,
  description,
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    className="mb-8 bg-gradient-to-br from-white/10 to-white/5 dark:from-black/30 dark:to-black/20 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)] dark:hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)]"
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <h3 className="text-xl font-bold mb-2 md:mb-0 text-blue-600 dark:text-blue-300">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
        <Briefcase className="w-4 h-4 mr-1" />
        {company}
      </p>
    </div>
    <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
      <p className="flex items-center mb-2 md:mb-0 md:mr-4">
        <Calendar className="w-4 h-4 mr-1" />
        {period}
      </p>
      <p className="flex items-center">
        <MapPin className="w-4 h-4 mr-1" />
        {location}
      </p>
    </div>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Experience
          </span>
        </h2>
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Vertical Line */}
          <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <div className="ml-6">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

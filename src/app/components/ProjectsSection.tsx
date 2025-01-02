'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import React from 'react'
import Image from 'next/image' // Import the Image component from next/image

const mlDataAnalysisProjects = [
  {
    title: 'Project 1: AQI and Air Pollution Analysis',
    description: 'Developed a solution to analyze AQI and its impact on ecosystems, especially lichens, using optimized CNN models (VGG16, InceptionV3, RCNNs) for image processing. The project includes data collection, model training, and evaluation, deployed via a Streamlit web app.',
    githubLink: 'https://github.com/Anidipta/Google-Solution-23',
    image: '/project1.jpg',
  },
  {
    title: 'Project 2: Hospital Patient Management System',
    description: 'A comprehensive system to optimize patient flow, bed management, and hospital operations using MERN stack, Next.js, PostgreSQL, and Generative AI. It includes appointment scheduling, doctor-patient communication, AI-powered prescription reading, and integrates AWS for deployment.',
    githubLink: 'https://github.com/CodenWizFreak/Curoxis',
    image: '/project2.png',
  },
  {
    title: 'Project 3: Detection of People Talking on Mobile Phones in No-Mobile Zones',
    description: 'A system that detects mobile phone usage in no-mobile zones using YOLOv8x and a hybrid YOLOv8 with ResNetv2 architecture. It triggers alerts and stores offender data in an SQL database to enhance safety in restricted areas.',
    githubLink: 'https://github.com/CodenWizFreak/Hack-Fusion-2k24',
    image: '/project3.jpg',
  },
  {
    title: 'Project 4: Pragati Aid',
    description: 'A disaster preparedness system that predicts natural calamities like heavy rainfall and floods using ML and ARIMA models. It also integrates blockchain for secure, transparent relief fund collection via Ethereum smart contracts, providing district-level weather forecasting and precipitation visualization.',
    githubLink: 'https://github.com/CodenWizFreak/HackSynthesis_Omicode',
    image: '/project4.png',
  },
]

const appDevProjects = [
  {
    title: 'Project 1: Crest – Connect Through Music',
    description: 'Crest is an online music streaming app developed with Kotlin (Jetpack Compose) and Firebase, enabling users to discover music across genres, like songs, and connect with others who share similar tastes. It features secure authentication, a premium subscription for an ad-free experience, and a backend powered by Firebase Realtime Database for user data management.',
    githubLink: 'https://github.com/CodenWizFreak/Crest',
    image: '/project5.jpg',
  },
  {
    title: 'Project 2: Prodigy – Your personalized calculator',
    description: 'Prodigy is a user-friendly calculator app designed to simplify everyday calculations. This app features essential arithmetic functions like addition, subtraction, multiplication, and division. Plus, it includes a day/night mode toggle, allowing you to easily switch between light and dark themes, making it ideal for use in any lighting condition.',
    githubLink: 'https://github.com/CodenWizFreak/PRODIGY_AD_01',
    image: '/project6.png',
  },
]

export default function ProjectsSection() {
  const [currentIndexML, setCurrentIndexML] = useState(0)
  const [currentIndexApp, setCurrentIndexApp] = useState(0)

  const nextProjectML = () => {
    setCurrentIndexML((prevIndex) => (prevIndex + 1) % mlDataAnalysisProjects.length)
  }

  const prevProjectML = () => {
    setCurrentIndexML((prevIndex) => (prevIndex - 1 + mlDataAnalysisProjects.length) % mlDataAnalysisProjects.length)
  }

  const nextProjectApp = () => {
    setCurrentIndexApp((prevIndex) => (prevIndex + 1) % appDevProjects.length)
  }

  const prevProjectApp = () => {
    setCurrentIndexApp((prevIndex) => (prevIndex - 1 + appDevProjects.length) % appDevProjects.length)
  }

  return (
    <section id="projects" className="min-h-screen py-20 flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Projects</h2>
      
      {/* ML & Data Analysis Projects Section */}
      <div className="w-full max-w-4xl mb-12">
        <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-6">Machine Learning & Data Analysis Projects</h3>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndexML}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    className="h-48 w-full object-cover md:w-48"
                    src={mlDataAnalysisProjects[currentIndexML].image}
                    alt={mlDataAnalysisProjects[currentIndexML].title}
                    width={192}
                    height={192}
                    layout="intrinsic"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                    {mlDataAnalysisProjects[currentIndexML].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {mlDataAnalysisProjects[currentIndexML].description}
                  </p>
                  <a
                    href={mlDataAnalysisProjects[currentIndexML].githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-500 dark:text-pink-400 hover:underline"
                  >
                    <FaGithub className="mr-2" />
                    View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevProjectML}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-blue-500 dark:text-pink-400 hover:text-blue-600 dark:hover:text-pink-500 transition-colors"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={nextProjectML}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-blue-500 dark:text-pink-400 hover:text-blue-600 dark:hover:text-pink-500 transition-colors"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* App Development Projects Section */}
      <div className="w-full max-w-4xl">
        <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-6">App Development Projects</h3>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndexApp}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    className="h-48 w-full object-cover md:w-48"
                    src={appDevProjects[currentIndexApp].image}
                    alt={appDevProjects[currentIndexApp].title}
                    width={192}
                    height={192}
                    layout="intrinsic"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                    {appDevProjects[currentIndexApp].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {appDevProjects[currentIndexApp].description}
                  </p>
                  <a
                    href={appDevProjects[currentIndexApp].githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-500 dark:text-pink-400 hover:underline"
                  >
                    <FaGithub className="mr-2" />
                    View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevProjectApp}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-blue-500 dark:text-pink-400 hover:text-blue-600 dark:hover:text-pink-500 transition-colors"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={nextProjectApp}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-blue-500 dark:text-pink-400 hover:text-blue-600 dark:hover:text-pink-500 transition-colors"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaGithub, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"
import Image from "next/image"

const mlDataAnalysisProjects = [
  {
    title: "Project 1: AQI and Air Pollution Analysis",
    description:
      "Developed a solution to analyze AQI and its impact on ecosystems, especially lichens, using optimized CNN models (VGG16, InceptionV3, RCNNs) for image processing. The project includes data collection, model training, and evaluation, deployed via a Streamlit web app.",
    githubLink: "https://github.com/Anidipta/Google-Solution-23",
    image: "/project1.jpg",
    tags: ["CNN", "VGG16", "InceptionV3", "RCNN", "Streamlit", "Image Processing", "Machine Learning"],
  },
  {
    title: "Project 2: Hospital Patient Management System",
    description:
      "A comprehensive system to optimize patient flow, bed management, and hospital operations using MERN stack, Next.js, PostgreSQL, and Generative AI. It includes appointment scheduling, doctor-patient communication, AI-powered prescription reading, and integrates AWS for deployment.",
    githubLink: "https://github.com/CodenWizFreak/Curoxis",
    image: "/project2.png",
    tags: ["MERN Stack", "Next.js", "PostgreSQL", "Generative AI", "AWS", "Healthcare"],
  },
  {
    title: "Project 3: Detection of People Talking on Mobile Phones in No-Mobile Zones",
    description:
      "A system that detects mobile phone usage in no-mobile zones using YOLOv8x and a hybrid YOLOv8 with ResNetv2 architecture. It triggers alerts and stores offender data in an SQL database to enhance safety in restricted areas.",
    githubLink: "https://github.com/CodenWizFreak/Hack-Fusion-2k24",
    image: "/project3.jpg",
    tags: ["YOLOv8x", "YOLOv8", "ResNetv2", "SQL", "Computer Vision", "Object Detection"],
  },
  {
    title: "Project 4: Pragati Aid",
    description:
      "A disaster preparedness system that predicts natural calamities like heavy rainfall and floods using ML and ARIMA models. It also integrates blockchain for secure, transparent relief fund collection via Ethereum smart contracts, providing district-level weather forecasting and precipitation visualization.",
    githubLink: "https://github.com/CodenWizFreak/HackSynthesis_Omicode",
    image: "/project4.png",
    tags: ["Machine Learning", "ARIMA", "Blockchain", "Ethereum", "Smart Contracts", "Weather Forecasting"],
  },
]

const appDevProjects = [
  {
    title: "Project 1: Crest – Connect Through Music",
    description:
      "Crest is an online music streaming app developed with Kotlin (Jetpack Compose) and Firebase, enabling users to discover music across genres, like songs, and connect with others who share similar tastes. It features secure authentication, a premium subscription for an ad-free experience, and a backend powered by Firebase Realtime Database for user data management.",
    githubLink: "https://github.com/CodenWizFreak/Crest",
    image: "/project5.jpg",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Firebase Realtime Database", "Authentication", "Music Streaming"],
  },
  {
    title: "Project 2: Prodigy – Your personalized calculator",
    description:
      "Prodigy is a user-friendly calculator app designed to simplify everyday calculations. This app features essential arithmetic functions like addition, subtraction, multiplication, and division. Plus, it includes a day/night mode toggle, allowing you to easily switch between light and dark themes, making it ideal for use in any lighting condition.",
    githubLink: "https://github.com/CodenWizFreak/PRODIGY_AD_01",
    image: "/project6.jpg",
    tags: ["Mobile App", "UI/UX", "Dark Mode", "Calculator", "Android Development"],
  },
]

export default function ProjectsSection() {
  const [currentIndexML, setCurrentIndexML] = useState(0)
  const [currentIndexApp, setCurrentIndexApp] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<"ml" | "app" | "all">("all")

  // Extract all unique tags from all projects
  const allTags = useMemo(() => {
    const tags = new Set<string>()

    mlDataAnalysisProjects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag))
    })

    appDevProjects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag))
    })

    return Array.from(tags).sort()
  }, [])

  // Filter projects based on selected tags
  const filteredMLProjects = useMemo(() => {
    if (selectedTags.length === 0) return mlDataAnalysisProjects

    return mlDataAnalysisProjects.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)))
  }, [selectedTags])

  const filteredAppProjects = useMemo(() => {
    if (selectedTags.length === 0) return appDevProjects

    return appDevProjects.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)))
  }, [selectedTags])

  // Reset indices when filtered projects change
  useEffect(() => {
    setCurrentIndexML(0)
    setCurrentIndexApp(0)
  }, [filteredMLProjects, filteredAppProjects])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedTags([])
    setActiveCategory("all")
  }

  const setCategory = (category: "ml" | "app" | "all") => {
    setActiveCategory(category)
    setSelectedTags([])
  }

  const nextProjectML = () => {
    if (filteredMLProjects.length === 0) return
    setCurrentIndexML((prevIndex) => (prevIndex + 1) % filteredMLProjects.length)
  }

  const prevProjectML = () => {
    if (filteredMLProjects.length === 0) return
    setCurrentIndexML((prevIndex) => (prevIndex - 1 + filteredMLProjects.length) % filteredMLProjects.length)
  }

  const nextProjectApp = () => {
    if (filteredAppProjects.length === 0) return
    setCurrentIndexApp((prevIndex) => (prevIndex + 1) % filteredAppProjects.length)
  }

  const prevProjectApp = () => {
    if (filteredAppProjects.length === 0) return
    setCurrentIndexApp((prevIndex) => (prevIndex - 1 + filteredAppProjects.length) % filteredAppProjects.length)
  }

  return (
    <section id="projects" className="min-h-screen py-20 flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Projects</h2>

      {/* Filter Controls */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setCategory("ml")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === "ml"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            ML Projects
          </button>
          <button
            onClick={() => setCategory("app")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === "app"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            App Projects
          </button>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Filter by technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {(selectedTags.length > 0 || activeCategory !== "all") && (
          <div className="flex items-center mb-4">
            <span className="mr-2">Active filters:</span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm mr-2"
              >
                {tag}
                <button
                  onClick={() => toggleTag(tag)}
                  className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            ))}
            {activeCategory !== "all" && (
              <span className="flex items-center bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-sm mr-2">
                {activeCategory === "ml" ? "ML Projects" : "App Projects"}
                <button
                  onClick={() => setActiveCategory("all")}
                  className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            )}
            <button onClick={clearFilters} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ML & Data Analysis Projects Section */}
      {(activeCategory === "all" || activeCategory === "ml") && (
        <div className="w-full max-w-4xl mb-12">
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-green-200 mb-6">
            Machine Learning & Data Analysis Projects
          </h3>
          {filteredMLProjects.length > 0 ? (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndexML}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden card-hover"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="md:flex">
                  <div className="md:flex-shrink-0 relative p-2">
  <Image
    className="h-48 w-full object-cover md:w-48 rounded-lg"
    src={filteredMLProjects[currentIndexML].image || "/placeholder.svg"}
    alt={filteredMLProjects[currentIndexML].title}
    width={192}
    height={192}
    layout="intrinsic"
  />


                      <a
  href={filteredMLProjects[currentIndexML].githubLink}
  target="_blank"
  rel="noopener noreferrer"
  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-4 px-6 rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 shadow-md text-sm whitespace-nowrap"
  style={{ marginLeft: '1px', marginRight: '8px', width: 'fit-content' }}
>
  <FaGithub className="mr-2" />
  View on GitHub
</a>




                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                        {filteredMLProjects[currentIndexML].title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {filteredMLProjects[currentIndexML].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {filteredMLProjects[currentIndexML].tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {filteredMLProjects.length > 1 && (
                <>
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
                </>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">No projects match your selected filters.</p>
            </div>
          )}
        </div>
      )}

      {/* App Development Projects Section */}
      {(activeCategory === "all" || activeCategory === "app") && (
        <div className="w-full max-w-4xl">
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-green-200 mb-6">App Development Projects</h3>
          {filteredAppProjects.length > 0 ? (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndexApp}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden card-hover"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="md:flex">
                  <div className="md:flex-shrink-0 relative p-2">
  {/* Adjusted image with padding and rounded corners */}
  <Image
    className="h-48 w-full object-cover md:w-48 rounded-lg"
    src={filteredAppProjects[currentIndexApp].image || "/placeholder.svg"}
    alt={filteredAppProjects[currentIndexApp].title}
    width={192}
    height={192}
    layout="intrinsic"
  />
  
  {/* Adjusted GitHub button with padding, increased width, and better positioning */}
  <a
    href={filteredAppProjects[currentIndexApp].githubLink}
    target="_blank"
    rel="noopener noreferrer"
    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-4 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 shadow-md whitespace-nowrap"
  >
    <FaGithub className="mr-2" />
    View on GitHub
  </a>
</div>

                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                        {filteredAppProjects[currentIndexApp].title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {filteredAppProjects[currentIndexApp].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {filteredAppProjects[currentIndexApp].tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {filteredAppProjects.length > 1 && (
                <>
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
                </>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">No projects match your selected filters.</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}


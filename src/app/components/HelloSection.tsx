"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const phrases = [
  "Machine Learning & AI Developer",
  "Specializing in Deep Learning, NLP, and Computer Vision",
  "Slight twist : I'm also an Android App Developer",
  "Welcome to my portfolio!",
]

const navigationSections = [
  { id: "hello", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

// --- NEW FUNCTION: Handles redirecting to an external site ---
const redirectToSite = (url: string) => {
  window.open(url, "_blank")?.focus();
}


export default function HelloSection() {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseDuration = isDeleting ? 1000 : 2000

    if (!isDeleting && text === currentPhrase) {
      setTimeout(() => setIsDeleting(true), pauseDuration)
      return
    }

    if (isDeleting && text === "") {
      setIsDeleting(false)
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
      return
    }

    const timeout = setTimeout(() => {
      setText((prev) => (isDeleting ? prev.slice(0, -1) : currentPhrase.slice(0, prev.length + 1)))
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, phraseIndex])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-center space-x-1 md:space-x-2 flex-wrap">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-2 py-1 md:px-3 md:py-2 text-xs md:text-base text-white/80 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_2px_rgba(51,238,132,0.3)]"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section
        id="hello"
        className="min-h-screen flex items-center justify-center font-russo px-4 md:px-6 pt-20 pb-12 md:pt-32 md:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 animated-gradient-text leading-tight"
            style={{ lineHeight: "1.2", paddingBottom: "0.2em" }}
          >
            Ananyo Dasgupta
          </h1>
          <p
            className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 animated-gradient-text leading-tight"
          >
            Artificial Intelligence <br />
            & <br />
            Machine Learning <br />
            Developer
          </p>

          <p className="text-lg md:text-xl lg:text-2xl h-8 text-white text-visible mb-8">
            {text}
            <span className="typing-animation"></span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-700 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)] transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("projects")}
              className="bg-transparent border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)] transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See My Work
            </motion.button>
            
            {/* --- NEW BUTTON ADDED HERE --- */}
            <motion.button
              // Replace this URL with your actual link
              onClick={() => redirectToSite("https://portfolio-mob-ananyo.vercel.app")}
              className="bg-transparent border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)] transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio Fun
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
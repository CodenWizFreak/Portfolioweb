"use client"
import { motion } from "framer-motion"
import { FaFileDownload, FaLaptopCode, FaMobileAlt, FaBrain } from "react-icons/fa"
import { SiGit } from "react-icons/si"

const skills = [
  { name: "Machine Learning (TensorFlow, PyTorch, Scikit-Learn)", icon: FaBrain },
  { name: "Deep Learning & Neural Networks", icon: FaLaptopCode },
  { name: "Computer Vision & NLP", icon: FaBrain },
  { name: "Mobile App Development (Flutter, Kotlin, React Native)", icon: FaMobileAlt },
  { name: "Version Control (Git, GitHub)", icon: SiGit },
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
            className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-visible">Professional Summary</h3>
            <p className="text-visible-secondary">
              Machine Learning Engineer with expertise in AI & ML, Deep Learning, NLP, and Computer Vision. Experienced in
              developing intelligent systems using TensorFlow, PyTorch, and cutting-edge ML frameworks. Skilled in
              building end-to-end ML applications that solve real-world problems.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-visible">Key Skills</h3>
            <ul className="grid grid-cols-1 gap-3">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center text-visible-secondary">
                  <skill.icon className="mr-3 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{skill.name}</span>
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
            href="/Resume.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
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

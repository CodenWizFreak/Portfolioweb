"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, BookOpen, Trophy, Brain, Film, Music, Mountain, Palette } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white animated-gradient-text">About Me</h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-blue-100" style={{ textAlign: "justify" }}>
            My journey began in <b>Android app development</b>, where I specialized in creating intuitive, user-friendly applications. This background in crafting seamless user experiences has given me a meticulous eye for detail.
          </p>
          <p className="text-lg mb-4 text-purple-600 dark:text-purple-400" style={{ textAlign: "justify" }}>
            My expertise now lies in the dynamic world of <b>Machine Learning</b> and <b>AI</b>. I&apos;m proficient in a range of advanced disciplines, including <b>Generative AI</b>, <b>Natural Language Processing (NLP)</b>, <b>Deep Learning</b>, and <b>Computer Vision</b> with <b>OpenCV</b>. I thrive on leveraging these powerful tools to turn complex data into actionable insights and innovative applications.
          </p>
          <p className="text-lg text-gray-700 dark:text-blue-100" style={{ textAlign: "justify" }}>
            A quick learner and natural problem-solver, I&apos;m adept at tackling new challenges and collaborating effectively in a team environment. My past leadership experience has equipped me to guide projects from concept to completion, ensuring success at every stage.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-64 h-64 mx-auto glow-circle-container"
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-0 rounded-full glow-gradient-ring">
            <div className="absolute inset-0.5 rounded-full overflow-hidden bg-white dark:bg-gray-800">
              <Image src="/profile.png" alt="Your Name" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Three boxes section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        {/* Interests Box */}
        <motion.div
          className="bg-gray-900/80 dark:bg-black/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden card-hover border border-gray-700/50"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-purple-300 dark:text-purple-400">
              <BookOpen className="h-5 w-5" />
              Interests
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-100">Research</h3>
              </li>
              <li className="flex items-center gap-3">
                <Film className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-100">Movies & Shows</h3>
              </li>
              <li className="flex items-center gap-3">
                <Music className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-100">Singing/Guitar/Drums</h3>
              </li>
              <li className="flex items-center gap-3">
                <Mountain className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-100">Travel & Trekking</h3>
              </li>
              <li className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-100">Art & Craft</h3>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Additional Achievements Box */}
        <motion.div
          className="bg-gray-900/80 dark:bg-black/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden card-hover border border-gray-700/50"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-4">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-300 dark:text-blue-400">
              <Award className="h-5 w-5" />
              Additional Achievements
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="before:content-['•'] before:text-green-400 before:mr-2 before:text-2xl text-gray-100">
                Winners of Virtual Hack - Hack4Bengal 3.0 2025
              </li>
              <li className="before:content-['•'] before:text-green-400 before:mr-2 before:text-2xl text-gray-100">
                3rd Runners Up at Hack Fusion - NIT Jamshedpur
              </li>
              <li className="before:content-['•'] before:text-green-400 before:mr-2 before:text-2xl text-gray-100">
                3rd Runners Up at Innovathon - NSHM Kolkata
              </li>
              <li className="before:content-['•'] before:text-green-400 before:mr-2 before:text-2xl text-gray-100">
                Top 10 Finalists at IET Tech Intellina - Jadavpur University
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Awards and Recognition Box */}
        <motion.div
          className="bg-gray-900/80 dark:bg-black/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden card-hover border border-gray-700/50"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-purple-300 dark:text-purple-400">
              <Trophy className="h-5 w-5" />
              Awards & Recognition
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div>
                  <h3 className="font-medium text-gray-100 before:content-['•'] before:text-green-400 before:mr-2 before:text-2xl">
                    Exabyte
                  </h3>
                  <p className="text-sm text-gray-300">
                    1st Position at Encode - St. Xavier&apos;s College (Autonomous) Kolkata
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div>
                  <h3 className="font-medium text-gray-100 before:content-['•'] before:text-green-400 before:mr-2 before:text-2xl">
                    NSSC
                  </h3>
                  <p className="text-sm text-gray-300">
                    1st Runners Up at National Students Space Challenge - IIT Kharagpur
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div>
                  <h3 className="font-medium text-gray-100 before:content-['•'] before:text-green-400 before:mr-2 before:text-2xl">
                    Hack Synthesis
                  </h3>
                  <p className="text-sm text-gray-300">2nd Runners Up at Hack Synthesis - UEM Kolkata</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

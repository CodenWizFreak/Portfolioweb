"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, BookOpen, Trophy, Code, Brain, Briefcase, Medal, Film, Music, Mountain, Palette } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animated-gradient-text glow-text">About Me</h2>
          <p className="text-lg mb-4 text-gray-800 dark:text-blue-100">
            I&apos;m currently an Android App Developer, dedicated to building intuitive and user-friendly applications.
            My passion for technology goes beyond just app development—I&apos;m also deeply interested in Data Science
            and Machine Learning, fields that fuel my curiosity and drive to explore how technology can be used to solve
            real-world problems.
          </p>
          <p className="text-lg mb-4 text-purple-800 dark:text-purple-400">
            What other qualities do I bring to the table? I&apos;m a quick learner, a team player, and a problem solver.
            I also have leadership experience, having led a team of developers to create a successful app that was
            featured on the Play Store.
          </p>
          <p className="text-lg text-gray-800 dark:text-blue-100">
            When I&apos;m not coding, you might find me diving into the latest tech trends, debugging my way through
            challenges, or simply enjoying a good 80s rock playlist (Which you may have already guessed from my choice
            of songs) :)
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-64 h-64 mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-0 rounded-full glow-gradient-ring">
            <div className="absolute inset-0.5 rounded-full overflow-hidden bg-white dark:bg-gray-800">
              <Image src="/profile.jpg" alt="Your Name" fill style={{ objectFit: "cover" }} />
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
          className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden card-hover"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-950/50 dark:to-purple-950/50 p-4">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-purple-800 dark:text-purple-400">
              <BookOpen className="h-5 w-5" />
              Interests
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Research</h3>
              </li>
              <li className="flex items-center gap-3">
                <Film className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Movies</h3>
              </li>
              <li className="flex items-center gap-3">
                <Music className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Singing/Guitar/Drums</h3>
              </li>
              <li className="flex items-center gap-3">
                <Mountain className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Travel & Trekking</h3>
              </li>
              <li className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Craft</h3>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Additional Achievements Box */}
        <motion.div
          className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden card-hover"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-purple-50/30 to-blue-50/30 dark:from-purple-950/50 dark:to-blue-950/50 p-4">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-800 dark:text-blue-400">
              <Award className="h-5 w-5" />
              Additional Achievements
            </h3>
          </div>
<div className="p-6">
  <ul className="list-inside space-y-4 text-gray-900 dark:text-gray-100">
    <li className="before:content-['•'] before:text-green-500 before:mr-2 before:text-2xl">3rd Runners Up at Hack Fusion - NIT Jamshedpur</li>
    <li className="before:content-['•'] before:text-green-500 before:mr-2 before:text-2xl">3rd Runners Up at Innovathon - NSHM Kolkata</li>
    <li className="before:content-['•'] before:text-green-500 before:mr-2 before:text-2xl">Top 7 Finalists at Hack Heritage - HIT Kolkata</li>
    <li className="before:content-['•'] before:text-green-500 before:mr-2 before:text-2xl">Top 10 Finalists at IET Tech Intellina - Jadavpur University</li>
  </ul>
</div>
        </motion.div>

        {/* Awards and Recognition Box */}
        <motion.div
          className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden card-hover"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-950/50 dark:to-purple-950/50 p-4">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-purple-800 dark:text-purple-400">
              <Trophy className="h-5 w-5" />
              Awards & Recognition
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 before:content-['•'] before:text-green-500 before:mr-2 before:text-2xl">Codeplay</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    1st Position at Encode - St. Xavier's College (Autonomous) Kolkata
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 before:content-['•'] before:text-green-500 before:mr-2 before:text-2xl">NSSC</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    1st Runners Up at National Students Space Challenge - IIT Kharagpur
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
              
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 before:content-['•'] before:text-green-500 before:mr-2 before:text-2xl">Hack Synthesis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    2nd Runners Up at Hack Synthesis - UEM Kolkata
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}


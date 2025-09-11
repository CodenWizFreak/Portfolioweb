"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ChevronUp } from "lucide-react"

const skillsData = [
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Python", logo: "/logos/python.svg" },
      { name: "TensorFlow", logo: "/logos/tensorflow.png" },
      { name: "PyTorch", logo: "/logos/pytorch.png" },
      { name: "Scikit-Learn", logo: "/logos/scikit.png" },
      { name: "Pandas", logo: "/logos/pandas.png" },
      { name: "Numpy", logo: "/logos/numpy.png" },
      { name: "OpenCV", logo: "/logos/opencv.png" },
      { name: "Keras", logo: "/logos/keras.png" },
      { name: "YOLO", logo: "/logos/yolo.png" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "Java", logo: "/logos/java.svg" },
      { name: "C", logo: "/logos/c.svg" },
      { name: "Kotlin", logo: "/logos/kotlin.svg" },
      { name: "Dart", logo: "/logos/dart.svg" },
      { name: "Python", logo: "/logos/python.svg" },
      { name: "HTML", logo: "/logos/html.svg" },
      { name: "CSS", logo: "/logos/css.svg" },
      { name: "Javascript", logo: "/logos/javascript.svg" },
      { name: "Typescript", logo: "/logos/typescript.svg" },
      { name: "R", logo: "/logos/r.png" },
      { name: "Solidity", logo: "/logos/solidity.png" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", logo: "/logos/react.webp" },
      { name: "Flutter", logo: "/logos/flutter.png" },
      { name: "Tailwind CSS", logo: "/logos/tailwind.png" },
      { name: "Next", logo: "/logos/next.png" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", logo: "/logos/nodejs.svg" },
      { name: "Flask", logo: "/logos/flask.png" },
      { name: "Django", logo: "/logos/django.svg" },
      { name: "Firebase", logo: "/logos/firebase.png" },
      { name: "Supabase", logo: "/logos/supabase.png" },
    ],
  },
  {
    category: "Cloud and DevOps",
    skills: [
      { name: "AWS", logo: "/logos/amazon.svg" },
      { name: "GCP", logo: "/logos/gcp.png" },
      { name: "Docker", logo: "/logos/docker.svg" },
      { name: "Nginx", logo: "/logos/nginx.png" },
      { name: "Vercel", logo: "/logos/vercel.png" },
      { name: "Render", logo: "/logos/render.png" },
      { name: "Github", logo: "/logos/github.png" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", logo: "/logos/mongo.webp" },
      { name: "MySQL", logo: "/logos/mysql.svg" },
      { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
      { name: "Firebase", logo: "/logos/firebase.png" },
      { name: "Supabase", logo: "/logos/supabase.png" },
    ],
  },
  {
    category: "Data Analytics",
    skills: [
      { name: "Pandas", logo: "/logos/pandas.png" },
      { name: "Numpy", logo: "/logos/numpy.png" },
      { name: "Matplotlib", logo: "/logos/matplotlib.png" },
      { name: "Jupyter Notebook", logo: "/logos/jupyter.png" },
      { name: "Google Colab", logo: "/logos/colab.png" },
    ],
  },
  {
    category: "IDEs and Tools",
    skills: [
      { name: "Android Studio", logo: "/logos/android-studio.svg" },
      { name: "VS Code", logo: "/logos/vscode.svg" },
      { name: "Postman", logo: "/logos/postman.svg" },
      { name: "Figma", logo: "/logos/figma.png" },
      { name: "Flutterflow", logo: "/logos/flutterflow.png" },
      { name: "Gradle", logo: "/logos/gradle.png" },
      { name: "Metamask", logo: "/logos/metamask.webp" },
      { name: "Markdown", logo: "/logos/markdown.png" },
      { name: "Matlab", logo: "/logos/matlab.png" },
      { name: "npm", logo: "/logos/npm.png" },
      { name: "Git", logo: "/logos/git.svg" },
    ],
  },
]

export default function SkillsSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const handleExpandCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const collapseAll = () => {
    setExpandedCategory(null)
  }

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center py-20 skills-section">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center animated-gradient-text">My Tech Stack</h2>
          {expandedCategory && (
            <button
              onClick={collapseAll}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all duration-300 hover:shadow-[0_0_15px_2px_rgba(51,238,132,0.3)]"
            >
              <ChevronUp className="w-4 h-4" />
              Collapse All
            </button>
          )}
        </div>

        <div className="space-y-12">
          {skillsData.map((category) => {
            const isExpanded = expandedCategory === category.category
            const visibleSkills = isExpanded ? category.skills : category.skills.slice(0, 3)
            const remainingCount = category.skills.length - visibleSkills.length

            return (
              <div key={category.category}>
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className="text-2xl font-semibold animated-gradient-text cursor-pointer"
                    onClick={() => handleExpandCategory(category.category)}
                  >
                    {category.category}
                  </h3>
                  {isExpanded && (
                    <button
                      onClick={() => setExpandedCategory(null)}
                      className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all duration-300 hover:shadow-[0_0_15px_2px_rgba(51,238,132,0.3)] text-sm"
                    >
                      <ChevronUp className="w-3 h-3" />
                      Collapse
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {visibleSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="flex flex-col hover-float bg-gradient-to-br from-white/10 to-white/5 dark:from-black/30 dark:to-black/20 backdrop-blur-md rounded-lg shadow-lg p-4 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)] dark:hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)]"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex-grow flex justify-center items-center">
                        <Image
                          src={skill.logo || "/placeholder.svg"}
                          alt={skill.name}
                          width={32}
                          height={32}
                          className="mx-auto object-contain"
                        />
                      </div>
                      <p className="text-center text-xs font-medium text-white/95 text-shadow-lg pt-2">{skill.name}</p>
                    </motion.div>
                  ))}

                  {remainingCount > 0 && !isExpanded && (
                    <div
                      className="flex items-center justify-center bg-gray-800/60 dark:bg-gray-700/60 rounded-lg p-4 cursor-pointer hover:shadow-[0_0_15px_2px_rgba(51,238,132,0.3)] border border-gray-600/40 dark:border-gray-600/30"
                      onClick={() => handleExpandCategory(category.category)}
                    >
                      <p className="text-center text-xs font-semibold text-white/95 text-shadow-lg">
                        +{remainingCount} more
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import React from 'react'

const skillsData = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', level: 85 },
      { name: 'Kotlin', level: 90 },
      { name: 'Dart', level: 80 },
      { name: 'Python', level: 85 },
      { name: 'Javascript', level: 75 },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Android Studio', level: 90 },
      { name: 'VS Code', level: 85 },
      { name: 'Figma', level: 75 },
      { name: 'Firebase', level: 85 },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'Jetpack Compose', level: 90 },
      { name: 'Flutter', level: 85 },
      { name: 'React.js', level: 80 },
      { name: 'Scikit-Learn', level: 85 },
      { name: 'React Native', level: 80 },
    ],
  },
]

export default function SkillsSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center justify-center py-20 skills-section">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Skills</h2>

        <div className="space-y-12">
          {skillsData.map((category, categoryIndex) => (
            <div key={category.category}>
              {/* Category Title */}
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-6">{category.category}</h3>

              {/* Skill Bars */}
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={controls}
                    variants={{
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, delay: (categoryIndex + index) * 0.1 },
                      },
                    }}
                    className="hover-float"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-lg font-medium text-blue-600 dark:text-blue-300">{skill.name}</span>
                      <span className="text-lg font-medium text-blue-600 dark:text-blue-300">{skill.level}%</span>
                    </div>
                    <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={controls}
                        variants={{
                          visible: {
                            width: `${skill.level}%`,
                            transition: { duration: 1, delay: (categoryIndex + index) * 0.1 },
                          },
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

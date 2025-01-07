'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';  // Import Image from next/image

const skillsData = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', logo: '/logos/java.svg' },
      { name: 'C', logo: '/logos/c.svg' },
      { name: 'Kotlin', logo: '/logos/kotlin.svg' },
      { name: 'Dart', logo: '/logos/dart.svg' },
      { name: 'Python', logo: '/logos/python.svg' },
      { name: 'HTML', logo: '/logos/html.svg' },
      { name: 'CSS', logo: '/logos/css.svg' },
      { name: 'Javascript', logo: '/logos/javascript.svg' },
      { name: 'Typescript', logo: '/logos/typescript.svg' },
      { name: 'R', logo: '/logos/r.png' },
      { name: 'Solidity', logo: '/logos/solidity.png' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', logo: '/logos/react.webp' },
      { name: 'Flutter', logo: '/logos/flutter.png' },
      { name: 'Tailwind CSS', logo: '/logos/tailwind.png' },
      { name: 'Next', logo: '/logos/next.png' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', logo: '/logos/nodejs.svg' },
      { name: 'Flask', logo: '/logos/flask.png' },
      { name: 'Django', logo: '/logos/django.svg' },
      { name: 'Firebase', logo: '/logos/firebase.png' },
      { name: 'Supabase', logo: '/logos/supabase.png' },
    ],
  },
  {
    category: 'Cloud and DevOps',
    skills: [
      { name: 'AWS', logo: '/logos/amazon.svg' },
      { name: 'GCP', logo: '/logos/gcp.png' },
      { name: 'Docker', logo: '/logos/docker.svg' },
      { name: 'Nginx', logo: '/logos/nginx.png' },
      { name: 'Vercel', logo: '/logos/vercel.png' },
      { name: 'Render', logo: '/logos/render.png' },
      { name: 'Github', logo: '/logos/github.png' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', logo: '/logos/mongo.webp' },
      { name: 'MySQL', logo: '/logos/mysql.svg' },
      { name: 'PostgreSQL', logo: '/logos/postgresql.svg' },
      { name: 'Firebase', logo: '/logos/firebase.png' },
      { name: 'Supabase', logo: '/logos/supabase.png' },
    ],
  },
  {
    category: 'Data Analytics',
    skills: [
      { name: 'Pandas', logo: '/logos/pandas.png' },
      { name: 'Numpy', logo: '/logos/numpy.png' },
      { name: 'Matplotlib', logo: '/logos/matplotlib.png' },
      { name: 'Jupyter Notebook', logo: '/logos/jupyter.png' },
      { name: 'Google Colab', logo: '/logos/colab.png' },
    ],
  },
  {
    category: 'Machine Learning',
    skills: [
      { name: 'TensorFlow', logo: '/logos/tensorflow.png' },
      { name: 'Keras', logo: '/logos/keras.png' },
      { name: 'Scikit-Learn', logo: '/logos/scikit.png' },
      { name: 'YOLO', logo: '/logos/yolo.png' },
      { name: 'PyTorch', logo: '/logos/pytorch.png' },
      { name: 'OpenCV', logo: '/logos/opencv.png' },
    ],
  },
  {
    category: 'IDEs and Tools',
    skills: [
      { name: 'Android Studio', logo: '/logos/android-studio.svg' },
      { name: 'VS Code', logo: '/logos/vscode.svg' },
      { name: 'Postman', logo: '/logos/postman.svg' },
      { name: 'Figma', logo: '/logos/figma.png' },
      { name: 'Flutterflow', logo: '/logos/flutterflow.png' },
      { name: 'Gradle', logo: '/logos/gradle.png' },
      { name: 'Metamask', logo: '/logos/metamask.webp' },
      { name: 'Markdown', logo: '/logos/markdown.png' },
      { name: 'Matlab', logo: '/logos/matlab.png' },
      { name: 'npm', logo: '/logos/npm.png' },
      { name: 'Git', logo: '/logos/git.svg' },
    ],
  },
];

export default function SkillsSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleExpandCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center py-20 skills-section"
    >
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">
          Tech Stack
        </h2>

        <div className="space-y-12">
          {skillsData.map((category) => {
            const isExpanded = expandedCategory === category.category;
            const visibleSkills = isExpanded
              ? category.skills
              : category.skills.slice(0, 3);
            const remainingCount = category.skills.length - visibleSkills.length;

            return (
              <div key={category.category}>
                <h3
                  className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-6 cursor-pointer"
                  onClick={() => handleExpandCategory(category.category)}
                >
                  {category.category}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {visibleSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="hover-float bg-gradient-to-br from-white/10 to-white/5 dark:from-black/30 dark:to-black/20 backdrop-blur-md rounded-lg shadow-lg p-4 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)] dark:hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)]"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={skill.logo}
                        alt={skill.name}
                        width={32} // Set the width
                        height={32} // Set the height
                        className="mx-auto mb-2"
                      />
                      <p className="text-center text-xs text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </p>
                    </motion.div>
                  ))}

                  {remainingCount > 0 && !isExpanded && (
                    <div
                      className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg p-4 cursor-pointer"
                      onClick={() => handleExpandCategory(category.category)}
                    >
                      <p className="text-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                        +{remainingCount} more
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

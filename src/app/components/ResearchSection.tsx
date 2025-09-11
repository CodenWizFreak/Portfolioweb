"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaExternalLinkAlt, FaEye } from "react-icons/fa"
import Image from "next/image"

const researchPapers = [
  {
    title: "AI-driven Monitoring System for Detecting People Using Mobile Phones in Restricted Zone",
    description:
      "This research paper, presented at ICAA 2025, focuses on an AI-driven system for detecting mobile phone usage in restricted zones. It explores deep learning models like YOLOv8x and YOLOv8-ResNetv2, emphasizing object detection theory, image preprocessing, and evaluation metrics such as precision, recall, and mAP. The system uses a novel DBB algorithm to analyze spatial proximity between double bounding boxes for accurate behavioral inference and real-time alerts.",
    publisherLink: "https://link.springer.com/chapter/10.1007/978-3-031-84543-7_12", 
    publisher: "Springer",
    image: "/research1.png", 
    tags: [
      "AI",
      "Object Detection",
      "Deep Learning",
      "YOLOv8",
      "Computer Vision",
      "Real-time Systems",
      "DBB Algorithm",
    ],
    year: "2025",
    journal: "ICAA 2025 Conference Proceedings",
  },
];

export default function ResearchSection() {
  const [expandedPaper, setExpandedPaper] = useState<number | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedPaper(expandedPaper === index ? null : index)
  }

  return (
    <section id="research" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Research</h2>

        <p className="text-center text-white/80 mb-12 max-w-3xl mx-auto">
          Explore my published research papers and academic contributions in the field of Machine Learning, AI, and
          Environmental Technology.
        </p>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {researchPapers.map((paper, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)] border border-gray-700/50 ${
                expandedPaper === index ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Paper Image */}
              <div className="relative aspect-square">
                <Image
                  src={paper.image || "/placeholder.svg?height=300&width=300&query=research paper academic publication"}
                  alt={paper.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <FaEye size={16} />
                  </button>
                  <a
                    href={paper.publisherLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <FaExternalLinkAlt size={16} />
                  </a>
                </div>
              </div>

              {/* Paper Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-green-400 font-medium">{paper.year}</span>
                  <span className="text-xs text-blue-400 font-medium">{paper.publisher}</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{paper.title}</h3>

                {paper.journal && <p className="text-sm text-white/70 mb-3 italic">{paper.journal}</p>}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {paper.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-green-600/80 text-white text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {paper.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600/80 text-white text-xs rounded-full">
                      +{paper.tags.length - 3}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleExpanded(index)}
                  className="text-green-300 hover:text-green-200 text-sm transition-colors font-medium"
                >
                  {expandedPaper === index ? "Show Less" : "Read More"}
                </button>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedPaper === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-white mb-4">{paper.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-green-600/80 text-white text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={paper.publisherLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      View on {paper.publisher}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

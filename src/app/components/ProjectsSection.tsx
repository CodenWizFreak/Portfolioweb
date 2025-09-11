"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaGithub, FaEye } from "react-icons/fa"
import Image from "next/image"

const allProjects = [
  // AI/ML/DL/NLP/CV Projects
  {
    title: "Omiguard - ML Powered Drone Based Flood Prediction, Detection & Relief System",
    description:
      "A drone-based flood prediction and relief system that leverages AI models for real-time object detection and image segmentation. The system detects floodwaters and stranded individuals through drone imagery, using an integrated Ethereum-based blockchain for secure transactions and a real-time framework for rescue mapping and relief coordination.",
    githubLink: "https://github.com/CodenWizFreak/Binary_Omicode",
    image: "/omiguard.png",
    tags: ["Computer Vision", "Machine Learning", "Deep Learning", "YOLO", "Image Segmentation", "Blockchain"],
  },
  {
    title: "Entropy Based Sentence Boundary Detection",
    description:
      "An NLP application that uses Knowledge Graphs and entropy-guided reasoning for contextual and semantic sentence boundary detection. The system constructs SVO-based graphs to perform entropy calculations and dynamic traversal, offering an explainable, next-generation alternative to traditional tokenizers.",
    githubLink: "https://github.com/CodenWizFreak/CC",
    image: "/entropy.png",
    tags: ["NLP", "Generative AI", "Knowledge Graphs", "Streamlit"],
  },
  {
    title: "CryptoSentinel",
    description:
      "An AI-powered trading assistant that extracts actionable signals from Telegram groups using NLP with TensorFlow, LangChain, and Groq. It executes secure, self-custodial trades on the Aptos blockchain with Aptos Move smart contracts, providing real-time portfolio tracking and automated strategy optimization via a seamless Telegram bot.",
    githubLink: "https://github.com/SoumyadipRoy16/move_ai_hack",
    image: "/cryptosentinel.png",
    tags: ["AI", "NLP", "Blockchain", "Fintech", "TensorFlow", "Aptos"],
  },
  {
    title: "ClearSkies",
    description:
      "A smart navigation platform that integrates real-time Air Quality Index (AQI) data into route planning. Built with Streamlit, the platform offers AI-assisted route analysis and live monitoring to help users minimize exposure to pollution and make healthier travel choices.",
    githubLink: "https://github.com/CodenWizFreak/Clear",
    image: "/clearskies.png",
    tags: ["AI", "Data Science", "Streamlit", "Air Quality"],
  },
  {
    title: "AQI and Air Pollution Analysis",
    description:
      "A solution to analyze AQI and its impact on ecosystems using optimized CNN models (VGG16, InceptionV3, RCNNs) for image processing. This project includes data collection, model training, and evaluation, deployed via a Streamlit web app.",
    githubLink: "https://github.com/Anidipta/Google-Solution-23",
    image: "/aqiair.png",
    tags: ["Computer Vision", "Image Processing", "Machine Learning", "CNN", "Streamlit"],
  },
  {
    title: "Detection of People Talking on Mobile Phones",
    description:
      "A system that detects mobile phone usage in no-mobile zones by applying deep learning with YOLOv8x and YOLOv8-ResNetv2 models. It focuses on object detection theory, image preprocessing, and evaluation metrics like precision and recall for real-time alert systems.",
    githubLink: "https://github.com/CodenWizFreak/Hack-Fusion-2k24",
    image: "/mobile.png",
    tags: ["Computer Vision", "Deep Learning", "YOLO", "Object Detection"],
  },
    {
    title: "Pragati Aid",
    description:
      "A disaster preparedness system that predicts natural calamities like heavy rainfall and floods using ML and ARIMA models. It also integrates blockchain for secure, transparent relief fund collection via Ethereum smart contracts, providing district-level weather forecasting and precipitation visualization.",
    githubLink: "https://github.com/CodenWizFreak/HackSynthesis_Omicode",
    image: "/pragati.png",
    tags: ["Machine Learning", "ARIMA", "Blockchain", "Ethereum", "Smart Contracts", "Forecasting"],
  },

  // Blockchain Projects
  {
    title: "EduChainVerify",
    description:
      "A decentralized blockchain platform for secure storage and instant verification of academic credentials. Built on Ethereum/Hyperledger with smart contracts and IPFS, it ensures tamper-proof, immutable records. The platform features digital wallets for students and QR-based verification for institutions, creating a transparent, fraud-resistant ecosystem.",
    githubLink: "https://github.com/CodenWizFreak/EduChainVerify",
    image: "/educhainverify.png",
    tags: ["Blockchain", "Ethereum", "Web3", "Smart Contracts", "IPFS"],
  },
  {
    title: "Cryptonian",
    description:
      "Cryptonian is a gamified Web3 learning platform teaching Indian geography, history, and blockchain fundamentals through interactive games, quizzes, and puzzles. Users earn tokens, mint and trade NFTs via Aptos blockchain, and engage with features like AI chatbots, monument scanners, and leaderboards, combining education, gamification, and immersive blockchain experiences.",
    githubLink: "https://github.com/CodenWizFreak/Crypt",
    image: "/cryptonian.png",
    tags: ["Blockchain", "Aptos", "Web3", "NFT", "Gaming", "Generative AI", "Streamlit"],
  },
  {
    title: "StarForge - Omi’s Arena",
    description:
      "A Web3 trading card game on the Aptos blockchain that blends strategic battles with true digital ownership. Players can earn crypto, battle AI villains, and trade NFT-based assets in a cosmic universe. The game uses React, Node.js, and Python, combining immersive gameplay with decentralized technology.",
    githubLink: "https://github.com/CodenWizFreak/Star-Forge",
    image: "/starforge.png",
    tags: ["Web3", "Blockchain", "Gaming", "Aptos", "NFT"],
  },

  // Full-stack MERN & Similar Projects
  {
    title: "Edvita",
    description:
      "A Next.js-powered online platform that streamlines coding tests and internship applications. It offers a real-time multi-language code editor, instant feedback, and application tracking for candidates, while administrators gain tools for managing problems and reviewing submissions. The platform is built with Next.js, TypeScript, Tailwind CSS, MongoDB, and Redis.",
    githubLink: "https://github.com/SoumyadipRoy16/EDVITA",
    image: "/edvita.png",
    tags: ["Full Stack", "Next.js", "MongoDB", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Hospital Patient Management System",
    description:
      "A comprehensive system to optimize patient flow, bed management, and hospital operations using the MERN stack and Next.js. It includes appointment scheduling, doctor-patient communication, and AI-powered prescription reading, with AWS for deployment.",
    githubLink: "https://github.com/CodenWizFreak/Curoxis",
    image: "/hospital.png",
    tags: ["Full Stack", "MERN Stack", "Next.js", "PostgreSQL", "Generative AI", "Healthcare"],
  },

  // App Development Projects
   {
    title: "Crest – Connect Through Music",
    description:
      "Crest is an online music streaming app developed with Kotlin (Jetpack Compose) and Firebase, enabling users to discover music across genres, like songs, and connect with others who share similar tastes. It features secure authentication, a premium subscription for an ad-free experience, and a backend powered by Firebase Realtime Database for user data management.",
    githubLink: "https://github.com/CodenWizFreak/Crest",
    image: "/crest.jpg",
    tags: ["Mobile App", "Android Development", "Kotlin", "Jetpack Compose", "Firebase", "Authentication"],
  },
  {
    title: "Prodigy – Your personalized calculator",
    description:
      "Prodigy is a user-friendly calculator app designed to simplify everyday calculations. This app features essential arithmetic functions like addition, subtraction, multiplication, and division. Plus, it includes a day/night mode toggle, allowing you to easily switch between light and dark themes, making it ideal for use in any lighting condition.",
    githubLink: "https://github.com/CodenWizFreak/PRODIGY_AD_01",
    image: "/prodigy.jpg",
    tags: ["Mobile App", "Kotlin", "UI/UX", "Calculator", "Android Development"],
  },
];

export default function ProjectsSection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allProjects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return allProjects;
    return allProjects.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)));
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const toggleExpanded = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Projects</h2>

        {/* Filter Tags */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4 text-white">Filter by technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  selectedTags.includes(tag)
                    ? "bg-green-500 text-white shadow-[0_0_15px_2px_rgba(51,238,132,0.5)]"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:shadow-[0_0_10px_1px_rgba(51,238,132,0.3)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="mt-2 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)] border border-gray-700/50 ${
                expandedProject === index ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Project Image */}
              <div className="relative aspect-square">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <FaEye size={16} />
                  </button>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <FaGithub size={16} />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{project.title}</h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-green-600/80 text-white text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600/80 text-white text-xs rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleExpanded(index)}
                  className="text-green-300 hover:text-green-200 text-sm transition-colors font-medium"
                >
                  {expandedProject === index ? "Show Less" : "Read More"}
                </button>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedProject === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-white mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-green-600/80 text-white text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FaGithub className="mr-2" />
                      View on GitHub
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

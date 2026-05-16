"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaRobot, FaTimes, FaPaperPlane, FaMicrophone } from "react-icons/fa"

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

// ─────────────────────────────────────────────────────────────
//  KNOWLEDGE BASE  (scraped from portfolio)
// ─────────────────────────────────────────────────────────────
const KB = {
  name: "Ananyo Dasgupta",
  github_handle: "CodenWizFreak",
  roles: ["AI & Machine Learning Developer", "Full-Stack Developer", "Android App Developer", "Deep Learning Engineer"],
  location: "Kolkata, India",
  email: "dasguptaananyo28@gmail.com",
  github: "https://github.com/CodenWizFreak",
  linkedin: "https://linkedin.com/in/ananyodasgupta2804",
  twitter: "https://X.com/DGAnanyo",
  researchgate: "https://www.researchgate.net/profile/Ananyo-Dasgupta",
  portfolio: "https://portfolioweb-ananyo.vercel.app",

  education: [
    {
      degree: "Bachelor of Technology in Computer Science (AI & ML)",
      institution: "Heritage Institute of Technology, Kolkata",
      year: "2023–2027 (expected)",
      grade: "CGPA: 8.5/10",
      level: "Undergraduate",
    },
    {
      degree: "High School Diploma (ISC)",
      institution: "The Aryans School, Kolkata",
      year: "2021–2023",
      grade: "92.75%",
      level: "12th Grade",
    },
    {
      degree: "Indian Certificate of Secondary Education (ICSE)",
      institution: "The Aryans School, Kolkata",
      year: "2009–2021",
      grade: "97.6%",
      level: "10th Grade",
    },
  ],

  experience: [
    {
      role: "Python Developer Intern",
      company: "QwertyZen",
      period: "February 2026 – May 2026",
      location: "Kolkata, India",
      desc: "Engineered a standalone real-time audio application for multi-track song composition via layered vocal and instrumental performances. Developed automatic vocal range detection, real-time accuracy tracking, and precise note-dynamic capture.",
    },
    {
      role: "Multimodal Deep Learning Intern",
      company: "Transcon IT Solutions Pvt Ltd",
      period: "Oct 2025 – Dec 2025",
      location: "Kolkata, India",
      desc: "Built a comprehensive multimodal deep learning pipeline converting a massive library of sign images into synchronized audio outputs. Streamlined computer vision and speech synthesis models for real-time gesture-to-text translation.",
    },
    {
      role: "SDE Intern",
      company: "Bluestock Fintech",
      period: "February 2025 – April 2025",
      location: "Remote",
      desc: "Developed responsive frontend interfaces using Bootstrap and integrated APIs for real-time financial data processing. Collaborated with backend teams to implement data visualization components for trading analytics.",
    },
    {
      role: "LLM Trainer",
      company: "Outlier.ai",
      period: "Dec 2024 – Mar 2025",
      location: "Remote",
      desc: "Fine-tuned and trained large language models for NLP tasks including text generation, sentiment analysis, and question-answering. Worked with transformer architectures, implemented RLHF techniques, and optimized model performance.",
    },
  ],

  skills: {
    "AI & Machine Learning": ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Keras", "OpenCV", "YOLO", "Hugging Face", "LangChain", "RLHF"],
    Languages: ["Python", "Java", "C", "Kotlin", "JavaScript", "TypeScript", "Dart", "SQL", "Solidity", "R"],
    Frontend: ["React", "Next.js", "Flutter", "Tailwind CSS", "Bootstrap"],
    Backend: ["Node.js", "Flask", "Django", "FastAPI", "Express.js", "REST APIs"],
    "Cloud & DevOps": ["AWS", "GCP", "Docker", "Kubernetes", "Git", "GitHub", "CI/CD", "Firebase"],
    Databases: ["MongoDB", "MySQL", "PostgreSQL", "Firebase Firestore", "Redis", "ChromaDB"],
    "Data Analytics": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Power BI"],
    "Tools & IDEs": ["VS Code", "Android Studio", "Postman", "Jupyter", "Google Colab", "Figma", "Canva"],
  },

  projects: [
    {
      name: "Omiguard",
      full: "Omiguard – ML Powered Drone Based Flood Prediction, Detection & Relief System",
      tags: ["Computer Vision", "Machine Learning", "Deep Learning", "Drone", "Flood Detection"],
      link: "https://github.com/CodenWizFreak/Binary_Omicode",
      desc: "ML-powered drone-based system for flood prediction, detection and relief coordination using computer vision and deep learning.",
    },
    {
      name: "Entropy Based Sentence Boundary Detection",
      full: "Entropy Based Sentence Boundary Detection",
      tags: ["NLP", "Generative AI", "Knowledge Graphs", "Entropy"],
      link: "https://github.com/CodenWizFreak/CC",
      desc: "NLP system using entropy principles for accurate sentence boundary detection and knowledge graph construction.",
    },
    {
      name: "CryptoSentinel",
      full: "CryptoSentinel",
      tags: ["AI", "NLP", "Blockchain", "Crypto", "Fintech"],
      link: "https://github.com/SoumyadipRoy16/move_ai_hack",
      desc: "AI-powered crypto sentinel combining NLP and blockchain for intelligent financial monitoring and anomaly detection.",
    },
    {
      name: "ClearSkies",
      full: "ClearSkies",
      tags: ["AI", "Data Science", "Streamlit", "Air Quality"],
      link: "https://github.com/CodenWizFreak/Clear",
      desc: "AI-driven air quality analysis and forecasting dashboard built with Streamlit.",
    },
    {
      name: "AQI and Air Pollution Analysis",
      full: "AQI and Air Pollution Analysis",
      tags: ["Computer Vision", "Image Processing", "Machine Learning", "CNN", "Air Quality"],
      link: "https://github.com/Anidipta/Google-Solution-23",
      desc: "CNN-based system for analyzing air quality index and pollution patterns using image processing techniques.",
    },
    {
      name: "Mobile Phone Detection",
      full: "Detection of People Talking on Mobile Phones",
      tags: ["Computer Vision", "Deep Learning", "YOLO", "Object Detection"],
      link: "https://github.com/CodenWizFreak/Hack-Fusion-2k24",
      desc: "Real-time YOLO-based computer vision system to detect people using mobile phones in restricted zones.",
    },
    {
      name: "Pragati Aid",
      full: "Pragati Aid",
      tags: ["Machine Learning", "ARIMA", "Blockchain", "Disaster Preparedness", "Forecasting"],
      link: "https://github.com/CodenWizFreak/HackSynthesis_Omicode",
      desc: "Disaster preparedness system combining ML forecasting (ARIMA) and blockchain for transparent aid distribution.",
    },
    {
      name: "EduChainVerify",
      full: "EduChainVerify",
      tags: ["Blockchain", "Ethereum", "Web3", "Smart Contracts", "Education"],
      link: "https://github.com/CodenWizFreak/EduChainVerify",
      desc: "Blockchain-powered educational credential verification system on Ethereum.",
    },
    {
      name: "Cryptonian",
      full: "Cryptonian",
      tags: ["Blockchain", "Aptos", "Web3", "NFT", "DeFi"],
      link: "https://github.com/CodenWizFreak/Crypt",
      desc: "Web3 DeFi and NFT platform built on the Aptos blockchain.",
    },
    {
      name: "StarForge",
      full: "StarForge – Omi's Arena",
      tags: ["Web3", "Blockchain", "Gaming"],
      link: "https://github.com/CodenWizFreak/Star-Forge",
      desc: "Web3 blockchain-integrated gaming arena — StarForge: Omi's Arena.",
    },
    {
      name: "Edvita",
      full: "Edvita",
      tags: ["Full Stack", "Next.js", "MongoDB", "Education"],
      link: "https://github.com/SoumyadipRoy16/EDVITA",
      desc: "Full-stack educational platform built with Next.js and MongoDB.",
    },
    {
      name: "Hospital Patient Management System",
      full: "Hospital Patient Management System",
      tags: ["Full Stack", "MERN Stack", "Next.js", "Healthcare"],
      link: "https://github.com/CodenWizFreak/Curoxis",
      desc: "Comprehensive hospital patient management system built on the MERN stack with Next.js.",
    },
    {
      name: "Crest",
      full: "Crest – Connect Through Music",
      tags: ["Mobile App", "Android Development", "Kotlin", "Music"],
      link: "https://github.com/CodenWizFreak/Crest",
      desc: "Android music social app built with Kotlin and Jetpack Compose.",
    },
    {
      name: "Prodigy",
      full: "Prodigy – Your Personalized Calculator",
      tags: ["Mobile App", "Kotlin", "UI/UX", "Android"],
      link: "https://github.com/CodenWizFreak/PRODIGY_AD_01",
      desc: "A highly personalized and beautifully designed calculator app for Android.",
    },
  ],

  research: [
    {
      title: "AI-driven Monitoring System for Detecting People Using Mobile Phones in Restricted Zone",
      venue: "ICAA 2025 Conference Proceedings",
      publisher: "Springer",
      year: 2025,
      tags: ["AI", "Object Detection", "Deep Learning", "YOLO", "Computer Vision", "Restricted Zone"],
      link: "https://link.springer.com/chapter/10.1007/978-3-031-84543-7_12",
    },
  ],

  achievements: [
    "Winners of Virtual Hack – Hack4Bengal 3.0 2025",
    "3rd Runners Up at Hack Fusion – NIT Jamshedpur",
    "3rd Runners Up at Innovathon – NSHM Kolkata",
    "Top 10 Finalists at IET Tech Intellina – Jadavpur University",
    "1st Position (Exabyte) – Encode, St. Xavier's College (Autonomous) Kolkata",
    "1st Runners Up – National Students Space Challenge (NSSC), IIT Kharagpur",
    "2nd Runners Up – Hack Synthesis, UEM Kolkata",
  ],

  languages: ["English", "Hindi", "Bengali", "German (Basic)"],
  hobbies: ["Research", "Watching Movies & Shows", "Singing", "Playing Guitar", "Playing Drums", "Travel & Trekking", "Art & Craft"],
  funFacts: [
    "Ananyo started his coding journey with Android app development before diving deep into AI/ML!",
    "He plays both guitar AND drums — quite the musician-developer combo!",
    "He has a CGPA of 8.5 while juggling multiple internships and hackathons simultaneously.",
    "He's published a research paper in Springer at just the age of ~20!",
    "He's competed in hackathons at IIT Kharagpur, NIT Jamshedpur, and Jadavpur University.",
    "He built a drone-based flood detection system — yes, actual drones!",
    "He knows Solidity and has built on both Ethereum and Aptos blockchains.",
    "He trained large language models at Outlier.ai using RLHF techniques.",
  ],
}

// ─────────────────────────────────────────────────────────────
//  NLP ENGINE
// ─────────────────────────────────────────────────────────────

/** Normalize input: lowercase, collapse whitespace, strip punctuation */
const normalize = (text: string): string =>
  text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim()

/** Check if any of the patterns match the normalized text */
const matchesAny = (text: string, patterns: (string | RegExp)[]): boolean =>
  patterns.some((p) => (typeof p === "string" ? text.includes(p) : p.test(text)))

/** Extract numbers from text */
const extractNumber = (text: string): number | null => {
  const m = text.match(/\d+/)
  return m ? parseInt(m[0]) : null
}

/** Pick a random element from an array */
const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/** Synonym map for intent detection */
const SYNONYMS: Record<string, string[]> = {
  // Greetings
  greet: ["hi", "hello", "hey", "howdy", "hola", "greetings", "good morning", "good afternoon", "good evening", "good night", "what's up", "whats up", "sup", "yo", "namaste", "hii", "helo", "heya"],
  // Farewell
  bye: ["bye", "goodbye", "see you", "cya", "take care", "ttyl", "later", "farewell", "adios"],
  // Thanks
  thanks: ["thanks", "thank you", "thankyou", "thx", "ty", "appreciate", "grateful"],
  // Skills
  skills: ["skill", "skills", "tech stack", "technologies", "technology", "tools", "know", "expertise", "proficient", "capable", "good at", "work with", "use", "framework", "library", "language", "programming", "coding", "stack", "toolset"],
  // Experience
  experience: ["experience", "work", "worked", "intern", "internship", "job", "position", "role", "company", "employer", "career", "professional", "industry", "employed"],
  // Projects
  projects: ["project", "projects", "built", "build", "made", "created", "developed", "work on", "portfolio", "app", "application", "system", "website", "tool", "product", "repo", "repository", "github"],
  // Education
  education: ["education", "study", "studied", "school", "college", "university", "degree", "qualification", "academic", "institution", "cgpa", "gpa", "grade", "marks", "percentage", "b.tech", "btech", "engineering", "graduate", "student"],
  // Research
  research: ["research", "paper", "publication", "published", "journal", "conference", "springer", "icaa", "study", "academic work", "authored", "presented"],
  // Contact
  contact: ["contact", "reach", "email", "mail", "message", "connect", "hire", "available", "get in touch", "dm", "social", "linkedin", "twitter", "github", "location", "based", "where"],
  // Achievements
  achievements: ["achievement", "award", "hackathon", "competition", "won", "winner", "prize", "rank", "position", "recognition", "accomplishment", "honors", "honour", "competition", "fest", "event", "coding"],
  // Hobbies
  hobbies: ["hobby", "hobbies", "interest", "interests", "free time", "fun", "like", "enjoy", "passion", "outside work", "personal", "leisure"],
  // Fun facts
  funfact: ["fun fact", "fun", "interesting", "cool", "unique", "surprise", "tell me something", "did you know", "random", "fascinating"],
  // About
  about: ["who", "about", "tell me", "describe", "overview", "summary", "introduction", "intro", "background", "profile", "yourself", "ananyo"],
  // Specific skills queries
  python: ["python"],
  javascript: ["javascript", "js"],
  react: ["react", "reactjs"],
  nextjs: ["next.js", "nextjs", "next js"],
  ai: ["artificial intelligence", " ai ", "machine learning", " ml ", "deep learning", "neural"],
  nlp: ["nlp", "natural language", "language model", "llm", "gpt", "text"],
  cv: ["computer vision", "opencv", "image", "visual", "yolo", "detection", "recognition"],
  blockchain: ["blockchain", "web3", "ethereum", "solidity", "smart contract", "nft", "defi", "aptos", "crypto"],
  android: ["android", "kotlin", "mobile app", "jetpack", "flutter"],
  // Specific project queries
  omiguard: ["omiguard", "drone", "flood", "flood prediction"],
  aqi: ["aqi", "air quality", "pollution", "clearskies", "clear skies"],
  hospital: ["hospital", "patient", "healthcare", "curoxis"],
  mobile_detect: ["mobile phone detection", "mobile detection", "phone detection", "restricted zone"],
  cryptosentinel: ["cryptosentinel", "crypto sentinel"],
  pragati: ["pragati", "disaster", "relief", "arima"],
  educhainverify: ["educhainverify", "educhain", "credential", "certificate verification"],
  // Specific experience queries
  qwertyzen: ["qwertyzen", "qwerty zen", "audio", "vocal", "music intern"],
  transcon: ["transcon", "sign language", "gesture", "multimodal"],
  bluestock: ["bluestock", "fintech", "finance", "sde intern"],
  outlier: ["outlier", "llm trainer", "rlhf", "fine-tun", "finetun"],
  // Specific education
  heritage: ["heritage", "heritage institute"],
  aryans: ["aryans", "aryan school", "icse", "isc"],
}

/** Expand synonyms: returns a set of matched intent keys */
const detectIntents = (text: string): Set<string> => {
  const found = new Set<string>()
  for (const [intent, words] of Object.entries(SYNONYMS)) {
    for (const w of words) {
      if (text.includes(w)) {
        found.add(intent)
        break
      }
    }
  }
  return found
}

// ─────────────────────────────────────────────────────────────
//  RESPONSE BUILDERS
// ─────────────────────────────────────────────────────────────

const buildGreetResponse = (): string =>
  pick([
    "Hey there! 👋 I'm Ananyo-Bot, your guide to everything about Ananyo Dasgupta. What would you like to know?",
    "Hello! I'm here to tell you all about Ananyo — his projects, skills, experience, or anything else. Fire away!",
    "Hi! Great to have you here. I can tell you about Ananyo's work, skills, research, education, and more. What's on your mind?",
    "Hey! I'm Ananyo-Bot 🤖. Ask me anything about Ananyo's portfolio — I've got all the details!",
    "Namaste! 🙏 I'm Ananyo's AI assistant. How can I help you today?",
  ])

const buildByeResponse = (): string =>
  pick([
    "Goodbye! Feel free to come back if you have more questions about Ananyo. 👋",
    "Take care! Hope I was helpful. Don't hesitate to return anytime! 😊",
    "See you! If you want to reach Ananyo directly, drop him an email at dasguptaananyo28@gmail.com. 🚀",
    "Bye! Best of luck — and check out his GitHub at github.com/CodenWizFreak for some amazing projects! ✌️",
  ])

const buildThanksResponse = (): string =>
  pick([
    "You're welcome! 😊 Is there anything else you'd like to know about Ananyo?",
    "Happy to help! Feel free to ask more questions anytime.",
    "Of course! That's what I'm here for. Anything else?",
    "Glad I could help! Reach out to Ananyo directly at dasguptaananyo28@gmail.com if you'd like to connect.",
  ])

const buildAboutResponse = (): string =>
  pick([
    `Ananyo Dasgupta is an AI & Machine Learning Developer based in Kolkata, India. He started his journey with Android app development and has since evolved into a full-fledged ML engineer with expertise in Generative AI, NLP, Deep Learning, and Computer Vision. He's currently pursuing his B.Tech in CS (AI & ML) at Heritage Institute of Technology with a CGPA of 8.5. He's also an active hackathon competitor and published researcher at Springer! 🚀`,
    `Ananyo is a passionate AI/ML developer from Kolkata who wears many hats — researcher, hackathon champion, intern, and open-source contributor. His tech journey started with Android apps in Kotlin, expanded into full-stack web dev, and now centers on cutting-edge AI. He's published at ICAA 2025 and has interned at companies like Outlier.ai and Transcon IT Solutions. 💡`,
    `Meet Ananyo Dasgupta — a B.Tech student at Heritage Institute of Technology, specializing in AI & ML. He's proficient in Python, TensorFlow, PyTorch, YOLO, and a whole ecosystem of tools. Beyond code, he sings, plays guitar and drums, and loves trekking. A true renaissance developer! 🎸🧠`,
  ])

const buildSkillsResponse = (intents: Set<string>): string => {
  // Specific skill queries
  if (intents.has("python")) return "Python is Ananyo's primary language — he uses it daily for ML pipelines, data science, scripting, and backend development. He's highly proficient with libraries like TensorFlow, PyTorch, NumPy, Pandas, OpenCV, and Flask."
  if (intents.has("javascript")) return "Ananyo is solid with JavaScript/TypeScript — he uses React and Next.js for frontend development, and Node.js with Express for backend APIs."
  if (intents.has("react") || intents.has("nextjs")) return "Ananyo uses React and Next.js extensively for building full-stack web applications. Projects like Edvita and the Hospital Management System are built on the Next.js stack."
  if (intents.has("ai")) return "AI/ML is Ananyo's core domain. He's proficient with TensorFlow, PyTorch, Scikit-Learn, Keras, Hugging Face Transformers, LangChain, and various ML architectures. He's trained LLMs, built CV systems, and published research in this space."
  if (intents.has("nlp")) return "NLP is one of Ananyo's strengths. He's worked with LLMs, RLHF, transformer architectures (at Outlier.ai), and built systems like Entropy-Based Sentence Boundary Detection and CryptoSentinel."
  if (intents.has("cv")) return "Computer Vision is a big part of Ananyo's work. He uses OpenCV, YOLO, and CNN architectures. His YOLO-based mobile phone detection system even made it into a Springer publication!"
  if (intents.has("blockchain")) return "Ananyo has hands-on experience with blockchain tech — he's built smart contracts in Solidity on Ethereum, developed dApps on Aptos, and worked on NFT/DeFi platforms and credential verification systems."
  if (intents.has("android")) return "Ananyo started his career with Android development using Kotlin and Jetpack Compose. He built apps like 'Crest' (a music social app) and 'Prodigy' (a personalized calculator)."

  // General skills overview
  const all = Object.entries(KB.skills).map(([cat, items]) => `**${cat}:** ${items.slice(0, 5).join(", ")}${items.length > 5 ? ` +${items.length - 5} more` : ""}`).join("\n")
  return pick([
    `Ananyo has a broad and deep tech stack across multiple domains:\n\n${all}\n\nHe's especially strong in Python, TensorFlow, PyTorch, YOLO, React, and Next.js. Want details on any specific area?`,
    `Here's Ananyo's tech stack at a glance:\n\n${all}\n\nHis core strength is AI/ML, but he's also a capable full-stack and blockchain developer!`,
  ])
}

const buildExperienceResponse = (intents: Set<string>): string => {
  // Specific company queries
  if (intents.has("qwertyzen")) {
    const e = KB.experience[0]
    return `At **${e.company}** (${e.period}), Ananyo worked as a ${e.role}. ${e.desc}`
  }
  if (intents.has("transcon")) {
    const e = KB.experience[1]
    return `At **${e.company}** (${e.period}), Ananyo worked as a ${e.role}. ${e.desc}`
  }
  if (intents.has("bluestock")) {
    const e = KB.experience[2]
    return `At **${e.company}** (${e.period}), Ananyo worked as a ${e.role}. ${e.desc}`
  }
  if (intents.has("outlier")) {
    const e = KB.experience[3]
    return `At **${e.company}** (${e.period}), Ananyo worked as a ${e.role}. ${e.desc}`
  }

  // General experience overview
  const summary = KB.experience.map((e) => `• **${e.role}** @ ${e.company} (${e.period}, ${e.location})`).join("\n")
  return pick([
    `Ananyo has had 4 professional roles so far:\n\n${summary}\n\nHe's worked across audio ML, multimodal deep learning, fintech frontend dev, and LLM training. Want details on any specific role?`,
    `Here's Ananyo's professional journey:\n\n${summary}\n\nNotably, he trained LLMs using RLHF at Outlier.ai and built a sign-language-to-audio pipeline at Transcon IT Solutions!`,
  ])
}

const buildProjectsResponse = (intents: Set<string>, text: string): string => {
  // Specific project queries
  if (intents.has("omiguard")) {
    const p = KB.projects[0]
    return `**${p.full}** is one of Ananyo's standout projects. ${p.desc} 🚁\n\nGitHub: ${p.link}`
  }
  if (intents.has("aqi") || text.includes("clearskies")) {
    const p = KB.projects.find((x) => x.name === "ClearSkies") || KB.projects.find((x) => x.name === "AQI and Air Pollution Analysis")
    if (p) return `**${p.full}**: ${p.desc}\n\nGitHub: ${p.link}`
  }
  if (intents.has("hospital")) {
    const p = KB.projects.find((x) => x.name === "Hospital Patient Management System")!
    return `**${p.full}**: ${p.desc}\n\nGitHub: ${p.link}`
  }
  if (intents.has("mobile_detect")) {
    const p = KB.projects.find((x) => x.name === "Mobile Phone Detection")!
    return `**${p.full}**: ${p.desc} This project also led to his Springer publication!\n\nGitHub: ${p.link}`
  }
  if (intents.has("cryptosentinel")) {
    const p = KB.projects.find((x) => x.name === "CryptoSentinel")!
    return `**${p.full}**: ${p.desc}\n\nGitHub: ${p.link}`
  }
  if (intents.has("pragati")) {
    const p = KB.projects.find((x) => x.name === "Pragati Aid")!
    return `**${p.full}**: ${p.desc}\n\nGitHub: ${p.link}`
  }
  if (intents.has("educhainverify")) {
    const p = KB.projects.find((x) => x.name === "EduChainVerify")!
    return `**${p.full}**: ${p.desc}\n\nGitHub: ${p.link}`
  }
  if (intents.has("blockchain")) {
    const bProjects = KB.projects.filter((p) => p.tags.some((t) => ["Blockchain", "Web3", "Ethereum", "Aptos"].includes(t)))
    const list = bProjects.map((p) => `• **${p.name}** — ${p.desc}`).join("\n")
    return `Ananyo has built several blockchain/Web3 projects:\n\n${list}\n\nHe's worked with Ethereum, Aptos, and Solidity!`
  }

  // General overview
  const highlights = KB.projects.slice(0, 6).map((p) => `• **${p.name}** — ${p.desc}`).join("\n")
  return pick([
    `Ananyo has built **${KB.projects.length} projects** spanning AI, blockchain, mobile, and web. Here are some highlights:\n\n${highlights}\n\n...and many more! Check out github.com/CodenWizFreak for all of them.`,
    `Here's a peek at Ananyo's project portfolio (${KB.projects.length} projects total):\n\n${highlights}\n\nAsk me about any specific one for details!`,
  ])
}

const buildEducationResponse = (intents: Set<string>): string => {
  if (intents.has("heritage")) {
    const e = KB.education[0]
    return `Ananyo is currently pursuing **${e.degree}** at **${e.institution}** (${e.year}). His current academic performance is strong — ${e.grade}.`
  }
  if (intents.has("aryans")) {
    const hsd = KB.education[1]
    const icse = KB.education[2]
    return `Ananyo completed his schooling at **${hsd.institution}**. He scored **${hsd.grade}** in ISC (Class 12) and an impressive **${icse.grade}** in ICSE (Class 10)!`
  }

  const edu = KB.education.map((e) => `• **${e.degree}** — ${e.institution} (${e.year}) | ${e.grade}`).join("\n")
  return pick([
    `Ananyo's educational background:\n\n${edu}\n\nCurrently in his 3rd year of B.Tech at Heritage Institute of Technology with a 8.5 CGPA!`,
    `Here's Ananyo's academic journey:\n\n${edu}\n\nHe scored 97.6% in ICSE and 92.75% in ISC — clearly a consistent performer! 🎓`,
  ])
}

const buildResearchResponse = (): string => {
  const r = KB.research[0]
  return pick([
    `Ananyo has a published research paper at **${r.publisher}**!\n\n📄 **"${r.title}"**\nVenue: ${r.venue} (${r.year})\nTags: ${r.tags.join(", ")}\n\nYou can read it here: ${r.link}`,
    `Ananyo made it into Springer at just ~20 years old! His paper **"${r.title}"** was published at ICAA 2025 and covers YOLO-based AI monitoring systems. Check it out: ${r.link}`,
  ])
}

const buildContactResponse = (intents: Set<string>): string => {
  if (intents.has("linkedin")) return `Ananyo's LinkedIn profile: ${KB.linkedin} — Feel free to connect with him!`
  if (intents.has("github")) return `Ananyo's GitHub: ${KB.github} (handle: @${KB.github_handle}) — He's got ${KB.projects.length} public projects there!`
  if (intents.has("twitter")) return `You can find Ananyo on X (Twitter) at ${KB.twitter} — give him a follow!`

  return pick([
    `Here's how you can reach Ananyo:\n\n📧 Email: ${KB.email}\n📍 Location: ${KB.location}\n💼 LinkedIn: ${KB.linkedin}\n🐙 GitHub: ${KB.github}\n🐦 Twitter/X: ${KB.twitter}\n🔬 ResearchGate: ${KB.researchgate}`,
    `Want to connect with Ananyo? Here you go:\n\n• Email: ${KB.email}\n• GitHub: ${KB.github}\n• LinkedIn: ${KB.linkedin}\n• Portfolio: ${KB.portfolio}\n\nHe's open to collaborations, internships, and interesting projects!`,
  ])
}

const buildAchievementsResponse = (): string => {
  const list = KB.achievements.map((a) => `🏆 ${a}`).join("\n")
  return pick([
    `Ananyo has had an impressive run at hackathons and competitions:\n\n${list}\n\nHe's competed at IIT Kharagpur, NIT Jamshedpur, Jadavpur University, and more!`,
    `Ananyo is a serial hackathon competitor with some great wins:\n\n${list}\n\nHis team has placed in the top ranks at major national-level events! 🥇`,
  ])
}

const buildHobbiesResponse = (): string => {
  const list = KB.hobbies.join(", ")
  return pick([
    `Outside of coding, Ananyo is quite the Renaissance man! He enjoys: ${list}. He plays both guitar AND drums — not many developers can say that! 🎸🥁`,
    `Ananyo's interests beyond tech include: ${list}. He's a music lover (guitar + drums), an adventurer (trekking), and a creative soul (art & craft). 🎨`,
  ])
}

const buildFunFactResponse = (): string => {
  return `✨ Fun fact: ${pick(KB.funFacts)}`
}

const buildFallbackResponse = (text: string): string => {
  const suggestions = [
    "his skills and tech stack",
    "his projects",
    "his work experience",
    "his education",
    "his research paper",
    "his hackathon achievements",
    "how to contact him",
  ]
  return pick([
    `Hmm, I'm not sure about that one! 🤔 But I can tell you about ${pick(suggestions)}. What would you like to know?`,
    `I didn't quite catch that — I'm specialized in Ananyo's portfolio. Try asking me about his ${pick(suggestions)}!`,
    `That's a bit outside my knowledge base. I'm best at answering questions about Ananyo's work, skills, projects, and background. What would you like to explore?`,
  ])
}

// ─────────────────────────────────────────────────────────────
//  CONTEXT / CONVERSATION MEMORY
// ─────────────────────────────────────────────────────────────
interface ConvContext {
  lastTopic: string | null
  messageCount: number
}

// ─────────────────────────────────────────────────────────────
//  MASTER RESPONSE FUNCTION
// ─────────────────────────────────────────────────────────────
const getResponse = (rawInput: string, ctx: ConvContext): string => {
  const text = normalize(rawInput)
  const intents = detectIntents(text)

  // Greetings (highest priority)
  if (intents.has("greet") && text.split(" ").length <= 5) {
    return buildGreetResponse()
  }

  // Farewell
  if (intents.has("bye")) return buildByeResponse()

  // Thanks
  if (intents.has("thanks")) return buildThanksResponse()

  // "Who are you" / "What are you" — bot identity
  if (matchesAny(text, [/\bwho are you\b/, /\bwhat are you\b/, /\byour name\b/, /\bintroduce yourself\b/, /\babout you\b/])) {
    return `I'm Ananyo-Bot 🤖 — a custom AI assistant built for Ananyo Dasgupta's portfolio. I can answer questions about his skills, projects, experience, research, education, and more! Ask away.`
  }

  // "Can you help" / "What can you do"
  if (matchesAny(text, [/what can you/, /help me/, /what do you know/, /capabilities/, /\bwhat.*do\b/])) {
    return `I can tell you about:\n\n• 🛠️ Ananyo's skills & tech stack\n• 💼 His work experience (4 internships)\n• 🚀 His projects (${KB.projects.length} of them!)\n• 📚 His education\n• 📄 His research paper (Springer)\n• 🏆 His hackathon achievements\n• 🎸 His hobbies\n• 📬 How to contact him\n\nWhat would you like to know?`
  }

  // Fun fact
  if (intents.has("funfact")) return buildFunFactResponse()

  // Hobbies
  if (intents.has("hobbies")) return buildHobbiesResponse()

  // Achievements / Hackathons
  if (intents.has("achievements")) return buildAchievementsResponse()

  // Research
  if (intents.has("research")) return buildResearchResponse()

  // Contact / Social
  if (intents.has("contact")) return buildContactResponse(intents)

  // Education
  if (intents.has("education")) return buildEducationResponse(intents)

  // Skills — check before projects since "python" etc overlap
  if (intents.has("skills") || intents.has("python") || intents.has("javascript") || intents.has("react") || intents.has("nextjs") || intents.has("ai") || intents.has("nlp") || intents.has("cv") || intents.has("blockchain") || intents.has("android")) {
    return buildSkillsResponse(intents)
  }

  // Experience
  if (intents.has("experience") || intents.has("qwertyzen") || intents.has("transcon") || intents.has("bluestock") || intents.has("outlier")) {
    return buildExperienceResponse(intents)
  }

  // Projects
  if (intents.has("projects") || intents.has("omiguard") || intents.has("aqi") || intents.has("hospital") || intents.has("mobile_detect") || intents.has("cryptosentinel") || intents.has("pragati") || intents.has("educhainverify")) {
    return buildProjectsResponse(intents, text)
  }

  // About / General
  if (intents.has("about")) return buildAboutResponse()

  // Contextual follow-ups — if user says "tell me more" / "elaborate" / "details"
  if (matchesAny(text, [/more detail/, /tell me more/, /elaborate/, /expand/, /explain/, /give me more/])) {
    if (ctx.lastTopic === "skills") return buildSkillsResponse(new Set(["skills"]))
    if (ctx.lastTopic === "projects") return buildProjectsResponse(new Set(["projects"]), text)
    if (ctx.lastTopic === "experience") return buildExperienceResponse(new Set(["experience"]))
    if (ctx.lastTopic === "education") return buildEducationResponse(new Set(["education"]))
    if (ctx.lastTopic === "research") return buildResearchResponse()
    return buildAboutResponse()
  }

  // "Yes"/"No" follow ups
  if (matchesAny(text, [/^yes$/, /^yeah$/, /^sure$/, /^ok$/, /^okay$/, /^yep$/, /^yup$/])) {
    return pick([
      "Great! What would you like to know more about? I can cover his skills, projects, experience, research, education, achievements, or hobbies.",
      "Awesome! Ask me anything about Ananyo's portfolio — skills, projects, internships, research, or contact info!",
    ])
  }

  // Fallback
  return buildFallbackResponse(text)
}

// ─────────────────────────────────────────────────────────────
//  PRE-BUILT QUESTIONS
// ─────────────────────────────────────────────────────────────
const preBuiltQuestions = [
  "What are Ananyo's main skills?",
  "Tell me about his experience",
  "What projects has he worked on?",
  "What is his educational background?",
  "How can I contact him?",
  "What research has he published?",
  "What are his hobbies?",
  "Tell me a fun fact about him.",
]

// ─────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Ananyo's AI assistant. I can answer questions about his background, skills, and experience. Try asking me something or click on one of the suggested questions below!",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const ctxRef = useRef<ConvContext>({ lastTopic: null, messageCount: 0 })

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join("")
          setInputText(transcript)
        }
        recognition.onend = () => setIsListening(false)
        recognition.onerror = () => setIsListening(false)
        recognitionRef.current = recognition
      }
    }
  }, [])

  const handleListen = () => {
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  /** Update conversation context based on response */
  const updateContext = (response: string) => {
    const r = response.toLowerCase()
    const ctx = ctxRef.current
    ctx.messageCount++
    if (r.includes("skill") || r.includes("tech") || r.includes("python") || r.includes("tensorflow")) ctx.lastTopic = "skills"
    else if (r.includes("project") || r.includes("github") || r.includes("built")) ctx.lastTopic = "projects"
    else if (r.includes("intern") || r.includes("company") || r.includes("experience")) ctx.lastTopic = "experience"
    else if (r.includes("education") || r.includes("cgpa") || r.includes("university")) ctx.lastTopic = "education"
    else if (r.includes("research") || r.includes("springer") || r.includes("paper")) ctx.lastTopic = "research"
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate a slight "thinking" delay for realism
    const thinkTime = 400 + Math.random() * 500
    await new Promise((res) => setTimeout(res, thinkTime))

    const response = getResponse(text, ctxRef.current)
    updateContext(response)

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsTyping(false)
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.3)] transition-all duration-300 animate-pulse"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-400 animate-spin opacity-75"></div>
            <FaRobot className="text-white text-2xl relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 left-6 z-50 w-96 h-[500px] bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-75 animate-spin"></div>
            <div className="absolute inset-[2px] rounded-xl bg-gray-900/95 backdrop-blur-md"></div>

            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700/50 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Assistant</h3>
                    <p className="text-green-400 text-xs">Ask me about Ananyo</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <FaTimes />
                </button>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Messages Area */}
                <div className="h-2/3 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser ? "bg-green-600 text-white" : "bg-gray-800 text-white border border-gray-700"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <div className="h-1/3 overflow-y-auto p-4 border-t border-gray-700/50">
                  <p className="text-gray-400 text-xs mb-2">Or click on a question:</p>
                  <div className="flex flex-wrap gap-2">
                    {preBuiltQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="text-xs bg-gray-800 text-green-400 px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-700/50 flex-shrink-0">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                    placeholder={isListening ? "Listening..." : "Ask me anything about Ananyo..."}
                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none text-sm"
                  />
                  {recognitionRef.current && (
                    <button
                      onClick={handleListen}
                      className={`p-2 rounded-lg transition-colors ${
                        isListening ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-600 hover:bg-gray-700 text-white"
                      }`}
                    >
                      <FaMicrophone className="text-sm" />
                    </button>
                  )}
                  <button
                    onClick={() => handleSendMessage(inputText)}
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

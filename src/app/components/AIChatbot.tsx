"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaRobot, FaTimes, FaPaperPlane, FaMicrophone } from "react-icons/fa"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

// Declare the SpeechRecognition type for browser compatibility
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

// Fallback response function
const getFallbackResponse = (question: string): string => {
  console.log("Using fallback response for:", question);
  const lowerQuestion = question.toLowerCase();
  
  // Greeting responses
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/i.test(lowerQuestion))  {
    return "Hello! I'm Ananyo-Bot. How can I answer your questions about Ananyo's portfolio?"
  }
  
  // Skills
  if (lowerQuestion.includes("skill")) {
    return "Ananyo is skilled in Python, JavaScript, React, Next.js, TensorFlow, PyTorch, Computer Vision, Natural Language Processing (NLP), and various other AI/ML technologies."
  } 
  // Experience
  else if (lowerQuestion.includes("experience")) {
    return "Ananyo has experience in developing AI/ML solutions, full-stack web development, and research in environmental monitoring using advanced CNN models."
  } 
  // Projects
  else if (lowerQuestion.includes("project")) {
    return "Some of his notable projects include AQI Analysis using CNN models, Hospital Management System with AI, Mobile Phone Detection using YOLO, and Disaster Preparedness systems with blockchain integration."
  } 
  // Education
  else if (lowerQuestion.includes("education") || lowerQuestion.includes("background")) {
    return "Ananyo is pursuing Computer Science with a focus on AI and Machine Learning technologies."
  } 
  // Contact
  else if (lowerQuestion.includes("contact")) {
    return "You can contact Ananyo via email at dasguptaananyo28@gmail.com. He's based in Kolkata, India."
  } 
  // Research
  else if (lowerQuestion.includes("research") || lowerQuestion.includes("publication")) {
    return "Ananyo has published research on 'AI-driven Monitoring System for Detecting People Using Mobile Phones in Restricted Zone' at ICAA 2025."
  }
  // Hobbies
  else if (lowerQuestion.includes("hobbies") || lowerQuestion.includes("hobby")) {
    return "Ananyo enjoys Research, Watching Movies & Shows, Singing, Playing Guitar/Drums, Travel & Trekking, and Art & Craft."
  }
  // Fun fact
  else if (lowerQuestion.includes("fun fact") || lowerQuestion.includes("interesting")) {
    return "Fun fact: Although primarily an AI/ML developer, Ananyo also has experience in Android app development and Blockchain technology!"
  }
  // Languages
  else if (lowerQuestion.includes("language")) {
    return "Ananyo speaks English, Hindi, Bengali, and has basic knowledge of German."
  }
  // Location
  else if (lowerQuestion.includes("location") || lowerQuestion.includes("where")) {
    return "Ananyo is based in Kolkata, India."
  }
  // Default
  else {
    return "I can only answer questions related to Ananyo Dasgupta's portfolio. How can I help you with that?"
  }
}

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

        recognition.onend = () => {
          setIsListening(false)
        }
        
        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        }

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Integrated Gemini API call function
  const getAIResponse = async (question: string): Promise<string> => {
    console.log("🚀 Starting Gemini API call with question:", question);
    
    // Get API key from environment
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!API_KEY) {
      console.error("❌ GEMINI_API_KEY is not set in environment variables");
      console.log("📄 Using fallback response instead");
      return getFallbackResponse(question);
    }

    try {
      const MODEL_NAME = "gemini-2.0-flash";
      console.log("🤖 Initializing Gemini AI...");
      
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      // Simplified and more effective prompt
      const prompt = `You are Ananyo-Bot, an AI assistant for Ananyo Dasgupta's portfolio. Answer questions about Ananyo using the information below.

ABOUT ANANYO DASGUPTA:
- Role: AI & Machine Learning Developer
- Location: Kolkata, India
- Core Skills: Python, JavaScript, React, Next.js, TensorFlow, PyTorch, Computer Vision, Natural Language Processing (NLP)
- Contact: dasguptaananyo28@gmail.com

Key Projects:
- AQI Analysis: Analyzing Air Quality Index data using CNN models
- Hospital Management System: A comprehensive system for managing hospital operations
- Mobile Detection: Computer vision system to detect mobile devices in restricted zones
- Disaster Preparedness: Technology solutions for disaster readiness with blockchain integration

Research:
- Published research on "AI-driven Monitoring System for Detecting People Using Mobile Phones in Restricted Zone" at ICAA 2025

Personal Info:
- Hobbies: Research, Watching Movies & Shows, Singing, Playing Guitar/Drums, Travel & Trekking, Art & Craft
- Languages: English, Hindi, Bengali, German (Basic)
- Fun Fact: Besides AI/ML, Ananyo also has experience in Android app development and Blockchain technology
- Educational Background: Pursuing Computer Science with focus on AI and Machine Learning

INSTRUCTIONS:
1. If the user greets you (hi, hello, hey, good morning, etc.), respond with: "Hello! I'm Ananyo-Bot. How can I answer your questions about Ananyo's portfolio?"

2. For questions about Ananyo, provide helpful answers using the information above. Be conversational and friendly.

3. If asked about something not covered in the context, say: "I can only answer questions related to Ananyo Dasgupta's portfolio. How can I help you with that?"

User's question: "${question}"

Respond naturally and helpfully:`;

      console.log("🤖 Generating content with Gemini...");
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      const text = response.text();

      console.log("✅ Gemini response received:", text);
      return text;
      
    } catch (geminiError: any) {
      console.error("💥 Gemini API error:", geminiError);
      console.log("📄 Using fallback response due to Gemini error");
      return getFallbackResponse(question);
    }
  };

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

    try {
      console.log("🎬 Starting message handling for:", text);
      const aiResponse = await getAIResponse(text);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      console.log("✅ Message handling completed successfully");
    } catch (error) {
      console.error("💥 Error in handleSendMessage:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question)
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
                        <p className="text-sm">{message.text}</p>
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

                {/* Quick Questions Area */}
                <div className="h-1/3 overflow-y-auto p-4 border-t border-gray-700/50">
                  <p className="text-gray-400 text-xs mb-2">Or click on a question:</p>
                  <div className="flex flex-wrap gap-2">
                    {preBuiltQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
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
                           isListening 
                           ? "bg-red-600 hover:bg-red-700 text-white" 
                           : "bg-gray-600 hover:bg-gray-700 text-white"
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
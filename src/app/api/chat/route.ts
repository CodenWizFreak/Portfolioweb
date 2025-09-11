import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { type NextRequest, NextResponse } from "next/server";

const MODEL_NAME = "gemini-2.0-flash"; 
const API_KEY = process.env.GEMINI_API_KEY!;

export async function POST(request: NextRequest) {
  console.log("✅ API route hit!"); 
  try {
    const { message } = await request.json();
    console.log("Received message:", message);

    if (!API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

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

User's question: "${message}"

Respond naturally and helpfully:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("Gemini response:", text);
    return NextResponse.json({ response: text });
    
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message. Check server logs." },
      { status: 500 }
    );
  }
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa"
import { FaXTwitter, FaMapLocationDot } from "react-icons/fa6"
import { SiResearchgate } from "react-icons/si"
import type React from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "e5746658-00e5-409c-8838-58bbb5b9b256",
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: formData.subject || "New Submission from Web3Forms",
      }),
    })

    const result = await response.json()

    if (result.success) {
      setFormStatus("Message sent successfully!")
      setFormData({ name: "", email: "", message: "", subject: "" })
    } else {
      setFormStatus("Error: Could not send message. Please try again later.")
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Contact Me</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-visible">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 text-visible"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-visible">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 text-visible"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-visible">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter the subject (optional)"
                className="w-full p-3 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 text-visible"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-visible">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 text-visible"
                rows={4}
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
          {formStatus && <div className="mt-4 text-center text-lg text-green-400">{formStatus}</div>}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center hover-float">
            <FaEnvelope className="mr-4 text-2xl text-green-400" />
            <a href="mailto:dasguptaananyo28@gmail.com" className="text-visible hover:text-green-300 transition-colors">
              dasguptaananyo28@gmail.com
            </a>
          </div>
          <div className="flex items-center hover-float">
            <FaMapLocationDot className="mr-4 text-2xl text-green-400" />
            <a
              href="https://www.google.com/maps/place/Kolkata,+West+Bengal/@22.5354064,88.2649514,12z/data=!3m1!4b1!4m6!3m5!1s0x39f882db4908f667:0x43e330e68f6c2cbc!8m2!3d22.5743545!4d88.3628734!16zL20vMGN2dzk?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D"
              className="text-visible hover:text-green-300 transition-colors"
            >
              Kolkata, India
            </a>
          </div>
          <div className="flex items-center space-x-6 mt-6">
            <motion.a
              href="https://github.com/CodenWizFreak"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-2xl text-green-400 hover:text-green-300 transition-colors" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/ananyodasgupta2804"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="text-2xl text-green-400 hover:text-green-300 transition-colors" />
            </motion.a>
            <motion.a
              href="https://X.com/DGAnanyo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaXTwitter className="text-2xl text-green-400 hover:text-green-300 transition-colors" />
            </motion.a>
            <motion.a
              href="https://www.researchgate.net/profile/Ananyo-Dasgupta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.5)]"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <SiResearchgate className="text-2xl text-green-400 hover:text-green-300 transition-colors" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

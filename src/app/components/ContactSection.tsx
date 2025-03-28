'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter, FaMapLocationDot } from 'react-icons/fa6'
import React from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '' // Add subject field to formData
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus('')

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
        subject: formData.subject || "New Submission from Web3Forms", // Use user input or default subject
      }),
    })

    const result = await response.json()

    if (result.success) {
      setFormStatus('Message sent successfully!')
      setFormData({ name: '', email: '', message: '', subject: '' }) // Reset form
    } else {
      setFormStatus('Error: Could not send message. Please try again later.')
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="min-h-screen py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animated-gradient-text">Contact Me</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-800 dark:text-gray-200">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-800 dark:text-gray-200">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-gray-800 dark:text-gray-200">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter the subject (optional)"
                className="w-full p-2 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-gray-800 dark:text-gray-200">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                rows={4}
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300 card-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
          {formStatus && (
            <div className="mt-4 text-center text-lg text-green-500 dark:text-green-400">
              {formStatus}
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center hover-float">
            <FaEnvelope className="mr-4 text-2xl text-blue-500 dark:text-blue-400" />
            <a href="mailto:your.email@example.com" className="text-gray-800 dark:text-gray-200 hover:underline">
              dasguptaananyo28@gmail.com
            </a>
          </div>
          <div className="flex items-center hover-float">
            <FaMapLocationDot className="mr-4 text-2xl text-blue-500 dark:text-blue-400" />
            <a href="https://www.google.com/maps/place/Kolkata,+West+Bengal/@22.5354064,88.2649514,12z/data=!3m1!4b1!4m6!3m5!1s0x39f882db4908f667:0x43e330e68f6c2cbc!8m2!3d22.5743545!4d88.3628734!16zL20vMGN2dzk?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D" className="text-gray-800 dark:text-gray-200 hover:underline">
              Kolkata
            </a>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <motion.a
              href="https://github.com/CodenWizFreak"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-float"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-2xl text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/ananyodasgupta2804"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-float"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="text-2xl text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" />
            </motion.a>
            <motion.a
              href="https://X.com/DGAnanyo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-float"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaXTwitter className="text-2xl text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

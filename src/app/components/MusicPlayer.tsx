"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaVolumeUp, FaVolumeMute, FaMusic } from "react-icons/fa"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Auto-play when component mounts
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        console.log("Auto-play prevented by browser:", error)
        // Show the player so user can manually start
        setIsVisible(true)
      }
    }

    // Set up audio properties
    audio.loop = true
    audio.volume = 0.3 // Set to 30% volume

    playAudio()

    return () => {
      if (audio) {
        audio.pause()
      }
    }
  }, [])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log("Audio play error:", error)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = 0.3
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/music.mp3" preload="auto" />

      {/* Music Player UI */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-gray-900/90 backdrop-blur-md rounded-full p-3 border border-gray-700/50 shadow-lg hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.3)] transition-all duration-300">
              <div className="flex items-center space-x-2">
                {/* Music Icon */}
                <div className="flex items-center justify-center w-8 h-8">
                  <FaMusic className={`text-green-400 ${isPlaying ? "animate-pulse" : ""}`} />
                </div>

                {/* Play/Pause Button */}
                <motion.button
                  onClick={togglePlayPause}
                  className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-white rounded-full"></div>
                      <div className="w-1 h-4 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                  )}
                </motion.button>

                {/* Mute/Unmute Button */}
                <motion.button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? (
                    <FaVolumeMute className="text-red-400 text-sm" />
                  ) : (
                    <FaVolumeUp className="text-white text-sm" />
                  )}
                </motion.button>

                {/* Close Button */}
                <motion.button
                  onClick={() => setIsVisible(false)}
                  className="w-6 h-6 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors duration-200 text-xs"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show music player button when hidden */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_5px_rgba(51,238,132,0.3)] transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaMusic className="text-white" />
        </motion.button>
      )}
    </>
  )
}

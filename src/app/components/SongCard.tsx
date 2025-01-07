'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import React from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import Image from 'next/image'

const songs = [
    {
        title: "Surprise Song",
        src: "/rickroll.MP3",
        image: "/rickroll.webp",
    },
    {
        title: "Stayin' Alive - Bee Gees",
        src: "/alive.mp3",
        image: "/alive.jpg",
    },
    {
        title: "Kickstart My Heart - Motley Crue",
        src: "/motley.mp3",
        image: "/motley.jpg",
    },
    {
        title: "Run To You - Bryan Adams",
        src: "/run.mp3",
        image: "/run.jpeg",
    },
    {
        title: "Cum on Feel the Noize - Quiet Riot",
        src: "/noize.mp3",
        image: "/noize.jpg",
    },
]

export default function SongCard() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef<HTMLAudioElement>(null)

    // Play a selected song and ensure playback starts correctly
    const playSong = (index: number) => {
        if (index !== currentSongIndex) {
            setCurrentSongIndex(index)
            setIsPlaying(true)
            setCurrentTime(0)

            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.load()
                audioRef.current.oncanplay = () => {
                    audioRef.current?.play().catch((error) => {
                        console.error("Error playing the audio:", error)
                    })
                }
            }
        } else {
            togglePlayPause()
        }
    }

    // Toggle between play and pause
    const togglePlayPause = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play().catch((error) => {
                console.error("Error resuming audio:", error)
            })
        }

        setIsPlaying(!isPlaying)
    }

    // Update current playback time
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }

    // Set duration when metadata is loaded
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration)
        }
    }

    // Seek to a specific point in the song
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const time = parseFloat(e.target.value)
            audioRef.current.currentTime = time
            setCurrentTime(time)
        }
    }

    // Format time for display
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 dark:from-black/30 dark:to-black/20 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 border border-gray-300 dark:border-gray-800 hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)] dark:hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)]"
        >
            <h2 className="text-2xl font-bold mb-6 text-blue-500 dark:text-green-400 text-center">
                Set The Vibe with This Playlist
            </h2>
            <audio
                ref={audioRef}
                src={songs[currentSongIndex].src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="space-y-4">
                {songs.map((song, index) => (
                    <motion.div
                        key={index}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                            currentSongIndex === index && isPlaying
                                ? "bg-green-500/10 border border-green-500"
                                : "hover:bg-green-400 dark:hover:bg-blue-600"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => playSong(index)}
                    >
                        <div className="relative w-12 h-12 mr-4">
                            <Image
                                src={song.image}
                                alt={song.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-900 dark:text-gray-100 font-medium">
                                {song.title}
                            </p>
                        </div>
                        <motion.div
                            className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full shadow hover:bg-green-600 dark:bg-blue-500 dark:hover:bg-blue-800"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {currentSongIndex === index && isPlaying ? (
                                <FaPause className="w-4 h-4" />
                            ) : (
                                <FaPlay className="w-4 h-4" />
                            )}
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Progress Bar and Time */}
            <div className="mt-6">
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {formatTime(currentTime)}
                    </span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full"
                    />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

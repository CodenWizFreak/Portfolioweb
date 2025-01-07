'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import React from 'react'
import { FaPlay, FaPause, FaForward } from 'react-icons/fa'

const songs = [
    { title: "Press the Play Button", src: "/rickroll.MP3" },
    { title: "Stayin' Alive - Bee Gees", src: "/alive.mp3" },
    { title: "Kickstart My Heart - Motley Crue", src: "/motley.mp3" },
    { title: "Run To You - Bryan Adams", src: "/run.mp3" },
    { title: "Cum on Feel the Noize - Quiet Riot", src: "/noize.mp3" }
]

export default function SongCard() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef<HTMLAudioElement>(null)

    const togglePlayPause = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const changeSong = () => {
        const nextSongIndex = (currentSongIndex + 1) % songs.length
        setCurrentSongIndex(nextSongIndex)
        setIsPlaying(false)
        setCurrentTime(0)
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.load()
        }
    }

    const handleTimeUpdate = () => {
        if (!audioRef.current) return
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return
        setDuration(audioRef.current.duration)
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return
        const time = parseFloat(e.target.value)
        audioRef.current.currentTime = time
        setCurrentTime(time)
    }

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
            whileHover={{ scale: 1.05 }}
            className="w-96 h-72 bg-gradient-to-br from-white/10 to-white/5 dark:from-black/30 dark:to-black/20 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)] dark:hover:shadow-[0_0_20px_5px_rgba(39,254,143,0.89)] flex flex-col justify-between"
        >
            <h2 className="text-2xl font-bold mb-4 text-blue-500 dark:text-pink-400 text-center">
                Set The Vibe
            </h2>
            <audio
                ref={audioRef}
                src={songs[currentSongIndex].src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <p className="text-center text-lg font-semibold mb-4 text-gray-800 dark:text-gray-300">
                {songs[currentSongIndex].title}
            </p>

            <div className="flex items-center justify-center space-x-8">
                <motion.button
                    onClick={togglePlayPause}
                    className="bg-blue-500 text-white w-12 h-12 rounded-full shadow flex items-center justify-center hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isPlaying ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6" />}
                </motion.button>

                <motion.button
                    onClick={changeSong}
                    className="bg-green-500 text-white w-12 h-12 rounded-full shadow flex items-center justify-center hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaForward className="w-6 h-6" />
                </motion.button>
            </div>

            <div className="w-full flex items-center space-x-4 mt-4">
                <span className="text-gray-600 dark:text-gray-300 text-xs">
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
                <span className="text-gray-600 dark:text-gray-300 text-xs">
                    {formatTime(duration)}
                </span>
            </div>
        </motion.div>
    )
}

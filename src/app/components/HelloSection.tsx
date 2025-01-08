'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import SongCard from './SongCard'; // Import the SongCard component

const phrases = [
  "Hey, I'm Ananyo",
  "I'm a passionate android developer with a slight twist!",
  "I'm also interested in Machine Learning and Data Analysis",
  "Welcome to my portfolio!",
];

export default function HelloSection() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = isDeleting ? 1000 : 2000;

    if (!isDeleting && text === currentPhrase) {
      setTimeout(() => setIsDeleting(true), pauseDuration);
      return;
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentPhrase.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <section
      id="hello"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center font-russo gap-12 px-6"
    >
      {/* Left Section - Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left mb-8 md:mb-0"
      >
        <h1
          className="text-4xl md:text-6xl font-bold mb-4 animated-gradient-text leading-tight md:leading-tight"
          style={{ lineHeight: '1.2', paddingBottom: '0.2em' }}
        >
          Hello There! Ananyo Here!
        </h1>

        <p className="text-xl md:text-2xl h-8 text-blue-500 dark:text-pink-400">
          {text}
          <span className="typing-animation"></span>
        </p>
      </motion.div>

      {/* Right Section - SongCard */}
      <SongCard />
    </section>
  );
}

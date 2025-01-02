import HelloSection from './components/HelloSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import EducationSection from './components/EducationSection'
import ResumeSection from './components/ResumeSection'
import ContactSection from './components/ContactSection'
import DynamicBackground from './components/DynamicBackground'
import React from 'react'

export default function Home() {
  return (
    <div className="relative">
      <DynamicBackground />
      <div className="container mx-auto px-4">
        <HelloSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ResumeSection />
        <ContactSection />
      </div>
    </div>
  )
}


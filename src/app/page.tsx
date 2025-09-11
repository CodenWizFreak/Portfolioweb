import HelloSection from "./components/HelloSection"
import AboutSection from "./components/AboutSection"
import SkillsSection from "./components/SkillsSection"
import ProjectsSection from "./components/ProjectsSection"
import ResearchSection from "./components/ResearchSection"
import ExperienceSection from "./components/ExperienceSection"
import EducationSection from "./components/EducationSection"
import ResumeSection from "./components/ResumeSection"
import ContactSection from "./components/ContactSection"
import DynamicBackground from "./components/DynamicBackground"
import MusicPlayer from "./components/MusicPlayer"
import AIChatbot from "./components/AIChatbot"

export default function Home() {
  return (
    <div className="relative">
      <DynamicBackground />
      <div className="container mx-auto px-4">
        <HelloSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResearchSection />
        <ExperienceSection />
        <EducationSection />
        <ResumeSection />
        <ContactSection />
      </div>
      <MusicPlayer />
      <AIChatbot />
    </div>
  )
}

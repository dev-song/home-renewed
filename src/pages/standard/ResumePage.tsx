import { resumeData } from '../../data/resumeData';
import HeroSection from '../../components/standard/HeroSection';
import AboutSection from '../../components/standard/AboutSection';
import ExperienceSection from '../../components/standard/ExperienceSection';
import SkillsSection from '../../components/standard/SkillsSection';
import ProjectsSection from '../../components/standard/ProjectsSection';
import ContactSection from '../../components/standard/ContactSection';
import Footer from '../../components/standard/Footer';
import EducationSection from '../../components/standard/EducationSection';
import CertificatesSection from '../../components/standard/CertificatesSection';

export default function ResumePage() {
  const { hero, about, experience, skills, projects, contact, education, certificates } =
    resumeData;

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-gray-200 selection:text-black'>
      <HeroSection hero={hero} />

      <main className='max-w-5xl mx-auto px-6 py-12 space-y-12 md:py-16 md:space-y-16'>
        <AboutSection about={about} />
        <ExperienceSection experience={experience} />
        <EducationSection education={education} />
        <CertificatesSection certificates={certificates} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ContactSection contact={contact} />
      </main>

      <Footer name={hero.name} />
    </div>
  );
}

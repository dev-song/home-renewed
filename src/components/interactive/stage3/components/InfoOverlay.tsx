import { X } from 'lucide-react';
import { useLanguageStore } from '../../../../store/languageStore';
import { resumeData } from '../../../../data/resumeData';
import { useThreeJSScreenContext } from '../ThreeJSScreenContext';
import { STAGE3_INFO_TYPE } from '../types';

function Stage3InfoOverlay() {
  return (
    <div className='z-20 absolute top-5 left-5 w-80 max-h-4/5 p-4 rounded-lg backdrop-blur-xs overflow-y-auto bg-black/80 text-white animate-fade-in'>
      <CloseOverlayButton />
      <ContentByInfoType />
    </div>
  );
}

export default Stage3InfoOverlay;

/** --------------------
 *  Sub-components
 *  -------------------- */

function CloseOverlayButton() {
  const { setActiveInfo } = useThreeJSScreenContext();
  return (
    <button
      onClick={() => setActiveInfo(null)}
      className='absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-white'
    >
      <X />
    </button>
  );
}

function ContentByInfoType() {
  const { language } = useLanguageStore();
  const { activeInfo } = useThreeJSScreenContext();
  const resumeDataByLanguage = resumeData[language];

  switch (activeInfo) {
    case STAGE3_INFO_TYPE.HERO_ABOUT:
      return (
        <>
          <Hero hero={resumeDataByLanguage.hero} />
          <About about={resumeDataByLanguage.about} />
        </>
      );
    case STAGE3_INFO_TYPE.EXPERIENCE:
      return <Experience experience={resumeDataByLanguage.experience} />;
    case STAGE3_INFO_TYPE.SKILLS:
      return <Skills skills={resumeDataByLanguage.skills} />;
    case STAGE3_INFO_TYPE.PROJECTS:
      return <Projects projects={resumeDataByLanguage.projects} />;
    case STAGE3_INFO_TYPE.EDUCATION_CERTIFICATES:
      return (
        <>
          <Education education={resumeDataByLanguage.education} />
          <Certificates certificates={resumeDataByLanguage.certificates} />
        </>
      );
    case STAGE3_INFO_TYPE.CONTACT:
      return <Contact contact={resumeDataByLanguage.contact} hero={resumeDataByLanguage.hero} />;
    default:
      return null;
  }
}

/** --------------------
 *  Primitives
 *  -------------------- */

type ResumeData = (typeof resumeData)['en' | 'ko'];

type HeroProps = Pick<ResumeData, 'hero'>;

function Hero({ hero }: HeroProps) {
  return (
    <>
      <h2 className='text-xl font-bold mb-2'>{hero.name}</h2>
      <p className='text-gray-300 mb-4'>{hero.tagline}</p>
    </>
  );
}

type AboutProps = Pick<ResumeData, 'about'>;

function About({ about }: AboutProps) {
  return (
    <div className='space-y-2'>
      {about.description.map((desc, i) => (
        <p key={i} className='text-sm text-gray-400'>
          {desc}
        </p>
      ))}
    </div>
  );
}

type ExperienceProps = Pick<ResumeData, 'experience'>;

function Experience({ experience }: ExperienceProps) {
  return (
    <>
      <h2 className='text-xl font-bold mb-4'>Experience</h2>
      {experience.map((exp, i) => (
        <div key={i} className='mb-4 last:mb-0'>
          <h3 className='font-bold'>{exp.company}</h3>
          <p className='text-sm text-blue-300'>
            {exp.role} | {exp.period}
          </p>
          <p className='text-sm text-gray-400 mt-1'>{exp.description}</p>
        </div>
      ))}
    </>
  );
}

type SkillsProps = Pick<ResumeData, 'skills'>;

function Skills({ skills }: SkillsProps) {
  return (
    <>
      <h2 className='text-xl font-bold mb-4'>Skills</h2>
      {skills.map((skillGroup, i) => (
        <div key={i} className='mb-4 last:mb-0'>
          <h3 className='font-bold mb-2'>{skillGroup.category}</h3>
          <div className='flex flex-wrap gap-2'>
            {skillGroup.items.map((item, j) => (
              <span key={j} className='text-xs bg-blue-900/50 px-2 py-1 rounded'>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

type ProjectsProps = Pick<ResumeData, 'projects'>;

function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <h2 className='text-xl font-bold mb-4'>Projects</h2>
      {projects.map((project, i) => (
        <div key={i} className='mb-6 last:mb-0 border-b border-gray-700 pb-4 last:border-0'>
          <h3 className='font-bold'>{project.title}</h3>
          <p className='text-sm text-gray-400 mt-1 mb-2'>{project.description}</p>
          <div className='flex flex-wrap gap-1'>
            {project.technologies.slice(0, 4).map((tech, j) => (
              <span key={j} className='text-xs text-gray-500'>
                #{tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

type EducationProps = Pick<ResumeData, 'education'>;

function Education({ education }: EducationProps) {
  return (
    <>
      <h2 className='text-xl font-bold mb-4'>Education</h2>
      {education.map((edu, i) => (
        <div key={i} className='mb-4'>
          <h3 className='font-bold'>{edu.school}</h3>
          <p className='text-sm'>{edu.degree}</p>
          <p className='text-xs text-gray-400'>{edu.period}</p>
        </div>
      ))}
    </>
  );
}

type CertificatesProps = Pick<ResumeData, 'certificates'>;

function Certificates({ certificates }: CertificatesProps) {
  return (
    <>
      <h2 className='text-xl font-bold mb-4 mt-6'>Certificates</h2>
      {certificates.map((cert, i) => (
        <div key={i} className='mb-2'>
          <span className='block font-medium'>{cert.name}</span>
          <span className='text-xs text-gray-400'>{cert.date}</span>
        </div>
      ))}
    </>
  );
}

type ContactProps = Pick<ResumeData, 'contact' | 'hero'>;

function Contact({ contact, hero }: ContactProps) {
  return (
    <>
      <h2 className='text-xl font-bold mb-4'>Contact</h2>
      <div className='space-y-2 text-sm'>
        <p>
          <span className='text-gray-400'>Email:</span> {contact.email}
        </p>
        <p>
          <span className='text-gray-400'>Phone:</span> {contact.phone}
        </p>
        <p>
          <span className='text-gray-400'>Location:</span> {contact.location}
        </p>
        <div className='pt-2 flex gap-2'>
          {hero.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target='_blank'
              rel='noreferrer'
              className='text-blue-400 hover:text-blue-300'
              style={{ pointerEvents: 'auto' }}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

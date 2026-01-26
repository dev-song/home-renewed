import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { resumeData } from '../../data/resumeData';
import { useLanguageStore } from '../../store/languageStore';
import * as THREE from 'three';
import { X } from 'lucide-react';

// TODO: 추후 3D 두상 모델로 변경
const generateHeadData = () => {
  const points = [];
  for (let x = -2; x <= 2; x += 0.5) {
    for (let y = -2; y <= 3; y += 0.5) {
      for (let z = -2; z <= 2; z += 0.5) {
        // 구체 형태의 로직을 넣어 두상과 비슷하게 필터링
        const distance = Math.sqrt(x * x + y * y + z * z);
        if (distance < 2.5) {
          points.push([x, y, z]);
        }
      }
    }
  }
  return points;
};

const SECTION_TYPE = {
  HERO_ABOUT: 'hero_about',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EDUCATION_CERTIFICATES: 'education_certificates',
  CONTACT: 'contact',
} as const;
type SectionType = typeof SECTION_TYPE[keyof typeof SECTION_TYPE];

const COLOR_BY_SECTION_TYPE = {
  [SECTION_TYPE.HERO_ABOUT]: '#90B4EF',
  [SECTION_TYPE.EXPERIENCE]: '#BAEFAF',
  [SECTION_TYPE.SKILLS]: '#EDEFA6',
  [SECTION_TYPE.PROJECTS]: '#EF9D9D',
  [SECTION_TYPE.EDUCATION_CERTIFICATES]: '#ADA2EF',
  [SECTION_TYPE.CONTACT]: '#EFEFEF',
}

const ORDERED_SECTION = [
  SECTION_TYPE.HERO_ABOUT,
  SECTION_TYPE.EXPERIENCE,
  SECTION_TYPE.SKILLS,
  SECTION_TYPE.PROJECTS,
  SECTION_TYPE.EDUCATION_CERTIFICATES,
  SECTION_TYPE.CONTACT,
]

const LEGEND_LABEL_BY_SECTION = {
  [SECTION_TYPE.HERO_ABOUT]: 'Hero & About',
  [SECTION_TYPE.EXPERIENCE]: 'Experience',
  [SECTION_TYPE.SKILLS]: 'Skills',
  [SECTION_TYPE.PROJECTS]: 'Projects',
  [SECTION_TYPE.EDUCATION_CERTIFICATES]: 'Education',
  [SECTION_TYPE.CONTACT]: 'Contact',
}


const VoxelBox = ({
  position,
  color,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  onClick: () => void;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  // Base size was [0.4, 0.4, 0.4] in args, so we scale relative to 1? Ah args are dimensions.
  // Wait, args in Box are dimensions. Scale is a property of Object3D. Default scale is [1,1,1].

  // Scale animation for entry
  const targetScale = useRef(0);

  // Random initial delay for "pop" effect
  useEffect(() => {
    const delay = Math.random() * 1000;
    const timer = setTimeout(() => {
      targetScale.current = 1;
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      const target = hovered ? 1.3 : targetScale.current;
      // Smoothly interpolate scale
      ref.current.scale.lerp(
        new THREE.Vector3(target, target, target),
        delta * 10, // speed
      );
    }
  });

  return (
    <Box
      ref={ref}
      position={position}
      args={[0.4, 0.4, 0.4]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <meshStandardMaterial
        color={color}
        emissive={hovered ? color : 'black'}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </Box>
  );
};

const Stage3 = () => {
  const { language } = useLanguageStore();
  const resumeDataByLanguage = resumeData[language];
  const voxels = useMemo(() => generateHeadData(), []);
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);

  const handleClick = (index: number) => {
    const sectionIndex = index % ORDERED_SECTION.length;
    setActiveSection(ORDERED_SECTION[sectionIndex]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>
      <Canvas camera={{ position: [5, 5, 5] }} onPointerMissed={() => setActiveSection(null)}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} />

        {voxels.map((pos, idx) => (
          <VoxelBox
            key={idx}
            position={pos as [number, number, number]}
            color={COLOR_BY_SECTION_TYPE[ORDERED_SECTION[idx % ORDERED_SECTION.length]]}
            onClick={() => handleClick(idx)}
          />
        ))}

        <OrbitControls enablePan={false} />
      </Canvas>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '15px',
          borderRadius: '8px',
          backdropFilter: 'blur(3px)',
          pointerEvents: 'none',
        }}
        className='font-sans text-sm'
      >
        <h3 className='text-white font-bold mb-2 text-xs uppercase tracking-wider border-b border-gray-600 pb-1'>
          Legend
        </h3>
        <ul className='flex flex-col gap-2'>
          {ORDERED_SECTION.map((section, idx) => (
          <li key={idx} className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-xs' style={{ background: COLOR_BY_SECTION_TYPE[section] }}></div>
            <span className='text-gray-200'>{LEGEND_LABEL_BY_SECTION[section]}</span>
          </li>
          ))}
        </ul>
      </div>

      {activeSection && (
        <div
          className='animate-fade-in'
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '320px',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            borderRadius: '8px',
            backdropFilter: 'blur(5px)',
            maxHeight: 'calc(100vh - 40px)',
            overflowY: 'auto',
          }}
        >
          <button
            onClick={() => setActiveSection(null)}
            className='absolute top-2 right-2 text-gray-400 hover:text-white'
          >
            <X />
          </button>

          {activeSection === SECTION_TYPE.HERO_ABOUT && (
            <>
              <h2 className='text-xl font-bold mb-2'>{resumeDataByLanguage.hero.name}</h2>
              <p className='text-gray-300 mb-4'>{resumeDataByLanguage.hero.tagline}</p>
              <div className='space-y-2'>
                {resumeDataByLanguage.about.description.map((desc, i) => (
                  <p key={i} className='text-sm text-gray-400'>
                    {desc}
                  </p>
                ))}
              </div>
            </>
          )}

          {activeSection === SECTION_TYPE.EXPERIENCE && (
            <>
              <h2 className='text-xl font-bold mb-4'>Experience</h2>
              {resumeDataByLanguage.experience.map((exp, i) => (
                <div key={i} className='mb-4 last:mb-0'>
                  <h3 className='font-bold'>{exp.company}</h3>
                  <p className='text-sm text-blue-300'>
                    {exp.role} | {exp.period}
                  </p>
                  <p className='text-sm text-gray-400 mt-1'>{exp.description}</p>
                </div>
              ))}
            </>
          )}

          {activeSection === SECTION_TYPE.SKILLS && (
            <>
              <h2 className='text-xl font-bold mb-4'>Skills</h2>
              {resumeDataByLanguage.skills.map((skillGroup, i) => (
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
          )}

          {activeSection === SECTION_TYPE.PROJECTS && (
            <>
              <h2 className='text-xl font-bold mb-4'>Projects</h2>
              {resumeDataByLanguage.projects.map((project, i) => (
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
          )}

          {activeSection === SECTION_TYPE.EDUCATION_CERTIFICATES && (
            <>
              <h2 className='text-xl font-bold mb-4'>Education</h2>
              {resumeDataByLanguage.education.map((edu, i) => (
                <div key={i} className='mb-4'>
                  <h3 className='font-bold'>{edu.school}</h3>
                  <p className='text-sm'>{edu.degree}</p>
                  <p className='text-xs text-gray-400'>{edu.period}</p>
                </div>
              ))}

              <h2 className='text-xl font-bold mb-4 mt-6'>Certificates</h2>
              {resumeDataByLanguage.certificates.map((cert, i) => (
                <div key={i} className='mb-2'>
                  <span className='block font-medium'>{cert.name}</span>
                  <span className='text-xs text-gray-400'>{cert.date}</span>
                </div>
              ))}
            </>
          )}

          {activeSection === SECTION_TYPE.CONTACT && (
            <>
              <h2 className='text-xl font-bold mb-4'>Contact</h2>
              <div className='space-y-2 text-sm'>
                <p>
                  <span className='text-gray-400'>Email:</span> {resumeDataByLanguage.contact.email}
                </p>
                <p>
                  <span className='text-gray-400'>Phone:</span> {resumeDataByLanguage.contact.phone}
                </p>
                <p>
                  <span className='text-gray-400'>Location:</span>{' '}
                  {resumeDataByLanguage.contact.location}
                </p>
                <div className='pt-2 flex gap-2'>
                  {resumeDataByLanguage.hero.socials.map((social) => (
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
          )}
        </div>
      )}
    </div>
  );
};

export default Stage3;

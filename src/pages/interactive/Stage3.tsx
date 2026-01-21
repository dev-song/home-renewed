import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { resumeData } from '../../data/resumeData';
import * as THREE from 'three';

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

const MESH_COLOR = ['#A0C4FF', '#CAFFBF', '#FDFFB6', '#FFADAD', '#BDB2FF', '#FFFFFF'];

type SectionType =
  | 'hero_about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'education_certs'
  | 'contact'
  | null;

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
  const voxels = useMemo(() => generateHeadData(), []);
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  // Separate state to track if we should show the overlay (for unmounting animation if needed, but for now simple conditional)
  // We can just use activeSection for simple mount/unmount.

  const handleClick = (index: number) => {
    const colorIndex = index % MESH_COLOR.length;
    switch (colorIndex) {
      case 0: // #A0C4FF - Hero & About
        setActiveSection('hero_about');
        break;
      case 1: // #CAFFBF - Experience
        setActiveSection('experience');
        break;
      case 2: // #FDFFB6 - Skills
        setActiveSection('skills');
        break;
      case 3: // #FFADAD - Projects
        setActiveSection('projects');
        break;
      case 4: // #BDB2FF - Education & Certificates
        setActiveSection('education_certs');
        break;
      case 5: // #FFFFFF - Contact
        setActiveSection('contact');
        break;
      default:
        setActiveSection(null);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>
      <Canvas camera={{ position: [5, 5, 5] }} onPointerMissed={() => setActiveSection(null)}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {voxels.map((pos, idx) => (
          <VoxelBox
            key={idx}
            position={pos as [number, number, number]}
            color={MESH_COLOR[idx % MESH_COLOR.length]}
            onClick={() => handleClick(idx)}
          />
        ))}

        <OrbitControls enablePan={false} />
      </Canvas>

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
            ✕
          </button>

          {activeSection === 'hero_about' && (
            <>
              <h2 className='text-xl font-bold mb-2'>{resumeData.hero.name}</h2>
              <p className='text-gray-300 mb-4'>{resumeData.hero.tagline}</p>
              <div className='space-y-2'>
                {resumeData.about.description.map((desc, i) => (
                  <p key={i} className='text-sm text-gray-400'>
                    {desc}
                  </p>
                ))}
              </div>
            </>
          )}

          {activeSection === 'experience' && (
            <>
              <h2 className='text-xl font-bold mb-4'>Experience</h2>
              {resumeData.experience.map((exp, i) => (
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

          {activeSection === 'skills' && (
            <>
              <h2 className='text-xl font-bold mb-4'>Skills</h2>
              {resumeData.skills.map((skillGroup, i) => (
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

          {activeSection === 'projects' && (
            <>
              <h2 className='text-xl font-bold mb-4'>Projects</h2>
              {resumeData.projects.map((project, i) => (
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

          {activeSection === 'education_certs' && (
            <>
              <h2 className='text-xl font-bold mb-4'>Education</h2>
              {resumeData.education.map((edu, i) => (
                <div key={i} className='mb-4'>
                  <h3 className='font-bold'>{edu.school}</h3>
                  <p className='text-sm'>{edu.degree}</p>
                  <p className='text-xs text-gray-400'>{edu.period}</p>
                </div>
              ))}

              <h2 className='text-xl font-bold mb-4 mt-6'>Certificates</h2>
              {resumeData.certificates.map((cert, i) => (
                <div key={i} className='mb-2'>
                  <span className='block font-medium'>{cert.name}</span>
                  <span className='text-xs text-gray-400'>{cert.date}</span>
                </div>
              ))}
            </>
          )}

          {activeSection === 'contact' && (
            <>
              <h2 className='text-xl font-bold mb-4'>Contact</h2>
              <div className='space-y-2 text-sm'>
                <p>
                  <span className='text-gray-400'>Email:</span> {resumeData.contact.email}
                </p>
                <p>
                  <span className='text-gray-400'>Phone:</span> {resumeData.contact.phone}
                </p>
                <p>
                  <span className='text-gray-400'>Location:</span> {resumeData.contact.location}
                </p>
                <div className='pt-2 flex gap-2'>
                  {resumeData.hero.socials.map((social) => (
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

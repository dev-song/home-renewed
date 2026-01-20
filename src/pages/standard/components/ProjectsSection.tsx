import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';
import ImageModal from './ImageModal';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  images?: string[];
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id='projects' className='grid md:grid-cols-4 gap-8'>
        <h3 className='text-xl font-bold uppercase tracking-wider text-gray-400'>Projects</h3>
        <div className='md:col-span-3 grid gap-8'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'
            >
              <div className='flex justify-between items-start mb-4'>
                <h4 className='text-xl font-bold text-gray-900'>{project.title}</h4>
                <div className='flex gap-3'>
                  {project.github && (
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-400 hover:text-gray-900 transition-colors'
                    >
                      <Github className='w-5 h-5' />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-gray-400 hover:text-gray-900 transition-colors'
                    >
                      <ExternalLink className='w-5 h-5' />
                    </a>
                  )}
                </div>
              </div>

              {project.images && project.images.length > 0 && (
                <div className='flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide'>
                  {project.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className='h-48 w-auto rounded-lg object-cover shrink-0 cursor-pointer hover:scale-105 hover:opacity-95 transition-all duration-300'
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}

              <p className='text-gray-600 mb-6'>{project.description}</p>
              <div className='flex flex-wrap gap-2'>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className='text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ImageModal
        isOpen={!!selectedImage}
        imageUrl={selectedImage || ''}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}

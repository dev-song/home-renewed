import { ExternalLink, Github, Play } from 'lucide-react';
import { useState } from 'react';
import MediaModal, { type MediaItem } from './MediaModal';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  media?: (string | MediaItem)[];
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleMediaClick = (item: string | MediaItem) => {
    if (typeof item === 'string') {
      setSelectedMedia({ type: 'image', url: item });
    } else {
      setSelectedMedia(item);
    }
  };

  const renderThumbnail = (item: string | MediaItem, projectTitle: string, index: number) => {
    const isVideo = typeof item !== 'string' && item.type === 'video';
    const src = typeof item === 'string' ? item : item.thumbnail || item.url;
    const alt =
      typeof item === 'string'
        ? `${projectTitle} screenshot ${index + 1}`
        : item.alt || `${projectTitle} media ${index + 1}`;

    return (
      <div
        key={index}
        className='relative shrink-0 cursor-pointer group'
        onClick={() => handleMediaClick(item)}
      >
        <img
          src={src}
          alt={alt}
          className='h-48 w-auto rounded-lg object-cover group-hover:scale-105 group-hover:opacity-95 transition-all duration-300'
        />
        {isVideo && (
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='bg-black/50 rounded-full p-2 group-hover:bg-black/70 transition-colors'>
              <Play className='w-8 h-8 text-white fill-white' />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <section id='projects' className='grid md:grid-cols-4 gap-8'>
        <h3 className='text-xl font-bold uppercase tracking-wider text-gray-400'>Projects</h3>
        <div className='md:col-span-3 grid gap-8'>
          {projects.map((project, index) => (
            <article
              key={index}
              className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'
            >
              <header className='flex justify-between items-start mb-4'>
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
              </header>

              {project.media && project.media.length > 0 && (
                <div className='flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide'>
                  {project.media.map((item, idx) => renderThumbnail(item, project.title, idx))}
                </div>
              )}

              <p className='text-gray-600 mb-6'>{project.description}</p>
              <footer className='flex flex-wrap gap-2'>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className='text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded'
                  >
                    {tech}
                  </span>
                ))}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <MediaModal
        isOpen={!!selectedMedia}
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </>
  );
}

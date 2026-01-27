import { ExternalLink, Play } from 'lucide-react';
import { useState } from 'react';
import MediaModal, { MEDIA_TYPE, type MediaItem } from './MediaModal';
import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  media?: MediaItem[];
}

const PROJECTS_SECTION_KEY = 'projects';

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  return (
    <>
      <SectionLayout id={PROJECTS_SECTION_KEY}>
        <SectionTitle title={PROJECTS_SECTION_KEY} />
        <div className='md:col-span-3 grid gap-8'>
          {projects.map((project, index) => (
            <Project key={index} project={project} onThumbnailClick={setSelectedMedia} />
          ))}
        </div>
      </SectionLayout>

      {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />}
    </>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

interface ProjectProps {
  project: Project;
  onThumbnailClick: (item: MediaItem) => void;
}

function Project({ project, onThumbnailClick }: ProjectProps) {
  return (
    <article className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'>
      <header className='flex justify-between items-center mb-2'>
        <ProjectTitle title={project.title} />
        {project.link && <ProjectLink href={project.link} aria-label={project.title} />}
      </header>

      {project.media && project.media.length > 0 && (
        <div className='flex gap-4 overflow-x-auto overflow-y-hidden mb-2 scrollbar-hide'>
          {project.media.map((item, idx) => (
            <MediaThumbnail
              key={idx}
              item={item}
              projectTitle={project.title}
              onClick={() => onThumbnailClick(item)}
            />
          ))}
        </div>
      )}

      <ProjectDescription description={project.description} />

      <footer className='flex flex-wrap gap-2'>
        {project.technologies.map((tech) => (
          <TechnologyBadge key={tech} technology={tech} />
        ))}
      </footer>
    </article>
  );
}

/** --------------------
 *  Primitives
 *  -------------------- */

interface ProjectTitleProps {
  title: string;
}

function ProjectTitle({ title }: ProjectTitleProps) {
  return <h4 className='text-lg font-bold text-gray-900'>{title}</h4>;
}

type ProjectLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>;

function ProjectLink({ ...props }: ProjectLinkProps) {
  return (
    <a
      className='text-gray-400 hover:text-gray-900 transition-colors'
      target='_blank'
      rel='noopener noreferrer'
      {...props}
    >
      <ExternalLink className='w-4 h-4' />
    </a>
  );
}

interface MediaThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  item: MediaItem;
  projectTitle: string;
}

function MediaThumbnail({ item, projectTitle, ...props }: MediaThumbnailProps) {
  const isItemValid =
    typeof item !== 'string' && (item.type === MEDIA_TYPE.IMAGE || item.type === MEDIA_TYPE.VIDEO);
  if (!isItemValid) throw new TypeError('Invalid media item type');

  return (
    <div className='relative shrink-0 cursor-pointer group' {...props}>
      <img
        className='h-48 w-auto rounded-lg object-cover group-hover:scale-105 group-hover:opacity-95 transition-all duration-300'
        src={item.type === MEDIA_TYPE.IMAGE ? item.url : item.thumbnail}
        alt={item.alt || `${projectTitle} media`}
      />
      {item.type === MEDIA_TYPE.VIDEO && (
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='bg-black/50 rounded-full p-2 group-hover:bg-black/70 transition-colors'>
            <Play className='w-8 h-8 text-white fill-white' />
          </div>
        </div>
      )}
    </div>
  );
}

interface ProjectDescriptionProps {
  description: string;
}

function ProjectDescription({ description }: ProjectDescriptionProps) {
  return <p className='text-gray-600 mb-2'>{description}</p>;
}

interface TechnologyBadgeProps {
  technology: string;
}

function TechnologyBadge({ technology }: TechnologyBadgeProps) {
  return (
    <span className='text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded'>
      {technology}
    </span>
  );
}

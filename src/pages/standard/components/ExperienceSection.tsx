import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
}

const EXPERIENCE_SECTION_KEY = 'experience';

export default function ExperienceSection({ experience }: { experience: Job[] }) {
  return (
    <SectionLayout id={EXPERIENCE_SECTION_KEY}>
      <SectionTitle title={EXPERIENCE_SECTION_KEY} />
      <div className='md:col-span-3 space-y-8'>
        {experience.map((job, index) => (
          <article key={index} className='group'>
            <header className='flex flex-col md:flex-row md:items-center md:justify-between mb-1'>
              <h4 className='text-xl font-bold text-gray-900'>{job.role}</h4>
              <span className='text-gray-500 font-medium'>{job.period}</span>
            </header>
            <p className='text-lg text-gray-700 mb-2'>{job.company}</p>
            <p className='text-gray-600 leading-relaxed'>{job.description}</p>
          </article>
        ))}
      </div>
    </SectionLayout>
  );
}

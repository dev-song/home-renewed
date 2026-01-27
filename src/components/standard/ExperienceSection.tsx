import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

const EXPERIENCE_SECTION_KEY = 'experience';

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <SectionLayout id={EXPERIENCE_SECTION_KEY}>
      <SectionTitle title={EXPERIENCE_SECTION_KEY} />
      <div className='md:col-span-3 space-y-8'>
        {experience.map((exp, index) => (
          <Experience key={index} experience={exp} />
        ))}
      </div>
    </SectionLayout>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

interface ExperienceProps {
  experience: Experience;
}

function Experience({ experience }: ExperienceProps) {
  return (
    <article className='group'>
      <header className='flex flex-col md:flex-row md:items-center md:justify-between mb-1'>
        <Role role={experience.role} />
        <Period period={experience.period} />
      </header>
      <Company company={experience.company} />
      <Description description={experience.description} />
    </article>
  );
}

/** --------------------
 *  Primitives
 *  -------------------- */

interface RoleProps {
  role: string;
}

function Role({ role }: RoleProps) {
  return <h4 className='text-xl font-bold text-gray-900'>{role}</h4>;
}

interface PeriodProps {
  period: string;
}

function Period({ period }: PeriodProps) {
  return <span className='text-gray-500 font-medium'>{period}</span>;
}

interface CompanyProps {
  company: string;
}

function Company({ company }: CompanyProps) {
  return <p className='text-lg text-gray-700 mb-2'>{company}</p>;
}

interface DescriptionProps {
  description: string;
}

function Description({ description }: DescriptionProps) {
  return <p className='text-gray-600 leading-relaxed'>{description}</p>;
}

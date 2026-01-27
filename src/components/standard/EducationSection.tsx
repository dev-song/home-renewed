import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface Education {
  school: string;
  degree: string;
  period: string;
}

const EDUCATION_SECTION_KEY = 'education';

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <SectionLayout id={EDUCATION_SECTION_KEY}>
      <SectionTitle title={EDUCATION_SECTION_KEY} />
      <div className='md:col-span-3 space-y-8'>
        {education.map((edu, index) => (
          <Education key={index} education={edu} />
        ))}
      </div>
    </SectionLayout>
  );
}

/** --------------------
 *  Sub-components
 *  -------------------- */

interface EducationProps {
  education: Education;
}

function Education({ education }: EducationProps) {
  return (
    <article className='group'>
      <header className='flex flex-col md:flex-row md:items-center md:justify-between mb-1'>
        <School school={education.school} />
        <Period period={education.period} />
      </header>
      <Degree degree={education.degree} />
    </article>
  );
}

/** --------------------
 *  Primitives
 *  -------------------- */

interface SchoolProps {
  school: string;
}

function School({ school }: SchoolProps) {
  return <h4 className='text-xl font-bold text-gray-900'>{school}</h4>;
}

interface PeriodProps {
  period: string;
}

function Period({ period }: PeriodProps) {
  return <span className='text-gray-500 font-medium'>{period}</span>;
}

interface DegreeProps {
  degree: string;
}

function Degree({ degree }: DegreeProps) {
  return <p className='text-lg text-gray-700'>{degree}</p>;
}

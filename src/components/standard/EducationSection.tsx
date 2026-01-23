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
          <article key={index} className='group'>
            <header className='flex flex-col md:flex-row md:items-center md:justify-between mb-1'>
              <h4 className='text-xl font-bold text-gray-900'>{edu.school}</h4>
              <span className='text-gray-500 font-medium'>{edu.period}</span>
            </header>
            <p className='text-lg text-gray-700'>{edu.degree}</p>
          </article>
        ))}
      </div>
    </SectionLayout>
  );
}

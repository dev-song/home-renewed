import SectionLayout from './SectionLayout';
import SectionTitle from './SectionTitle';

interface SkillCategory {
  category: string;
  items: string[];
}

const SKILLS_SECTION_KEY = 'skills';

export default function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <SectionLayout id={SKILLS_SECTION_KEY}>
      <SectionTitle title={SKILLS_SECTION_KEY} />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:col-span-3 md:gap-8'>
        {skills.map(({ category, items }, index) => (
          <article key={index}>
            <h4 className='font-bold text-gray-900 mb-2'>{category}</h4>
            <ul className='flex flex-wrap gap-2'>
              {items.map((item) => (
                <li
                  key={item}
                  className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium'
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionLayout>
  );
}
